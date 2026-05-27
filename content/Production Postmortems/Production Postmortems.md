---
title: Production Postmortems
tags:
  - postmortem
  - infrastructure
date: 2026-05-20T15:07:00.000Z
---

Production systems don't break in obvious ways. They degrade quietly — a metric that drifts, a limit that creeps, a config that made sense two years ago and no longer does. Then, at some inconvenient hour, everything falls apart at once and you're left staring at logs trying to figure out which domino fell first.

This is a collection of those moments.

I work as a Platform Engineer at [Savannah Informatics Limited](https://www.savannahinformatics.com/), where I run and maintain the infrastructure that healthcare systems in East Africa run on. The stakes are real. When a service goes down, it's not a degraded user experience, it's a clinician who can't access a patient record, a lab result that doesn't arrive, a patient that is stranded in hospital awaiting a preauthorisation to be approved by the payer, a workflow that stops. That context shapes how I think about reliability and what I consider worth writing about.

These postmortems are honest accounts of incidents I've been part of, what broke, why it broke, how long it took to figure that out, and what we changed afterwards. Some of them are embarrassing in hindsight. Most of them come down to something that seems obvious once you know the answer: a resource limit nobody checked, an assumption baked into a deployment script, a default that was never meant for production load.

The goal isn't to catalog failures for their own sake. It's to make the pattern visible because these incidents tend to rhyme. The details change but the shape is usually the same: something was misconfigured, something wasn't monitored, and something else downstream paid the price before anyone noticed.

If you've been on-call long enough, you'll recognize most of these stories. The names are different but the 4am feeling is the same.

## Incidents

- [[its-always-file-descriptors|It's Always File Descriptors]] — A 26-hour RabbitMQ outage traced back to a four-digit number set years ago and never revisited.
