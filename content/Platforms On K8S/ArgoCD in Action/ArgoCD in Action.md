---
title: ArgoCD in Action
draft: true
tags:
---
 
  
[[Release Strategies with Argo Rollouts]]
  
## Github Links

> [!info] platforms-on-k8s/chapter-4/README.md at main · salaboy/platforms-on-k8s  
> Platform Engineering on Kubernetes :: Book Examples - salaboy/platforms-on-k8s  
> [https://github.com/salaboy/platforms-on-k8s/blob/main/chapter-4/README.md](https://github.com/salaboy/platforms-on-k8s/blob/main/chapter-4/README.md)  
  
### Blogs

> [!info] Setting Up a GitOps Workflow with Argo CD and GitHub Actions  
> GitOps is gaining increasing popularity these days, and for good reason.  
> [https://arshsharma.com/posts/2023-10-14-argocd-github-actions-getting-started/](https://arshsharma.com/posts/2023-10-14-argocd-github-actions-getting-started/)  
  
## YouTube
### Deploying in ArgoCD
Here's a table representation of the selected deployment strategies:

|                              |                               |
| ---------------------------- | ----------------------------- |
| **Deployment Strategy**      | **Cluster Configuration**     |
| Deploy One Environment       | Same cluster as ArgoCD        |
| Deploy Multiple Environments | Same cluster as ArgoCD        |
| Deploy One Environment       | Different cluster from ArgoCD |
| Deploy Multiple Environments | Different cluster from ArgoCD |
| Deploy Specific Environments | Specific clusters             |

> [!info] Managing GitOps Deployments in Multi-cluster Production Environments - Roberto Carratala Sanchez  
> Managing GitOps Deployments in Multi-cluster Production Environments - Roberto Carratala Sanchez, Red Hat  
> [https://youtu.be/deiTf2Zw_FU?si=kuBGWnl2rDvldAht](https://youtu.be/deiTf2Zw_FU?si=kuBGWnl2rDvldAht)  
### App of Apps Pattern

> [!info] 🎆 CNDO #22: Using the Argo CD ApplicationSet controller  
> Happy 4th, America!  
> [https://www.bretfisher.com/cloud-native-devops-22/](https://www.bretfisher.com/cloud-native-devops-22/)


## Setup and Configuration

### Installation

Install ArgoCD with the following commands:
```bash
kubectl create namespace argocd 
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

Install the HA version of ArgoCD with the following commands:
```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://github.com/argoproj/argo-cd/blob/master/manifests/ha/install.yaml
```

>[!info] This version of ArgoCD requires at least three different nodes due to pod anti-affinity roles in the specs

### UI Access

In order to access the server UI you have the following two options:

#### A. Port Forwarding

Port forward to see if you can access the UI
```bash
kubectl port-forward service/argo-cd-argocd-server -n argocd 8080:443
```
Open the browser on <http://localhost:8080> and accept the certificate

#### B. Ingress/Ingress-Controller

> [!info] Ensure you have an ingress/ingress-controller installed. Follow the following steps to install Kong Ingress Controller in your K8S cluster - [[Kong in Action]]

Enable ingress in the values file `server.ingress.enabled` and choose either to use:
###### 1. SSL-PASSTHROUGH

Add the annotation for ssl passthrough: [https://argo-cd.readthedocs.io/en/stable/operator-manual/ingress/\#option-1-ssl-passthrough](https://argo-cd.readthedocs.io/en/stable/operator-manual/ingress/\#option-1-ssl-passthrough)

>[!warning] Kong Ingress does not support TLS/SSL passthrough

###### 2. SSL Termination at Ingress Controller

First and foremost, ensure the API server is running with TLS disabled. Edit the `argocd-server`deployment to add the `--insecure` flag to the argocd-server command, or simply set `server.insecure: "true"` in the `argocd-cmd-params-cm` ConfigMap. Refer to [this](https://argo-cd.readthedocs.io/en/stable/operator-manual/ingress/\#option-2-multiple-ingress-objects-and-hosts)

Create the grpc service
```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    konghq.com/protocol: grpc
  labels:
    app.kubernetes.io/component: server
    app.kubernetes.io/name: argocd-server
    app.kubernetes.io/part-of: argocd
  name: argocd-server-grpc
  namespace: argocd
spec:
  ports:
  - name: grpc
    port: 443
    protocol: TCP
    targetPort: 8080
  selector:
    app.kubernetes.io/name: argocd-server
```

Create the http/https ingress resource
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    konghq.com/https-redirect-status-code: "301"
    konghq.com/protocol: https
  labels:
    name: argocd-ing
  name: argocd-ing
  namespace: argocd
spec:
  ingressClassName: kong
  rules:
  - host: argocd.io.slade360edi.com
    http:
      paths:
      - backend:
          service:
            name: argocd-server
            port:
              number: 443
        path: /
        pathType: ImplementationSpecific
  tls:
  - hosts:
    - argocd.io.slade360edi.com
    secretName: tls-argocd-ing
```

Create the grpc ingress resource
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
    konghq.com/protocols: grpc,grpcs
  name: argocd-ing-grpc
  namespace: argocd
spec:
  ingressClassName: kong
  rules:
  - host: grpc.argocd.io.slade360edi.com
    http:
      paths:
      - backend:
          service:
            name: argocd-server-grpc
            port:
              number: 443
        path: /
        pathType: ImplementationSpecific
  tls:
  - hosts:
    - grpc.argocd.io.slade360edi.com
    secretName: tls-argocd-ing-grpc
```

After reaching the UI the first time you can login with username: admin and the random password generated during the installation. You can find the password by running:

```bash
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

You should delete the initial secret afterwards as suggested by the Getting Started Guide: <https://argo-cd.readthedocs.io/en/stable/getting_started/\#4-login-using-the-cli>

