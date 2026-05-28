---
title: Grafana in Action
draft: true
tags:
---
 

### Helm Charts
https://github.com/grafana/helm-charts
  
### Configure Dashboards as ConfigMaps
1. Enable sidecar dashboards

> [!info] helm-charts/charts/grafana/README.md at main · grafana/helm-charts  
> Contribute to grafana/helm-charts development by creating an account on GitHub.  
> [https://github.com/grafana/helm-charts/blob/main/charts/grafana/README.md#sidecar-for-dashboards](https://github.com/grafana/helm-charts/blob/main/charts/grafana/README.md#sidecar-for-dashboards)  
1. Use these helm-charts to convert json files of dashboards to K8S configmaps

> [!info] GitHub - LiorLieberman/grafana-dashboards-helm: This chart will convert json files in the dashboards directory to a Kubernetes configmap that eventually will be a dashboard in grafana  
> This chart will convert json files in the dashboards directory to a Kubernetes configmap that eventually will be a dashboard in grafana - LiorLieberman/grafana-dashboards-helm  
> [https://github.com/LiorLieberman/grafana-dashboards-helm?tab=readme-ov-file](https://github.com/LiorLieberman/grafana-dashboards-helm?tab=readme-ov-file)  
Documentation to help:

> [!info] The GitOps Way for Consistent Monitoring  
> Improve monitoring consistency by shifting your Grafana dashboards Into Git  
> [https://medium.com/riskified-technology/consistent-monitoring-the-gitops-way-1d481e9965c9](https://medium.com/riskified-technology/consistent-monitoring-the-gitops-way-1d481e9965c9)