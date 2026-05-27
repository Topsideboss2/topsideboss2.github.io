---
slug: frugal-by-design
title: Frugal By Design
date: 2026-05-27T18:00:00.000Z
tags:
  - aws
  - cost
  - cloud
  - finops
  - infrastructure
---
> [!info] Engineering under constraints is not a lesser version of engineering. It is a more honest one.

There is a version of cloud engineering where cost is an afterthought, where you ship fast, scale freely, and figure out the bill later. That version exists. I have seen it. It tends to end badly.

The version I know is different. As a Platform Engineer, I build and maintain infrastructure that is critical for the healthcare industry. In this context, the economics of cloud infrastructure are not abstract. Budgets are **finite** and **visible**. Every dollar spent on idle compute is a dollar not spent on the product. Cost is not someone else's problem, it is part of the design.

That constraint, over time, changes how you think.

You stop accepting defaults. You question why something is provisioned the way it is. You build a reflex for asking what this actually costs and whether there is a cheaper path that gets you to the same outcome. You start to notice how much of what most teams call infrastructure is really just accumulated decisions nobody ever revisited such as **over-provisioned nodes**, **unattached volumes**, **legacy storage tiers**, unnecessary NAT Gateway traffic that could have stayed inside the network and so on and so forth.

Frugality, done right, is not austerity. It is not shrinking services or sacrificing reliability for a cheaper bill, no that is **frupidity**(excuse my _french_). Frugality is the discipline of understanding your system well enough to spend precisely no more, no less. The engineers who are best at it tend to also be the engineers who understand their systems most deeply. That is not a coincidence.

This section is where I document that work. The cost optimisations I have shipped, the architectural decisions that turned out to have **significant financial consequences**, and the broader philosophy of building production systems that are **efficient** by default rather than optimised in panic.

Much of this thinking was shaped by **Dr. Werner Vogels**, CTO of Amazon, who has long argued that frugality is not a financial concern but an engineering virtue. His concept of the [*Frugal Architect*](https://www.thefrugalarchitect.com), the idea that cost is a non-functional requirement that should be baked into every design decision, not bolted on afterwards, reframed how I think about infrastructure. His maxim that *"every engineering decision is a buying decision"* is the lens through which I now read every architecture diagram, every Terraform plan, every pull request that touches compute. If you have not read his writings on frugal architecture, they are worth your time.

![](https://github.com/Topsideboss2/topsideboss2.github.io/blob/v4/media/dr-werner-vogels-at-aws-community-day-kenya.jpeg?raw=true)
## Articles

- [[How We Cut Our Cloud Bill by 50% in 3 Months]] — Consolidating clusters, right-sizing workloads, taming NAT Gateway costs, and building the foundations of a cost-conscious engineering culture.
