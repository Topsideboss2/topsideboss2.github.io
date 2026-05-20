---
title: It's Always File Descriptors
date: 2026-05-20T18:07:00.000Z
readTime: 8 min
slug: its-always-file-descriptors
tags:
  - rabbitmq
  - linux
  - file-descriptors
  - postmortem
  - infrastructure
---

> **Production Postmortem · Infrastructure**

There's a running joke in systems engineering. When something breaks in production — the database won't connect, the message broker stops accepting connections, the app throws cryptic auth errors at 4am — you run through the usual suspects. Memory leak? Disk full? Network partition? And then, eventually, inevitably, you run `ulimit -n` and sigh.

It's file descriptors. It's *always* file descriptors.

Last week we learned this lesson again, the hard way, when our Advantage service lost all background processing for 26 hours. The root cause: a four-digit number someone set years ago and forgot about.

---

## What even is a file descriptor?

Before we get into the incident, let's level-set. Most engineers know *of* file descriptors but treat them as someone else's problem — until they aren't.

When your process opens anything — a file, a socket, a pipe, a device — the kernel hands back a small non-negative integer. That integer is a **file descriptor**. It's an index into a kernel-managed table that tracks all the I/O resources your process currently has open.

```bash
# Everything is a file. Everything.
$ ls -la /proc/$$/fd
lrwx------ 0 -> /dev/pts/0       # stdin
lrwx------ 1 -> /dev/pts/0       # stdout
lrwx------ 2 -> /dev/pts/0       # stderr
lrwx------ 3 -> socket:[2847193] # a TCP connection
lrwx------ 4 -> /var/log/app.log # a log file
lrwx------ 5 -> eventfd:[...]    # an async event
```

Sockets are file descriptors. Log files are file descriptors. Unix pipes are file descriptors. In Linux, even timers, signals, and epoll instances are file descriptors. The abstraction is absurdly broad. And crucially: **the OS enforces limits on how many you can have open at once.**

There are two limits in play: a per-process soft limit (which the process can raise up to the hard limit), and a system-wide hard limit. Historically, the default soft limit has been `1024`. That number made sense in 1979. It does not make sense in 2026.

> [!note] The Unix Philosophy Tax
> "Everything is a file" is elegant and powerful — until you have 10,000 simultaneous connections and a limit of 1,024 file handles. Every network connection, every open config file, every log handle, and every internal IPC channel counts against the same budget.

---

## The incident

Our Advantage service uses RabbitMQ as its backbone for background job processing. RabbitMQ is an Erlang application — and Erlang's concurrency model means it opens a lot of file descriptors. Each connection gets a socket. The Khepri metadata store (introduced in RabbitMQ 3.13) opens files for its Raft log. The Erlang VM itself opens descriptors for its module loader, its distribution protocol, its internal message passing.

We run across 20 virtual hosts. Under normal load this is fine. The descriptors accumulate gradually. Slowly. Quietly.

| # | Time | Event |
|---|------|-------|
| 1 | Months earlier | `LimitNOFILE=1024` sits in `limits.conf`. Nobody notices. The system runs fine at low load. |
| 2 | May 19, 16:20 | Under peak load across 20 vhosts, the fd count reaches 1,024. Every subsequent `open()` syscall returns `EMFILE`: "too many open files." |
| 3 | 16:20 — cascading | The Erlang `code_server` tries to read Khepri plugin `.beam` files. `EMFILE`. The plugin process can't start. Khepri's Raft process crashes with `noproc`. |
| 4 | 16:20 — impact | Without Khepri, RabbitMQ can't serve metadata. Every auth attempt fails. Vhosts and queues appear to vanish. Background processing stops completely. |
| 5 | May 20, 18:07 | Manual restart — recovered. Connections reset. System recovers — temporarily, until connections would have climbed again. |

What made this incident particularly nasty is that it didn't look like a resource exhaustion problem. There was no OOM killer, no disk-full alert, no obvious crash. RabbitMQ was running. It just couldn't *do anything*. The symptoms — invalid credentials, missing vhosts — pointed everywhere except at `ulimit`.

> [!warning] Why fd exhaustion is hard to diagnose
> When a process runs out of file descriptors, it doesn't crash. It keeps running and starts failing silently on any operation that requires opening a new handle. Log writes fail. New connections fail. Internal modules fail to load. The errors look like application bugs, not OS limits.

---

## The fd budget math nobody does

Let's be honest about why this happens. Nobody sits down and calculates their fd budget when they first deploy a service. They copy a config from Stack Overflow, it works, and they ship it.

For RabbitMQ specifically, the math looks like this:

