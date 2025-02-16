---
title: EKS, Terraform & ArgoCD
draft: false
tags:
---
 
## ArgoCD Bridge
This talk explains how to connect Terraform and ArgoCD in different setups, including when ArgoCD is used as a service. It shows how ArgoCD can store and use information about clusters and cloud resources using various methods like Cluster secrets, Git, and Plugins. These methods are part of the GitOps-Bridge approach.

> [!info] ArgoCD - Getting Started - Amazon EKS Blueprints for Terraform  
> This tutorial guides you through deploying an Amazon EKS cluster with addons configured via ArgoCD, employing the GitOps Bridge Pattern.  
> [https://aws-ia.github.io/terraform-aws-eks-blueprints/patterns/gitops/gitops-getting-started-argocd/](https://aws-ia.github.io/terraform-aws-eks-blueprints/patterns/gitops/gitops-getting-started-argocd/)  

> [!info] Blue/Green Upgrade - Amazon EKS Blueprints for Terraform  
> This directory provides a solution based on EKS Blueprint for Terraform that shows how to leverage blue/green or canary application workload migration between EKS clusters, using Amazon Route 53 weighted routing feature.  
> [https://aws-ia.github.io/terraform-aws-eks-blueprints/patterns/blue-green-upgrade/](https://aws-ia.github.io/terraform-aws-eks-blueprints/patterns/blue-green-upgrade/)  
### Github Links

> [!info] gitops-bridge-dev  
> gitops-bridge-dev has 13 repositories available.  
> [https://github.com/gitops-bridge-dev](https://github.com/gitops-bridge-dev)  
  
### YouTube Links
[https://youtu.be/ggJzfJgWO8c?si=_FH-nzYAbbpi3-ND](https://youtu.be/ggJzfJgWO8c?si=_FH-nzYAbbpi3-ND)

> [!info] Terraforming ArgoCD: The GitOps Bridge - Brian Fox, Midnite  
> Terraforming ArgoCD: The GitOps Bridge - Brian Fox, Midnite  
> [https://youtu.be/TrTRy8ahIHc?si=BvSakO037l497M1R](https://youtu.be/TrTRy8ahIHc?si=BvSakO037l497M1R)  
### Deploy Demo

> [!info] gitops-bridge/argocd/iac/terraform/examples/eks/getting-started at main · gitops-bridge-dev/gitops-bridge  
> Contribute to gitops-bridge-dev/gitops-bridge development by creating an account on GitHub.  
> [https://github.com/gitops-bridge-dev/gitops-bridge/tree/main/argocd/iac/terraform/examples/eks/getting-started](https://github.com/gitops-bridge-dev/gitops-bridge/tree/main/argocd/iac/terraform/examples/eks/getting-started)  
[https://github.com/gitops-bridge-dev/kubecon-2023-na-argocon/blob/main/terraform/eks-argocd/README.md](https://github.com/gitops-bridge-dev/kubecon-2023-na-argocon/blob/main/terraform/eks-argocd/README.md)

> [!info] GitHub - onematchfox/terraforming-argocd: Companion repo for talk Terraforming ArgoCD - The GitOps Bridge  
> Companion repo for talk Terraforming ArgoCD - The GitOps Bridge - onematchfox/terraforming-argocd  
> [https://github.com/onematchfox/terraforming-argocd/tree/main](https://github.com/onematchfox/terraforming-argocd/tree/main)  
Complete sample:

> [!info] gitops-bridge/argocd/iac/terraform/examples/eks/complete at main · gitops-bridge-dev/gitops-bridge  
> Contribute to gitops-bridge-dev/gitops-bridge development by creating an account on GitHub.  
> [https://github.com/gitops-bridge-dev/gitops-bridge/tree/main/argocd/iac/terraform/examples/eks/complete](https://github.com/gitops-bridge-dev/gitops-bridge/tree/main/argocd/iac/terraform/examples/eks/complete)  
Sample workload repository

> [!info] GitHub - aws-samples/eks-blueprints-workloads  
> Contribute to aws-samples/eks-blueprints-workloads development by creating an account on GitHub.  
> [https://github.com/aws-samples/eks-blueprints-workloads](https://github.com/aws-samples/eks-blueprints-workloads)  
  
Multi-cluster topology deployment (Hub & Spoke)

> [!info] GitOps Multi-Cluster Hub-Spoke Topology (ArgoCD) - Amazon EKS Blueprints for Terraform  
> This tutorial guides you through deploying an Amazon EKS cluster with addons configured via ArgoCD in a Multi-Cluster Hub-Spoke topology, employing the GitOps Bridge Pattern.  
> [https://aws-ia.github.io/terraform-aws-eks-blueprints/patterns/gitops-multi-cluster-hub-spoke-argocd/](https://aws-ia.github.io/terraform-aws-eks-blueprints/patterns/gitops-multi-cluster-hub-spoke-argocd/)  

> [!info] Create AWS objects and EKS - Multitenant+Multicluster Amazon EKS installation using Terraform, GitHub Actions and ArgoCD  
> Few notes about Multitenant+Multicluster Amazon EKS installation using Terraform, GitHub Actions and ArgoCD  
> [https://ruzickap.github.io/k8s-tf-eks-gitops/part-01.html](https://ruzickap.github.io/k8s-tf-eks-gitops/part-01.html)  

> [!info] GitHub - ruzickap/k8s-tf-eks-gitops: Multitenant+Multicluster Amazon EKS installation using Terraform, GitHub Actions and GitOps  
> Multitenant+Multicluster Amazon EKS installation using Terraform, GitHub Actions and GitOps - ruzickap/k8s-tf-eks-gitops  
> [https://github.com/ruzickap/k8s-tf-eks-gitops](https://github.com/ruzickap/k8s-tf-eks-gitops)  

> [!info] Securing Multi-Cluster ArgoCD  
> Learn how to securely integrate ArgoCD with remote Kubernetes clusters with short lived tokens based on ArgoCD's Kubernetes identity.  
> [https://www.tremolosecurity.com/post/securing-multi-cluster-argocd](https://www.tremolosecurity.com/post/securing-multi-cluster-argocd)  
### Using Cilium Gateway API with Argo Rollouts

> [!info] rollouts-plugin-trafficrouter-gatewayapi/examples/cilium at main · argoproj-labs/rollouts-plugin-trafficrouter-gatewayapi  
> The Argo Rollouts plugin implementing the Kubernetes Gateway API specification for using different traffic providers in progressive delivery scenarios - argoproj-labs/rollouts-plugin-trafficrouter-.  
> [https://github.com/argoproj-labs/rollouts-plugin-trafficrouter-gatewayapi/tree/main/examples/cilium](https://github.com/argoproj-labs/rollouts-plugin-trafficrouter-gatewayapi/tree/main/examples/cilium)  

> [!info] GitHub - xtineskim/argocon-cilium  
> Contribute to xtineskim/argocon-cilium development by creating an account on GitHub.  
> [https://github.com/xtineskim/argocon-cilium](https://github.com/xtineskim/argocon-cilium)  

> [!info] Lightning Talk: Git Going Fast with Cilium and Argo - Christine Kim, Isovalent  
> Lightning Talk: Git Going Fast with Cilium and Argo - Christine Kim, Isovalent  
> [https://youtu.be/Ab9sctO-8Uk?si=-LJhySYPdsyd8o_1](https://youtu.be/Ab9sctO-8Uk?si=-LJhySYPdsyd8o_1)  
  
# Steps to follow
1. Initialize the terraform repository  
      
    `terraform init`
2. Plan your terraform infrastructure  
      
    `terraform plan`
3. Apply your terraform configuration  
      
    `terraform apply -auto-approve`
4. Add the newly added cluster to your local kubeconfig  
      
    `aws eks update-kubeconfig --name staging-argocd-apps --region us-east-1`
5. Get namespaces in the cluster  
      
    `kubectl get ns`
6. Get all the metadata for your deployment that terraform used  
      
    `kubectl get secret -n argocd -l` `[argocd.argoproj.io/secret-type=cluster](http://argocd.argoproj.io/secret-type=cluster)` `-o json | jq '.items[0].metadata.annotations'`  
    Output:  
    
```YAML
{
  "addons_repo_basepath": "",
  "addons_repo_path": "bootstrap/control-plane/addons",
  "addons_repo_revision": "main",
  "addons_repo_url": "https://github.com/gitops-bridge-dev/gitops-bridge-argocd-control-plane-template",
  "aws_account_id": "381492312241",
  "aws_cluster_name": "staging-argocd-apps",
  "aws_region": "us-east-1",
  "aws_vpc_id": "vpc-01f56e2d74022019d",
  "cluster_name": "in-cluster",
  "environment": "dev",
  "workload_repo_basepath": "argocd/iac/terraform/examples/eks/",
  "workload_repo_path": "getting-started/k8s",
  "workload_repo_revision": "main",
  "workload_repo_url": "https://github.com/gitops-bridge-dev/gitops-bridge"
}
```
1. Get all the addons enabled in ArgoCD  
      
    `kubectl get secret -n argocd -l` `[argocd.argoproj.io/secret-type=cluster](http://argocd.argoproj.io/secret-type=cluster)` `-o json | jq '.items[0].metadata.labels'`  
    Output:  
    
```YAML
{
  "argocd.argoproj.io/secret-type": "cluster",
  "aws_cluster_name": "staging-argocd-apps",
  "cluster_name": "in-cluster",
  "enable_argo_events": "true",
  "enable_argo_rollouts": "true",
  "enable_argo_workflows": "true",
  "enable_argocd": "true",
  "enable_cluster_proportional_autoscaler": "false",
  "enable_gatekeeper": "false",
  "enable_gpu_operator": "false",
  "enable_ingress_nginx": "false",
  "enable_keda": "true",
  "enable_kube_prometheus_stack": "false",
  "enable_kyverno": "false",
  "enable_metrics_server": "true",
  "enable_prometheus_adapter": "true",
  "enable_secrets_store_csi_driver": "false",
  "enable_vpa": "false",
  "environment": "dev",
  "kubernetes_version": "1.30"
}
```
1. Obtain the password to login with the command below:  
      
    `argocd admin initial-password -n argocd`
2. Get the ArgoCD external IP from kubectl  
      
    `kubectl get all -n argocd`
3. Login to ArgoCD using the CLI  
      
    `argocd login a2c5deb76bed5456e8cf8b099b632e0d-1972979710.us-east-1.elb.amazonaws.com`  
    Username:  
    `admin`  
    Password:  
    `lKBtBoGHsMyEV-Us`
4. Change the login password  
      
    `argocd account update-password`
5. Login to the UI  
      
    `a2c5deb76bed5456e8cf8b099b632e0d-1972979710.us-east-1.elb.amazonaws.com`