---
slug: cloud-cost-cutting
tags:
  - cost
  - cloud
  - aws
  - kubernetes
  - k8s
  - infrastructure
  - finops
title: How We Cut Our Cloud Bill by 50% in 3 Months
---

> [!info] 
> "Every engineering decision is a buying decision." ~ **_Werner Vogels_**

That quote sat at the centre of every conversation we had when we started this work. It sounds obvious in hindsight, but it is the kind of thing that gets lost when teams are moving fast, shipping features, and operating under the assumption that cloud costs are someone else's problem.

They are not. They are in fact, everyone's problem and once we started treating them that way, the results were dramatic.

Over the course of **three months**, we reduced our cloud spend by approximately **50%**. No features were removed. No reliability was sacrificed. We simply stopped paying for things we did not need, and made deliberate decisions about the things we did.

This is the story of how we did it.

---

# The Starting Point: Cloud Sprawl

Like many engineering organisations that scale quickly, we had accumulated complexity. Multiple AWS accounts, multiple Kubernetes clusters, workloads scattered across environments, and a billing structure that made it difficult to attribute costs to the teams and products responsible for them.

Cost visibility was low. Accountability was even lower. Nobody had a clear picture of what anything cost, which meant nobody had a clear incentive to optimise it.

That was the first thing we needed to fix.

---

# 1. Consolidating Accounts and EKS Clusters

Our first major move was infrastructure consolidation. We were running separate EKS clusters that could be merged without compromising workload isolation. The consolidation itself was the migration, and Karpenter made it tractable.

