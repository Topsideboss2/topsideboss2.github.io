---
title: AWS Distro for OpenTelemetry
draft: false
tags:
---
 
### Documentation

Find the official documentation [here](https://aws-otel.github.io/docs/introduction)
> [!important] Honorable mention to the AWS observability best practices documentation which can be found [here](https://aws-observability.github.io/observability-best-practices/)

### Repository

Link to the github repository is [here](https://github.com/aws-observability)

#### AWS Observability Accelerator For Terraform
https://github.com/Topsideboss2/topsideboss2.github.io/blob/v4/media/AWSObservabilityAcceleratorForTerraform.png?raw=true

Link to the documentation is [here](https://aws-observability.github.io/terraform-aws-observability-accelerator/)
Link to the examples on github is [here](https://github.com/aws-observability/terraform-aws-observability-accelerator/tree/main/examples)

#### AWS EKS Cluster Monitoring with AWS-Managed Open Source

Amazon EKS cluster monitoring with AWS-Managed Open Source [demo](https://aws-observability.github.io/terraform-aws-observability-accelerator/eks/)
This focuses on metrics collection to AMP(Amazon Managed Service for Prometheus)
> [!important] Link to the module eks_monitoring on github is [here](https://github.com/aws-observability/terraform-aws-observability-accelerator/tree/main/modules/eks-monitoring). If you understand it well enough, you can setup monitoring on your eks clusters without being dependent on their modules

#### AWS EKS Cluster Monitoring with Enhanced CloudWatch Container Insights

AWS EKS Cluster Monitoring with Enhanced CloudWatch Container Insights [demo](https://aws-observability.github.io/terraform-aws-observability-accelerator/container-insights/eks/)
This focuses on metrics collection to CloudWatch with enhanced observability through Container Insights
It does 2 things;
- Enables the CloudWatch Observability Add-on on EKS using the IAM service account role
- Creates an IAM Service Linked role for enabling Application Signals
> [!important] Link to the module eks_container_insights on github is [here](https://github.com/aws-observability/terraform-aws-observability-accelerator/tree/main/modules/eks-container-insights). If you understand it well enough, you can setup monitoring on your eks clusters without being dependent on their modules

