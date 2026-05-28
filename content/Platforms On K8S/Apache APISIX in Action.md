---
title: Apache APISIX in Action
draft: true
tags:
---
 
### Description

APISIX Ingress Controller offers more complex routing rules, rate limiting, circuit breaking, and other advanced features. It provides a rich plugin system, allowing integration of plugins through APISIX Ingress CRD using declarative configuration to handle authentication, authorization, monitoring, logging, and other functionalities. This enriches the capabilities of the APISIX Ingress Controller and simplifies configuration.

![](https://miro.medium.com/v2/resize:fit:1400/1*JnhskM6wNvXK3CGYEECHCw.png)
### Requirements

1. A running Elastic Kubernetes Service Cluster. You can use AKS, GKE, minikube
2. AWS EBS CSI Driver Add-on Installed ([Link](https://docs.aws.amazon.com/eks/latest/userguide/ebs-csi.html))
3. Kubectl installed
4. Helm
### Setup in Kubernetes using Helm

Documentation can be found [here](https://apisix.apache.org/docs/ingress-controller/deployments/aws/) 
Blog page can be found [here](https://medium.com/@yilialinn.api7/3-tips-for-deploying-apisix-in-kubernetes-part-1-15652a668785)

1. Install apisix and the ingress controller:
```bash
helm repo add apisix https://charts.apiseven.com
helm repo add bitnami https://charts.bitnami.com/bitnami
helm repo update
#  We use Apisix 3.0 in this example. If you're using Apisix v2.x, please set to v2
ADMIN_API_VERSION=v3
helm install apisix apisix/apisix \
  --set gateway.type=LoadBalancer \
  --set ingress-controller.enabled=true \
  --create-namespace \
  --namespace ingress-apisix \
  --set ingress-controller.config.apisix.serviceNamespace=ingress-apisix \
  --set ingress-controller.config.apisix.adminAPIVersion=$ADMIN_API_VERSION \
  --set apisix.ssl.enabled=true
kubectl get service --namespace ingress-apisix
```

2. Install Cert manager

```bash
helm repo add jetstack https://charts.jetstack.io
helm install cert-manager jetstack/cert-manager \
	--namespace cert-manager \
	--create-namespace \
	--version v1.14.4
```

3. Create LetsEncrypt-prod Certificate ClusterIssuer

```bash
cat > letsencrypt_issuer.yaml <<EOF
apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  annotations:
  name: letsencrypt-prod
spec:
  acme:
    email: platform@savannahinformatics.com
    privateKeySecretRef:
      name: letsencrypt-prod
    server: https://acme-v02.api.letsencrypt.org/directory
    solvers:
    - http01:
        ingress:
          class: kong
          podTemplate:
            metadata:
              annotations:
                kuma.io/sidecar-injection: "false"
                sidecar.istio.io/inject: "false"
            spec: {}

kubectl apply -f letsencrypt_issuer.yaml
```

4. Configuring a sample Ingress resource

```helm
# use v1beta1 if your Kubernetes cluster version is older than v1.19.0
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: httpserver-ingress
  namespace: httpserver
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  # we use APISIX Ingress and it watches Ingress resources with "apisix" ingressClassName
  ingressClassName: apisix
  rules:
  - host: local.httpbin.org
    http:
      paths:
      - backend:
          service:
            name: httpbin
            port:
              number: 80
        path: /
        pathType: Prefix
  tls:
  - hosts:
    - local.httpbin.org
    secretName: tls-httpbin-ingress
```

5. Apply it

```bash
kubectl apply -f httpbin-ingress.yaml
```

### Setup in VM using Ansible

### Blogs

> [!info] Setup an API-Gateway With Ingress Controller in a Kubernetes Cluster 
> https://medium.com/codex/setup-an-api-gateway-with-ingress-controller-in-a-kubernetes-cluster-78768281abbb

> [!info] Announcing open-appsec WAF integration with Apache APISIX API Gateway  
> open-appsec announces its new integration with APISIX gateway.  
> [https://www.openappsec.io/post/announcing-open-appsec-WAF-integration-with-Apache-APISIX-API-Gateway](https://www.openappsec.io/post/announcing-open-appsec-WAF-integration-with-Apache-APISIX-API-Gateway)
> 
> [Demo in Linux, Docker and K8S](https://medium.com/apache-apisix/announcing-integration-between-apache-apisix-and-open-appsec-waf-d17f784e2c29)