[**Karpenter**](https://karpenter.sh) is a Kubernetes node provisioner that responds dynamically to pod scheduling requirements spinning up exactly the right instance type at the right time, and terminating nodes when they are no longer needed. Because Karpenter gives you fine-grained control over how nodes are labelled and selected, we were able to isolate workloads within a single shared cluster using unique tags and node selectors. Each team and product got its own logical boundary, complete with cost attribution without needing its own cluster.

This was a meaningful shift. Instead of paying the fixed overhead of multiple control planes and duplicated node capacity, we were running leaner, shared infrastructure with clear per-team billing.

We also leaned heavily on [**Robusta KRR**](https://docs.robusta.dev/master/) (Kubernetes Resource Recommender) during this phase. KRR analyses actual resource consumption across your cluster and recommends accurate CPU and memory requests and limits for every workload. Right-sizing Kubernetes resource requests is one of the most impactful, and most overlooked levers in cloud cost optimisation. Over-provisioned requests mean Kubernetes reserves more node capacity than workloads actually consume, which translates directly into wasted compute spend. KRR gave us the data to fix this with confidence rather than guesswork.

---

# 2. Taming NAT Gateway Costs

NAT Gateway pricing in AWS has a property that catches many teams off guard: you are billed **per gigabyte of data processed**. This is in addition to the hourly charge for the gateway itself.

When we started digging into our data transfer line items, we found that a significant portion of our NAT Gateway costs was attributable to **outbound traffic from inside our VPC to public internet endpoints** specifically, Kubernetes nodes pulling container images from public registries like Docker Hub and GitHub Container Registry.

Every time a node scheduled a new pod, it potentially pulled a fresh copy of the image from public registries. This traffic left our VPC, hit the NAT Gateway, and we were billed for every byte.

The fix was simple. Make use of **AWS ECR Pull-Through Cache**.

ECR Pull-Through Cache allowed us to configure ECR as a transparent caching proxy for upstream public registries. The first pull of an image fetches it from the upstream registry and stores it in your private ECR. Every subsequent pull comes from ECR directly, inside the AWS network, with no NAT Gateway traversal and no per-byte charge.

The setup change was minimal. The cost impact, on the other hand, was not. NAT Gateway data transfer costs dropped substantially once the cache warmed up and became the primary source for image pulls across the cluster.

---

# 3. Killing Sacred Cows

Every engineering organisation has them. Infrastructure components that have been running so long, cost so much, and are touched so rarely that nobody dares question them. We called ours sacred cows, and it was time to slaughter a few.

## S3: Rearchitecting the Windows Build Pipeline

One of our most expensive S3 buckets was used by our .NET team where a CI/CD pipeline pushed build artifacts (`.exe.` files and other binaries) in S3 whenever it was triggered. 
Clients then pulled those artifacts directly from our public S3 URLs.

The problem was the architecture around those objects, not the objects themselves. Every object that was pushed to S3 had a unique key which meant every version of every artifact was being retained indefinitely in standard storage. Months of build output, spanning dozens of pipelines, accumulating at standard S3 pricing.

We fixed this in three steps:

1. **Enabling Object Versioning**: We configured our build pipelines to push objects with the same identifier to enable object versioning.
2. **Retention policy**: Old versions beyond a defined retention window were expired and deleted automatically. Retained only 5 versions of the same object.
3. **Lifecycle rules**: Objects were automatically transitioned from S3 Standard to S3 Standard-IA (infrequent access) after 30 days, and to S3 Glacier after 90 days. Artifacts that genuinely needed long-term retention were now stored at a fraction of the original cost.

This alone cut a meaningful portion of our S3 spend without drastic changes to our existing workflow.

## RDS: Right-Sizing Instances and Upgrading Storage

At the database layer, we identified three separate opportunities.

First, several RDS instances were significantly **over-provisioned** relative to their actual workloads. We reviewed CPU and memory utilisation across instances and downsized where the headroom was excessive.

Secondly, we took this opportunity to switch to AWS graviton(ARM-based) RDS instances which are **20% cheaper** than X86(AMD-based).

Last but not least, we migrated all RDS instances from **gp2** to **gp3** EBS volumes. gp3 is the current generation of general-purpose SSD storage in AWS, and it is simply cheaper than gp2: **approximately 20% less per GB**. It also offers better baseline performance and allows you to independently provision IOPS and throughput without being tied to storage size as gp2 requires. There is no performance trade-off for most database workloads the upgrade is straightforward and the savings are immediate.

---

# 4. Scaling to Zero with KEDA and Karpenter

Not all workloads need to run continuously. Some exist to process jobs, handle batch tasks, or serve traffic that is highly variable throughout the day. For these workloads, paying for compute around the clock is pure waste.

We introduced **dynamic scaling to zero** using [**KEDA**](https://keda.sh) (Kubernetes Event-Driven Autoscaler) in conjunction with Karpenter.

KEDA extends the Kubernetes Horizontal Pod Autoscaler with event-driven scaling. It can scale a deployment down to zero pods when there is no work to process and scale it back up from zero the moment an event arrives. This can either be a message on a queue or a metric threshold crossing. When KEDA scales a deployment to zero, Karpenter terminates the underlying nodes that are no longer needed, returning that capacity to AWS. When KEDA scales back up, Karpenter provisions fresh nodes on demand.

The combination means workloads that are idle pay nothing. For batch-oriented or event-driven services that spend significant time waiting for work, this can be transformative.

---

# 5. Committing with AWS Savings Plans

Once we had right-sized our infrastructure and understood our stable baseline compute footprint, we were in a position to commit.

**AWS Savings Plans** offer a discount of up to **66%** on EC2 compute costs in exchange for a one-year or three-year commitment to a consistent level of spend. The key is knowing what you are committing to. Purchasing Savings Plans before right-sizing locks in spending that may be higher than necessary.

We had done the right-sizing work first, which meant our baseline was accurate. We purchased Compute Savings Plans targeting workloads running on **t3**, **c5**, and **m6** instance families, the three families we had standardised on. We then configured Karpenter's node pools to only provision instances from these same three families, ensuring that every new node launched by Karpenter would be covered by our committed spend rather than accruing on-demand rates.

This created a closed loop. Where our commitments matched our actual usage, our actual usage stayed within our committed instance families, and discounts applied automatically without manual intervention.

---

# 6. Spot Instances for Interruptible Workloads

Not every workload needed guaranteed compute. Some workloads were naturally fault-tolerant, that is they retry on failure, process jobs idempotently, or can simply be rescheduled without user impact. For these, **EC2 Spot Instances** offered discounts of **60–90%** compared to on-demand pricing in exchange for the possibility of interruption.

We identified two clear candidates: **Airbyte** data sync jobs and **GitLab CI/CD runners**. Both being stateless, retriable, and have no strict latency requirements that would make an interruption consequential.

Using Kubernetes **Taints and Tolerations**, we configured Karpenter to provision Spot nodes specifically for these workloads. The taint marks a node as Spot-only and only pods with the matching toleration are scheduled onto it. This ensures that production-sensitive services never land on interruptible nodes, while the workloads that can tolerate interruption benefit from dramatically lower compute costs.

---

# Where We Are Going Next

Cutting costs by 50% in three months is meaningful, but it is not the finish line. There are two areas we are actively working toward.

## Graviton Migration

AWS Graviton instances, powered by ARM-based processors designed in-house by AWS, offer a price-to-performance improvement of up to 40% over comparable x86 instances. They represent the most cost-effective compute option in AWS for the vast majority of workloads.

The reason we have not migrated yet is straightforward: it requires work. Some dependencies, native libraries, and base images need to be rebuilt and verified for ARM compatibility. This is not a weekend task for a complex platform because there are architectural differences that require careful testing. But it is firmly on the roadmap, and the long-term payoff will be significant.

## Building a Cost-Conscious Culture

Infrastructure changes are one side of the equation. The other, and arguably the more durable one, is culture.

The **FinOps** philosophy is not just about tooling and one-time optimisations. It is about embedding financial accountability into everyday engineering practice. Every team that deploys workloads should understand what those workloads cost. Engineers making architecture decisions should factor cost in as naturally as they factor reliability or performance.

Concretely, this means:

- Making cost metrics visible to every team, not just platform or finance
- Celebrating and rewarding savings, not just features shipped
- Reinvesting a portion of savings into the contributors who identified them, creating a direct incentive loop

The best cloud cost programme is one that does not rely entirely on a central platform team to do the optimisation work. It is one where every engineer understands that their decisions have financial consequences, and designs accordingly.

---

# Closing Thoughts

Fifty percent in three months sounds like a dramatic headline, but it was the result of a structured process where we took the initiative to understand what we were spending, attribute it accurately, eliminated waste, optimise what remained, and committed to what we knew.

The individual techniques and tools such as Karpenter, KEDA, ECR Pull-Through Cache, gp3 upgrades, Savings Plans, Spot instances, are all well-documented and available in the public domain. What made the difference is the willingness to treat cost as a first-class engineering concern, and to give engineers the visibility and accountability to act on it.

Every engineering decision is a buying decision. Once you internalise that, the savings tend to follow.
