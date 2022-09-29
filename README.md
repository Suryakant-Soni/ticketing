
1. Kubectl commands to run - 

2. command to run for start ingress-nginx deployment service -
"kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.3.1/deploy/static/provider/cloud/deploy.yaml"

3. create k8s secret - 
"kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf"


4. skaffold command - 
"skaffold dev"
