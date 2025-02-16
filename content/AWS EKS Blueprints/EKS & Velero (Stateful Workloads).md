---
title: EKS & Velero (Stateful Workloads)
draft: false
tags:
---
 
  
[Velero](https://velero.io) (formerly Heptio Ark) gives you tools to back up and restore your Kubernetes cluster resources and persistent volumes. You can run Velero with a public cloud platform or on-premises. Velero lets you:
- Take backups of your cluster and restore in case of loss.
- Migrate cluster resources to other clusters.
- Replicate your production cluster to development and testing clusters.

> [!info] GitHub - vmware-tanzu/velero: Backup and migrate Kubernetes applications and their persistent volumes  
> Backup and migrate Kubernetes applications and their persistent volumes - vmware-tanzu/velero  
> [https://github.com/vmware-tanzu/velero](https://github.com/vmware-tanzu/velero)  

> [!info] Stateful - Amazon EKS Blueprints for Terraform  
> Please note: not all of the features listed below are required for stateful workloads on EKS.  
> [https://aws-ia.github.io/terraform-aws-eks-blueprints/patterns/stateful/](https://aws-ia.github.io/terraform-aws-eks-blueprints/patterns/stateful/)  
  
```SQL
psql -h db-sil-prod.c1i860escz1d.af-south-1.rds.amazonaws.com -U sil_root_prod -d postgres
pg_restore -h db-sil-prod.c1i860escz1d.af-south-1.rds.amazonaws.com -U ocl_prod_user -d ocl_prod_db -v --clean ocl.dump
pg_dump -h db-sil-prod.c1i860escz1d.af-south-1.rds.amazonaws.com -U postgres -d ocl -Fc -v -f ocl_aws.dump
CREATE ROLE ocl_prod_user WITH ENCRYPTED PASSWORD 'J0V3kmSfF279OEG';
ALTER ROLE ocl_prod_user WITH LOGIN;
CREATE DATABASE ocl_prod_db WITH OWNER ocl_prod_user;
```