```bash
# Per connection:
1 fd  # TCP socket
1 fd  # internal Erlang process mailbox

# Per vhost (×20 in our case):
~3 fds # metadata, log, Raft journal

# Per node baseline:
~50 fds # VM internals, distribution, epmd, etc.

# With 100 connections across 20 vhosts:
# 200 (connections) + 60 (vhosts) + 50 (baseline) = ~310
# Sounds fine... until load doubles. Or Khepri opens more.
# And 1,024 is not far away.
```

| Environment | FD Usage | Limit | Status |
|-------------|----------|-------|--------|
| dev (light load) | 124 | 1024 | OK |
| staging (moderate) | 738 | 1024 | Warning |
| production (peak) — incident | 1024 | 1024 | Critical |

Notice that dev and staging looked totally fine. The limit only revealed itself under production load. This is the trap: your testing environments almost never stress file descriptors. You need real traffic, real connection pools, real load — and by then you're paging on a Saturday.

---

## The fix (and why we did it this way)

The fix is simple. The important part is doing it in a way that survives package updates.

```bash
# Wrong: editing the unit file directly
# Gets overwritten when rabbitmq-server updates
sudo vim /lib/systemd/system/rabbitmq-server.service

# Right: drop-in override
# Lives in /etc/systemd and survives upgrades
sudo mkdir -p /etc/systemd/system/rabbitmq-server.service.d/
sudo tee /etc/systemd/system/rabbitmq-server.service.d/limits.conf <<EOF
[Service]
LimitNOFILE=500000
EOF

sudo systemctl daemon-reload
sudo systemctl restart rabbitmq-server

# Verify it took effect
cat /proc/$(pgrep -f beam.smp | head -1)/limits | grep "open files"
```

We chose 500,000. That might sound like overkill. It isn't. At 500k, even if every connection somehow opened 100 file handles, we'd support 5,000 simultaneous connections before sweating. And the cost of a large fd limit is essentially zero — the kernel doesn't pre-allocate anything, it only tracks descriptors that are actually open.

> [!tip] Rule of thumb
> For any stateful networked service — database, message broker, cache, proxy — set `LimitNOFILE` to at least `65536`. For high-throughput brokers like RabbitMQ with many vhosts, go to `500000` or higher. The number costs nothing if you don't use it.

---

## It's not just RabbitMQ

We checked the rest of our fleet after this incident. File descriptor limits bite everywhere:

### Nginx / HAProxy

Each client connection is one fd. A proxy handling 10,000 concurrent connections needs 10,000 fds — minimum. Add upstream connections and it doubles. Default soft limit of 1,024 means you start dropping connections at relatively modest traffic.

### PostgreSQL

Postgres opens one fd per table, per index, per WAL segment. A schema with a few hundred tables and active writes can chew through hundreds of fds before any client connects. `max_connections` gets all the attention; fd limits are its shadow.

### Elasticsearch / OpenSearch

ES opens Lucene segment files constantly. The official recommendation is 65,536 minimum. The JVM itself, on top of that, needs headroom for its own internal handles. Elastic will literally refuse to start if your limits are too low — they at least check.

### Node.js / Python async servers

Any server using epoll/kqueue opens one fd per watched socket. A Node.js server with 1,000 connected WebSocket clients is sitting at 1,000+ fds plus whatever the app itself opens. Default limits catch you fast.

> [!note] Go audit your limits right now
> SSH into any production machine and run: `cat /proc/$(pgrep -f your-service)/limits | grep "open files"`. If the soft limit is 1024, you have a time bomb. You just don't know when it goes off.

---

## What we're doing about it

Beyond fixing the immediate limit, we're making structural changes so this class of problem doesn't quietly stew for months:

**Alerting on fd utilization.** RabbitMQ exposes `file_descriptors.total_used` and `file_descriptors.total_limit` via its management API. We now alert at 70% and page at 85%. We should have had this from day one.

**A limits audit playbook.** We're running a one-time audit of every stateful service's systemd unit — any `LimitNOFILE` below 65536 gets raised before end of quarter. This is a pull request, not a Jira ticket.

**Adding fd limits to our service template.** Every new service we deploy now starts with a sane `LimitNOFILE` in its unit file template. New services inherit good defaults rather than inheriting 1979's defaults.

---

## The actual lesson

> *"File descriptors are one of those things that seem fine until they're not — and when they're not, they look like something else entirely."*

The failure wasn't really about RabbitMQ. Or Khepri. Or Erlang. It was about a number that hasn't been updated since the days when a server handling 100 connections was considered ambitious.

The Unix philosophy of "everything is a file" is one of the most powerful abstractions in computing. It's also a hidden tax on every networked application you run. The more sockets you open, the more log files you write, the more internal pipes and eventfds your runtime uses — the faster you burn through a budget that defaulted to 1,024 because that's what fit in a 10-bit integer in 1979.

Modern software doesn't fit in 10 bits anymore. Raise your limits. Add monitoring. And the next time production breaks and you can't figure out why — check the file descriptors.

It's probably file descriptors.
