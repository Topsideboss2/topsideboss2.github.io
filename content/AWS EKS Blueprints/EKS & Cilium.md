---
title: EKS & Cilium
draft: true
tags:
---
 
# Documentation
### What is AWS ENI & AWS VPC CNI plugin?

> [!info] AWS ENI — Cilium 1.16.0 documentation  
> The AWS ENI allocator is specific to Cilium deployments running in the AWS  
> [https://docs.cilium.io/en/stable/network/concepts/ipam/eni/#ipam-eni](https://docs.cilium.io/en/stable/network/concepts/ipam/eni/#ipam-eni)  

> [!info] AWS VPC CNI plugin — Cilium 1.16.0 documentation  
> This guide explains how to set up Cilium in combination with the AWS VPC CNI  
> [https://docs.cilium.io/en/stable/installation/cni-chaining-aws-cni/](https://docs.cilium.io/en/stable/installation/cni-chaining-aws-cni/)  

> [!info] VPC CNI Custom Networking - Amazon EKS Blueprints for Terraform  
> Custom networking addresses the IP exhaustion issue by assigning the node and Pod IPs from secondary VPC address spaces (CIDR).  
> [https://aws-ia.github.io/terraform-aws-eks-blueprints/snippets/vpc-cni-custom-networking/](https://aws-ia.github.io/terraform-aws-eks-blueprints/snippets/vpc-cni-custom-networking/)  

> [!info] Wireguard /w Cilium - Amazon EKS Blueprints for Terraform  
> This pattern demonstrates Cilium configured in CNI chaining mode with the VPC CNI and with Wireguard transparent encryption enabled on an Amazon EKS cluster.  
> [https://aws-ia.github.io/terraform-aws-eks-blueprints/patterns/wireguard-with-cilium/](https://aws-ia.github.io/terraform-aws-eks-blueprints/patterns/wireguard-with-cilium/)  
### Understanding CNI, Kube-proxy and Service Mesh

> [!info] At the Intersection of Cilium CNI and Service Mesh - Who Has the Right of Way? - Christine Kim  
> Don't miss out!  
> [https://youtu.be/ZykwwHt5hYY?si=Wu706fChwk6GdTzm](https://youtu.be/ZykwwHt5hYY?si=Wu706fChwk6GdTzm)  

> [!info] Kubernetes Components  
> A Kubernetes cluster consists of the components that are a part of the control plane and a set of machines called nodes.  
> [https://kubernetes.io/docs/concepts/overview/components/#kube-proxy](https://kubernetes.io/docs/concepts/overview/components/#kube-proxy)  

> [!info] Kube-Proxy and CNI: The Hidden Components of Kubernetes Networking - Blog  
> Explore the essential yet often overlooked components of Kubernetes networking.  
> [https://seifrajhi.github.io/blog/kubernetes-networking/](https://seifrajhi.github.io/blog/kubernetes-networking/)  

> [!info] CNI  
> CNI (Container Network Interface), a  
> [https://www.cni.dev](https://www.cni.dev)  
### Demystifying Kubernetes Networking
Despite being in Spanish(use subtitles to translate), it is the best video I have watched that tackles
- Load Balancers in K8S
- Ingress/Gateway/Gateway class
- Kubeproxy
- Service Mesh
- Side cars

> [!info] From CNI to Service Mesh Demystifying Kubernetes Networking  
> Kubernetes is a powerful tool for deploying microservices applications offering features such as auto-scaling and multi-tenancy among others.  
> [https://youtu.be/UJsaWrcR7q4?si=UEN6D9Bz_GyeWfVN](https://youtu.be/UJsaWrcR7q4?si=UEN6D9Bz_GyeWfVN)  
# eBPF, Cilium and Hubble

> [!info] What are Cilium and Hubble?  
> Cilium is an open source software for providing, securing, and observing network connectivity between container workloads.  
> [https://isitobservable.io/observability/service-mesh/what-are-cilium-hubble](https://isitobservable.io/observability/service-mesh/what-are-cilium-hubble)  
## Youtube Videos

> [!info] Cilium Kubernetes CNI Provider, Part 1: Overview of eBPF and Cilium and the Installation Process  
> In this multi-part series, we will take a look at Cilium.  
> [https://youtu.be/aLq3O3l2LF4?si=wC9pJRBVDo3Lsp7O](https://youtu.be/aLq3O3l2LF4?si=wC9pJRBVDo3Lsp7O)  

> [!info] Cilium Kubernetes CNI Provider, Part 2: Security Policies and Observability Leveraging Hubble  
> In this multi-part series, we will take a look at Cilium.  
> [https://youtu.be/5EcVrm01rAU?si=aYBJmrRsu66XrJ7Q](https://youtu.be/5EcVrm01rAU?si=aYBJmrRsu66XrJ7Q)  

> [!info] Cloud DeMISTified: Kubernetes Networking with Cilium Demo  
> In this episode of the Cloud DeMISTified series, Isovalent TME Nico Vibert walks the Cables2Clouds podcast through how to consume the Isovalent free labs on https://isovalent.  
> [https://www.youtube.com/watch?v=-0eXstgFMjY&t=2515s](https://www.youtube.com/watch?v=-0eXstgFMjY&t=2515s)  
# Migrating to AWS
## YouTube Videos

> [!info] eCHO Episode 106: Live Migration to Cilium in AWS  
> Whether you are just starting to learn about eBPF, you're looking for further material or you're a seasoned contributor to major eBPF projects, the eBPF & Cilium Community is here to support you.  
> [https://www.youtube.com/watch?v=kurMo3r4Ol4](https://www.youtube.com/watch?v=kurMo3r4Ol4)  

> [!info] How to migrate from the Amazon VPC CNI to Cilium in K8s • Federico & Simone • PlatformCon 2022  
> In this talk, Federico Hernandez and Simone Sciarrati will dive into how they performed the migration of the networking component for Meltwater’s production Kubernetes clusters - from the AWS VPC CNI plugin to Cilium.  
> [https://youtu.be/6Sks_Th99t0?si=ZrypE5TGtSdTboOG](https://youtu.be/6Sks_Th99t0?si=ZrypE5TGtSdTboOG)  
[https://www.youtube.com/watch?v=w6S6baRHHu8&list=PLDg_GiBbAx-kDXqDYimwytMLh2kAHyMPd&t=182s](https://www.youtube.com/watch?v=w6S6baRHHu8&list=PLDg_GiBbAx-kDXqDYimwytMLh2kAHyMPd&t=182s)
## Blogs

> [!info] Episode 106 - HackMD  
> With Dan Finneran  
> [https://hackmd.io/@Echo-Live/106](https://hackmd.io/@Echo-Live/106)  

> [!info] Cilium: Installing Cilium in EKS with no Kube-Proxy  
> Cilium in EKS and no KPR  
> [https://medium.com/@amitmavgupta/cilium-installing-cilium-in-eks-with-no-kube-proxy-86f54a56c360](https://medium.com/@amitmavgupta/cilium-installing-cilium-in-eks-with-no-kube-proxy-86f54a56c360)  

> [!info] Architecting for Resilience: Crafting Opinionated EKS Clusters with Karpenter & Cilium Cluster Mesh — Part 1  
> Welcome to the future of digital ecosystems, where robustness meets unparalleled innovation!  
> [https://dev.to/aws-builders/architecting-for-resilience-crafting-opinionated-eks-clusters-with-karpenter-cilium-cluster-mesh-part-1-1b9a](https://dev.to/aws-builders/architecting-for-resilience-crafting-opinionated-eks-clusters-with-karpenter-cilium-cluster-mesh-part-1-1b9a)  

> [!info] Build secure Amazon EKS with Cilium and network encryption  
> Build “cheap and secure” Amazon EKS with Karpenter and Cilium  
> [https://ruzickap.github.io/posts/cilium-amazon-eks/](https://ruzickap.github.io/posts/cilium-amazon-eks/)  

> [!info] Building robust platform for containers part 1 — Terraform, EKS & Cillium  
> Welcome to this blog post series where we will try to go through a robust way to create your robust platform for running container…  
> [https://blog.raftech.nl/building-robust-platform-for-containers-part-1-terraform-eks-cillium-5822a13d3113](https://blog.raftech.nl/building-robust-platform-for-containers-part-1-terraform-eks-cillium-5822a13d3113)  

> [!info] eBPF - Cilium on FHIR® - A Star Wars Story  
> &nbsp; Anakin Skywalker challenged the high ground and has been terribly injured on Mustafar.  
> [https://community.intersystems.com/post/ebpf-cilium-fhir%C2%AE-star-wars-story](https://community.intersystems.com/post/ebpf-cilium-fhir%C2%AE-star-wars-story)  

> [!info] Transparent encryption of node to node traffic on Amazon EKS using WireGuard and Cilium | Amazon Web Services  
> Introduction As the move to cloud native architectures continues to accelerate, one of the common challenges we hear from our customers is that adopting security best practices in Kubernetes clusters can be challenging.  
> [https://aws.amazon.com/blogs/containers/transparent-encryption-of-node-to-node-traffic-on-amazon-eks-using-wireguard-and-cilium/](https://aws.amazon.com/blogs/containers/transparent-encryption-of-node-to-node-traffic-on-amazon-eks-using-wireguard-and-cilium/)  

> [!info] Running a Single-Node Kubernetes Cluster on Your Laptop with Hyper-V  
> I recently upgraded my old laptop from 16GB to a whopping 64GB of RAM.  
> [https://medium.com/@shih.chieh.cheng/running-a-single-node-kubernetes-cluster-on-your-laptop-with-hyper-v-e83836f25df1](https://medium.com/@shih.chieh.cheng/running-a-single-node-kubernetes-cluster-on-your-laptop-with-hyper-v-e83836f25df1)  

> [!info] Cilium & Argo CD on a Single-Node Kubernetes Cluster on Your Laptop — A Love Story of eBPF and…  
> After setting up a functional Kubernetes cluster in Blog 1, the cluster is just at the starting point.  
> [https://medium.com/@shih.chieh.cheng/cilium-argo-cd-on-a-single-node-kubernetes-cluster-on-your-laptop-a-love-story-of-ebpf-and-44936ea38ff1](https://medium.com/@shih.chieh.cheng/cilium-argo-cd-on-a-single-node-kubernetes-cluster-on-your-laptop-a-love-story-of-ebpf-and-44936ea38ff1)  

> [!info] Cilium 1.12 - Ingress, Multi-Cluster, Service Mesh, External Workloads, ...  
> Cilium 1.  
> [https://isovalent.com/blog/post/cilium-release-112/#eni-prefix-delegation](https://isovalent.com/blog/post/cilium-release-112/#eni-prefix-delegation)  

> [!info] Introduction to eBPF and Cilium  
> Imagine being able to run programs directly at the core of your operating system—right within the kernel.  
> [https://everythingdevops.dev/introduction-to-ebpf-and-cilium/](https://everythingdevops.dev/introduction-to-ebpf-and-cilium/)  
# Practice Labs
### eBPF

> [!info] Getting started with eBPF - Isovalent  
> In this Isovalent lab, you will learn how to write your first eBPF code.  
> [https://isovalent.com/labs/ebpf-getting-started/](https://isovalent.com/labs/ebpf-getting-started/)  

> [!info] Learning eBPF Tutorial - Isovalent  
> In this hands-on tutorial, learn with Liz Rice the basics of eBPF, including BPFtool, maps, eBPF for networking and the eBPF verifier.  
> [https://isovalent.com/labs/ebpf-tutorial/](https://isovalent.com/labs/ebpf-tutorial/)  
### Gateway API

> [!info] Cilium Gateway API - Isovalent  
> In this Isovalent lab, learn how to use Cilium Gateway API to route HTTP and HTTPS traffic into your Kubernetes-hosted application.  
> [https://isovalent.com/labs/cilium-gateway-api/](https://isovalent.com/labs/cilium-gateway-api/)  

> [!info] Advanced Gateway API Use Cases - Isovalent  
> Learn about additional specific use cases for Cilium Gateway API: Traffic splitting, HTTP request header rewrite, and others.  
> [https://isovalent.com/labs/cilium-gateway-api-advanced/](https://isovalent.com/labs/cilium-gateway-api-advanced/)  
  
### Functionalities

> [!info] Discovery: Platform Engineer - Isovalent  
> This hands-on discovery lab is designed for Platform and DevOps Engineers.  
> [https://isovalent.com/labs/discovery-platform-engineer/](https://isovalent.com/labs/discovery-platform-engineer/)  

> [!info] Isovalent Enterprise for Cilium: Cilium Multi-Networking - Isovalent  
> In this hands-on lab, you will learn how to use Isovalent Enterprise for Cilium to connect your Pod to multiple networks!  
> [https://isovalent.com/labs/cilium-multi-networking/](https://isovalent.com/labs/cilium-multi-networking/)  

> [!info] Discovery: Cloud Network Engineer - Isovalent  
> This hands-on discovery lab is designed for Cloud Network Engineers.  
> [https://isovalent.com/labs/discovery-cloud-network-engineer/](https://isovalent.com/labs/discovery-cloud-network-engineer/)  

> [!info] Discovery: SecOps Engineer - Isovalent  
> This hands-on discovery lab is designed for SecOps Engineers.  
> [https://isovalent.com/labs/discovery-secops-engineer/](https://isovalent.com/labs/discovery-secops-engineer/)  
  
# Service Mesh
## Blogs

> [!info] From sidecars to sidecarless: Tracing the evolution of service mesh technologies with Istio and Cilium  
> Learn how technologies like Istio Ambient and Cilium revolutionize microservices networking, offering unprecedented capabilities in traffic management, observability, and security.  
> [https://www.codecentric.de/wissens-hub/blog/sidecars-sidecarless-evolution-service-mesh-technologies-istio-cilium](https://www.codecentric.de/wissens-hub/blog/sidecars-sidecarless-evolution-service-mesh-technologies-istio-cilium)  

> [!info] Integrating Dapr with Cilium: A Sidecar-Less Service Mesh Approach combined with a powerful distributed application runtime  
> Cilium and Dapr can be harmonized to create a cutting-edge infrastructure that simplifies service management while enhancing scalability and reliability.  
> [https://www.codecentric.de/wissens-hub/blog/integrating-dapr-with-cilium-a-sidecar-less-service-mesh-approach-combined-with-a-powerful-distributed-application-runtime](https://www.codecentric.de/wissens-hub/blog/integrating-dapr-with-cilium-a-sidecar-less-service-mesh-approach-combined-with-a-powerful-distributed-application-runtime)  
  
## Cluster Mesh
### YouTube

> [!info] Cilium ClusterMesh in Action: Strengthening Security Across Distributed Kubernetes Clusters  
> Don't miss out!  
> [https://youtu.be/MSqI-gBiCrc?si=yHW7M4iF_120cq_I](https://youtu.be/MSqI-gBiCrc?si=yHW7M4iF_120cq_I)  

> [!info] Simplifying Multi-Cluster and Multi-Cloud Deployments with Cilium - Liz Rice, Isovalent  
> Don't miss out!  
> [https://youtu.be/qbB3TEiOb24?si=2aI1P87fMb4U7lLg](https://youtu.be/qbB3TEiOb24?si=2aI1P87fMb4U7lLg)  
## Security with Cilium
### YouTube

> [!info] Controlling Access to External APIs with Cilium - Luis Ramírez, SuperOrbital  
> Controlling Access to External APIs with Cilium - Luis Ramírez, SuperOrbital  
> [https://youtu.be/eWJmIfX2E38?si=LsQcnTeUFerje6RA](https://youtu.be/eWJmIfX2E38?si=LsQcnTeUFerje6RA)  

> [!info] GitHub - superorbital/ciliumcon-na-2023-l7-external-api-control: Configuring Cilium to limit access to external APIs with L7 Network Policies!  
> Configuring Cilium to limit access to external APIs with L7 Network Policies!  
> [https://github.com/superorbital/ciliumcon-na-2023-l7-external-api-control](https://github.com/superorbital/ciliumcon-na-2023-l7-external-api-control)  
## Installation
### KinD

> [!info] Installation Using Kind — Cilium 1.16.1 documentation  
> This guide uses kind to demonstrate deployment  
> [https://docs.cilium.io/en/stable/installation/kind/](https://docs.cilium.io/en/stable/installation/kind/)  
### EKS

> [!info] GitHub - aws-samples/cilium-service-mesh-on-eks  
> Contribute to aws-samples/cilium-service-mesh-on-eks development by creating an account on GitHub.  
> [https://github.com/aws-samples/cilium-service-mesh-on-eks?tab=readme-ov-file](https://github.com/aws-samples/cilium-service-mesh-on-eks?tab=readme-ov-file)  

> [!info] Getting Started with Cilium Service Mesh on Amazon EKS | Amazon Web Services  
> Cilium is an open source solution for providing, securing, and observing network connectivity between workloads, powered by the revolutionary kernel technology called extended Berkeley Packet Filter (eBPF).  
> [https://aws.amazon.com/blogs/opensource/getting-started-with-cilium-service-mesh-on-amazon-eks/](https://aws.amazon.com/blogs/opensource/getting-started-with-cilium-service-mesh-on-amazon-eks/)  
==**Alvin showcasing how to provision an eks cluster with Cilium as the default CNI and ArgoCD using terraform as infrastructure as code**==

> [!info] GitHub - alvo254/ekscape: duddle of cilium, eks, terraform and argocd  
> duddle of cilium, eks, terraform and argocd.  
> [https://github.com/alvo254/ekscape](https://github.com/alvo254/ekscape)  
  

> [!info] Amazon EKS introduces cluster creation flexibility for networking add-ons - AWS  
> Discover more about what's new at AWS with Amazon EKS introduces cluster creation flexibility for networking add-ons  
> [https://aws.amazon.com/about-aws/whats-new/2024/06/amazon-eks-cluster-creation-flexibility-networking-add-ons/](https://aws.amazon.com/about-aws/whats-new/2024/06/amazon-eks-cluster-creation-flexibility-networking-add-ons/)  

> [!info] Terraform Registry  
>  
> [https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_cluster#bootstrap_self_managed_addons](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_cluster#bootstrap_self_managed_addons)  

> [!info] eCHO Episode 151: Bring Your Own CNI with Amazon EKS and Cilium  
> Whether you are just starting to learn about eBPF, you're looking for further material or you're a seasoned contributor to major eBPF projects, the eBPF & Cilium Community is here to support you.  
> [https://www.youtube.com/watch?v=DnzwxDxgkvk&list=TLPQMzEwODIwMjTo5VEMEuVGmA&index=3](https://www.youtube.com/watch?v=DnzwxDxgkvk&list=TLPQMzEwODIwMjTo5VEMEuVGmA&index=3)  

> [!info] Cilium: Installing Cilium in EKS with no Kube-Proxy  
> Cilium in EKS and no KPR  
> [https://medium.com/@amitmavgupta/cilium-installing-cilium-in-eks-with-no-kube-proxy-86f54a56c360](https://medium.com/@amitmavgupta/cilium-installing-cilium-in-eks-with-no-kube-proxy-86f54a56c360)  

> [!info] EKS & Isovalent Enterprise for Cilium - Reducing Operational Complexity Isovalent - Isovalent  
> This article shows how to initially deploy an EKS cluster without a preinstalled CNI plugin and then add Isovalent Enterprise for Cilium as the CNI plugin.  
> [https://isovalent.com/blog/post/eks-isovalent-enterprise-for-cilium/](https://isovalent.com/blog/post/eks-isovalent-enterprise-for-cilium/)  
### AKS

> [!info] GitHub - amitmavgupta/azure-terraform: Create AKS clusters with Cilium and Isovalent  
> Create AKS clusters with Cilium and Isovalent.  
> [https://github.com/amitmavgupta/azure-terraform](https://github.com/amitmavgupta/azure-terraform)  
  
## Using Cilium Gateway API with Argo Rollouts

> [!info] rollouts-plugin-trafficrouter-gatewayapi/examples/cilium at main · argoproj-labs/rollouts-plugin-trafficrouter-gatewayapi  
> The Argo Rollouts plugin implementing the Kubernetes Gateway API specification for using different traffic providers in progressive delivery scenarios - argoproj-labs/rollouts-plugin-trafficrouter-.  
> [https://github.com/argoproj-labs/rollouts-plugin-trafficrouter-gatewayapi/tree/main/examples/cilium](https://github.com/argoproj-labs/rollouts-plugin-trafficrouter-gatewayapi/tree/main/examples/cilium)  

> [!info] GitHub - xtineskim/argocon-cilium  
> Contribute to xtineskim/argocon-cilium development by creating an account on GitHub.  
> [https://github.com/xtineskim/argocon-cilium](https://github.com/xtineskim/argocon-cilium)  

> [!info] Lightning Talk: Git Going Fast with Cilium and Argo - Christine Kim, Isovalent  
> Lightning Talk: Git Going Fast with Cilium and Argo - Christine Kim, Isovalent  
> [https://youtu.be/Ab9sctO-8Uk?si=-LJhySYPdsyd8o_1](https://youtu.be/Ab9sctO-8Uk?si=-LJhySYPdsyd8o_1)  
  
### *Security Onion & Wazuh
Try and install Cilium with Terraform resource argument **aws_eks_cluster:** `**[bootstrap_self_managed_addons](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/eks_cluster#bootstrap_self_managed_addons)**`
Construct of service
Construct of accessing a service
Construct of allowing a service to be accessed