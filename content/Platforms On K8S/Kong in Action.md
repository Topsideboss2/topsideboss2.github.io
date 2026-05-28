---
title: Kong in Action
draft: true
tags:
---
 
## Setup Kong Proxy on AWS

Install kong proxy in its own namespace. This will create an Elastic Load Balancer (ELB) on AWS

```bash
helm repo add kong https://charts.konghq.com
helm repo update
helm install kong/kong \
	--namespace kong \
	--create-namespace \
	--generate-name \
	--set admin.tls.enabled=true \
	--set admin.enabled=true \
	--set admin.http.enabled=true
```

Install Custom Resource Definitions for cert manager

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.4/cert-manager.crds.yaml
```

Install Cert manager

```bash
helm repo add jetstack https://charts.jetstack.io
helm install cert-manager jetstack/cert-manager \
	--namespace cert-manager \
	--create-namespace \
	--version v1.14.4
```

Create LetsEncrypt-prod Certificate ClusterIssuer

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

> From here you can proceed to create a `cname` or an `A record` for your domain name and deploy your ingress