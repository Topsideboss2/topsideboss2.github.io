---
title: Undergrad Final Year Project
draft: false
tags:
  - aws
  - personal-project
  - machine-learning
  - ai
  - final-year-project
  - eda
slug: undergrad-final-year-project
date: 2026-02-09T20:39:35.901Z
readTime: 1 min
---
# Building a Real-Time Drowsy Driver Detection System with Raspberry Pi and AWS IoT

![](https://github.com/Topsideboss2/topsideboss2.github.io/blob/v4/media/final-year-architectural-diagram-2.png?raw=true)

Drowsy driving is a hard problem to solve technically. The detection has to happen fast enough to matter, on hardware cheap enough to fit in a vehicle, without depending on a network connection that might not be there. The alerting has to be immediate and local. The data still needs to reach the cloud reliably so a fleet operator can see what's happening across their vehicles. And none of it can fall over when the device loses signal on a rural road.

For my final year project, I built **Watchdogs** — an end-to-end drowsiness detection and alerting system that runs ML inference on a Raspberry Pi, triggers an in-cabin buzzer on detection, and streams structured telemetry to AWS for monitoring and alerting. This post walks through how it's built, and more importantly, why each piece is built the way it is.

---

## The Technical Problem

Drowsiness detection sits at an interesting intersection of constraints:

- **Latency is safety-critical.** A detection that takes three seconds to result in an alert is three seconds too slow. The alert path cannot have a cloud round-trip in it.
- **Connectivity is unreliable.** A vehicle on a long route will pass through areas with no signal. The system has to degrade gracefully — keep detecting and alerting locally, resume reporting when connectivity is restored.
- **Compute is limited.** The hardware budget is a Raspberry Pi. That rules out any approach that requires a GPU or assumes abundant CPU headroom.
- **The input is noisy.** Lighting changes, head angle variation, reflections on glasses, and camera vibration from road movement all make in-vehicle video a hostile environment for computer vision.

These constraints shaped every design decision in the system.

---

## System Architecture

The system is split into two layers: an **edge layer** (Raspberry Pi, inside the vehicle) and a **cloud layer** (AWS). The boundary between them is intentional — the edge layer owns everything time-critical; the cloud layer owns everything analytical.

### Edge Layer — The Raspberry Pi

The Raspberry Pi 4 runs the full detection and alerting loop locally:

1. The Pi camera module captures a continuous video stream of the driver's face
2. Each frame is processed by a MediaPipe Face Landmarker model running on-device
3. If drowsiness is detected, a buzzer wired to the GPIO pins is triggered immediately
4. A telemetry payload is published to AWS IoT Core over MQTT via a GSM module

Steps 1–3 are entirely local. Step 4 is best-effort — if connectivity is unavailable, it retries; the alert still fires.

#### Drowsiness Detection: MediaPipe and the Eye Aspect Ratio

The detection algorithm is built on **Google's MediaPipe Face Landmarker**, a pre-trained model that identifies 468 facial landmarks per frame in real time. These landmarks are expressed as **canonical face blendshapes** — a normalised coordinate system that is stable across different head poses and face geometries.

From the eyelid landmarks, the pipeline computes the **Eye Aspect Ratio (EAR)**:

```
EAR = (||p2 - p6|| + ||p3 - p5||) / (2 * ||p1 - p4||)
```

Where `p1–p6` are the six eyelid landmark points. When the eye is open, this ratio stays roughly constant. When the eye closes, the vertical distances collapse and EAR drops sharply. The system tracks `eye_closure_duration` — how long EAR has been below threshold — and classifies the driver as drowsy once that duration crosses a configured limit.

This approach was chosen specifically because it is **geometric, not learned** at the detection stage. The hard ML work (finding the landmarks accurately under real-world conditions) is done by MediaPipe's neural network. The drowsiness classification logic on top of it is deterministic and cheap to run — no secondary model inference required per frame.

**Why MediaPipe over Haar Cascades?**

Haar Cascade classifiers — an older computer vision approach based on Viola-Jones sliding window detection — were evaluated early on. The fundamental problem with Haar Cascades in this context is that they are trained on frontal, well-lit faces. They degrade badly with:

- Off-axis head angles (common when a driver turns to check mirrors)
- Low or variable lighting inside a vehicle
- Partial occlusion from glasses or sun visors

MediaPipe's Face Landmarker uses a neural network backbone trained on diverse, real-world data. It handles pose variation and lighting changes substantially more robustly, which is essential for a system that has to work in uncontrolled conditions.

**Why a pre-trained model over training from scratch?**

Training a custom facial landmark model would require: a large, labelled dataset of driver faces across varied conditions; significant GPU compute for training; and extensive hyperparameter tuning. Beyond time and cost, it would be hard to match the demographic diversity already present in MediaPipe's training data. Using a production-grade pre-trained model and applying a lightweight geometric computation on top of its output gave better results with far less effort.

**Hardware note:** MediaPipe requires **Raspbian Bullseye 64-bit** to run on a Raspberry Pi. The 32-bit OS variant is not supported.

#### In-Cabin Alert: The Buzzer

When the drowsiness condition is met, a buzzer connected to the Raspberry Pi's GPIO pins is activated immediately in the same detection loop — no network call, no async handoff. This keeps the critical alert path entirely on-device and deterministic.

The distinction between active and passive buzzers matters here: an **active buzzer** was used because it produces sound from a DC signal alone, with no need to drive it with a PWM frequency from software. This simplifies the GPIO code and removes one more failure mode.

#### MQTT and IoT Connectivity

The Raspberry Pi publishes telemetry to **AWS IoT Core** over **MQTT** via a GSM module. The device is registered as a Thing in IoT Core with X.509 certificates provisioned for mutual TLS authentication — each device has its own certificate, so there are no shared secrets and a compromised device can be revoked individually.

MQTT was chosen over HTTP for several reasons that matter in an IoT context:

- **Lightweight protocol framing.** MQTT has a minimal binary header overhead, making it efficient for small, frequent payloads over a GSM connection where bandwidth and latency are constrained.
- **Quality of Service levels.** MQTT's QoS 1 guarantees at-least-once delivery with acknowledgement, ensuring telemetry is not silently dropped when connectivity is marginal.
- **Native AWS IoT Core integration.** IoT Core's Rules Engine processes MQTT messages directly, with no translation layer needed.

The system publishes to two topics:

- **`raspi/fps`** — the detection payload per cycle, containing the drowsiness classification and relevant metrics
- **`out/of/range`** — a heartbeat topic used to signal device online/offline state

**MQTT Last Will and Testament (LWT)** is configured on connection. LWT is a message pre-registered with the broker at connect time; if the broker detects an ungraceful disconnect (TCP timeout rather than a clean DISCONNECT packet), it automatically publishes the LWT message to the `out/of/range` topic. This lets the cloud backend distinguish between "device sent an offline message" and "device disappeared without warning" — the latter being treated as a potential incident.

#### Docker

The Python application was containerised using **Docker**. This is particularly important on ARM hardware: MediaPipe and OpenCV both have native dependencies that can conflict with system packages, and their ARM builds involve non-obvious compilation steps. Containerising the application means the dependency resolution is done once at image build time, and deployment to any Raspberry Pi running the same OS variant is a single `docker run`.

---

### Cloud Layer — AWS

![](https://github.com/Topsideboss2/topsideboss2.github.io/blob/v4/media/final-year-architectural-diagram.png?raw=true)

Telemetry arriving at AWS IoT Core is processed by the **IoT Rules Engine**, which pattern-matches on topic and message content to route messages to downstream services. The rules engine is the fan-out point: a single inbound message can trigger writes to Timestream, state evaluations in IoT Events, and notifications via SNS simultaneously.

#### AWS IoT Events — State Machine

![590](https://github.com/Topsideboss2/topsideboss2.github.io/blob/v4/media/final-year-eda-diagram.png?raw=true)

Rather than encoding alert thresholds in the edge Python code, the drowsiness state logic lives in **AWS IoT Events** as a detector model. IoT Events consumes the MQTT messages and maintains state transitions, for example:

- `ALERT` → `WARNING` after sustained low EAR readings over time
- `WARNING` → `DROWSY` once `eye_closure_duration` exceeds the configured threshold
- Any state → `ALERT` when a normal EAR reading is received

The key benefit of this separation is operational: threshold tuning, state transition logic, and new alert conditions can be changed in IoT Events without touching the Raspberry Pi code or triggering a vehicle-side redeployment. The edge device just reports what it sees; the cloud decides what it means.

#### AWS Timestream — Time-Series Storage

![590](https://github.com/Topsideboss2/topsideboss2.github.io/blob/v4/media/AmazonTimestreamDB.png?raw=true)

All telemetry is written to **Amazon Timestream**, a serverless time-series database. The schema is designed around the queries that matter for fleet monitoring:

- **Dimensions:** `device_id`, `driver_id`, `vehicle_id` — enabling queries scoped to a specific device, a specific driver across vehicles, or all vehicles in the fleet
- **Measures:** `blink_frequency`, `eye_closure_duration` — the raw signals that feed both the visualisation and any downstream analysis

Timestream was chosen over a general-purpose database because time-series data has a predictable access pattern: recent data is queried frequently at high granularity, older data is queried less often at lower granularity. Timestream's tiered storage model handles this automatically, moving data from a memory store to a magnetic store based on configurable retention policies without any application-level management.

#### AWS SNS — Fleet Alerting

![](https://github.com/Topsideboss2/topsideboss2.github.io/blob/v4/media/SNSTopicNotification.png?raw=true)

When IoT Events transitions a detector into the `DROWSY` state, it triggers an **Amazon SNS** notification — an email or SMS delivered to subscribed recipients such as fleet managers. This is the secondary alert channel; the buzzer is the primary one. SNS operates asynchronously and does not sit in the critical detection-to-alert path.

#### AWS Managed Grafana — Visualisation

![](https://github.com/Topsideboss2/topsideboss2.github.io/blob/v4/media/AmazonManagedGrafana.png?raw=true)

**AWS Managed Grafana** is configured with Amazon Timestream as its data source. The dashboard surfaces:

- **Time-series panels** tracking EAR values and drowsiness events across a session
- **Bar graphs** showing drowsiness event frequency by hour or driving segment
- **Heatmaps** showing which times of day and which drivers are highest risk

The Timestream query engine is used to pre-aggregate data before it hits Grafana, keeping dashboard load times low even as the dataset grows.

---

## Technology Stack Summary

| Layer | Technology | Purpose |
|---|---|---|
| Edge Hardware | Raspberry Pi 4 | On-device compute |
| Camera | Raspberry Pi Camera / NoIR Module | Video capture |
| Vision Model | MediaPipe Face Landmarker | 468-point facial landmark detection |
| Edge Language | Python + paho-mqtt | Detection logic & MQTT client |
| Local Alert | Active Buzzer (GPIO) | Immediate in-cabin driver alert |
| Containerisation | Docker | Reproducible ARM deployment |
| Connectivity | GSM Module | Mobile data uplink from vehicle |
| Messaging Protocol | MQTT | Lightweight IoT telemetry transport |
| IoT Broker | AWS IoT Core | Secure device connectivity & rules engine |
| Event Processing | AWS IoT Events | Drowsiness state machine |
| Time-Series Storage | AWS Timestream | Telemetry storage and querying |
| Alerting | AWS SNS | Fleet notifications (email/SMS) |
| Monitoring | AWS Managed Grafana | Real-time and historical dashboards |
| Version Control | GitHub | Source code management |

---

## Key Design Decisions

**Edge inference, not cloud inference.** An early design streamed video frames to the cloud for processing. This was ruled out for three reasons: the bandwidth required for continuous video over GSM is prohibitive; the round-trip latency adds hundreds of milliseconds to the alert path; and cloud-dependent inference means the system does nothing when connectivity is lost. Running MediaPipe on the Pi solves all three.

**Geometric classification on top of neural landmark detection.** The EAR computation is cheap, transparent, and easy to tune. Doing this classification with a second ML model would add inference latency per frame, introduce another model to maintain, and make the threshold logic opaque. The current split — neural network for landmark accuracy, deterministic math for the drowsiness decision — keeps each layer doing what it is best at.

**Two-tier alerting.** The buzzer fires locally in the detection loop; SNS fires asynchronously from the cloud. These are explicitly decoupled because they serve different latency requirements. The buzzer needs to fire in under a second. The SNS notification reaching a fleet manager a few seconds later is fine. Coupling them would mean either the buzzer waits for a network round-trip, or the fleet notification is less reliable.

**State machine in IoT Events, not on the device.** Putting threshold logic on the device creates a deployment problem: changing alert sensitivity requires pushing new code to every vehicle. Moving the state machine to IoT Events makes it a configuration change in the cloud, decouples the alert policy from the detection code, and allows per-vehicle or per-driver threshold customisation without touching the edge layer.

**MQTT LWT for offline detection.** HTTP polling for device health would require a scheduled Lambda or similar job checking whether devices have reported recently. LWT makes the broker itself responsible for offline detection — it is a protocol-level feature with no additional infrastructure. When the broker publishes the LWT message to `out/of/range`, the rules engine picks it up and triggers a notification through the same pipeline as any other event.

**Docker for ARM deployment.** OpenCV and MediaPipe on ARM are notoriously painful to install from source. Containerising the application means the build complexity is paid once, the resulting image is versioned in a registry, and updates to the application can be rolled out with a simple image pull rather than re-running a fragile installation script on each device.

---

## Outcome

The system was built and demonstrated end-to-end. The detection pipeline runs on the Raspberry Pi at real-time frame rates, classifying drowsiness events and triggering the GPIO buzzer within the local detection loop. Telemetry is published over MQTT to AWS IoT Core, where the rules engine fans it out to Timestream for storage and IoT Events for state evaluation. Fleet operators can monitor live sessions in Grafana and receive SNS notifications when a driver enters a sustained drowsy state.

The core architectural lesson is that a safety-critical IoT system should be designed for the degraded case first. The most important thing the system does — alerting the driver — works with no cloud connectivity at all. Everything that depends on the cloud is either analytical (Timestream, Grafana) or secondary alerting (SNS), and those components failing gracefully does not compromise the primary safety function.

---

## What I Would Explore Next

- **RFID-based driver identification** — associating drowsiness events with specific drivers rather than vehicles would enable per-driver fatigue profiling in Timestream and allow threshold tuning in IoT Events to be personalised per driver
- **NoIR camera with IR illumination** — the current camera module degrades significantly in low light; a NoIR module with an IR LED ring would make the detection pipeline viable for night driving without any model changes
- **Expanded feature set in the detection pipeline** — the current system uses eye closure alone; adding yawning detection (mouth blendshape scores from the same MediaPipe output) and head pose estimation would allow a more robust drowsiness score that reduces false positives without raising the EAR threshold
- **SageMaker anomaly detection on Timestream data** — moving beyond threshold-based event triggers to detect gradual fatigue trends over a session, where no single event crosses the threshold but the overall trajectory of EAR and blink frequency is degrading
