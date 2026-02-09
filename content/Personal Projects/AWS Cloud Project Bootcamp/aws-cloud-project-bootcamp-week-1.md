---
title: AWS Cloud Project Bootcamp Week 1
subtitle: Week-1 Homework Challenge - How to Deploy Frontend & Backend Containers on an EC2 Instance
date: 2023-03-29T23:16:41.892Z
readTime: 5 min
slug: aws-cloud-project-bootcamp
tags:
  - aws
  - aws-cloud-project-bootcamp
  - docker
  - containers
---
![](https://github.com/Topsideboss2/topsideboss2.github.io/blob/v4/media/tintin-captain.png?raw=true)

[AWS Ontario Virtual User Group's](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwi1rcmh9oH-AhVE66QKHbt8AL0QFnoECBAQAQ&url=https%3A%2F%2Fwww.meetup.com%2Faws-ontario-virtual-user-group%2F&usg=AOvVaw0KtOvXsxt1UQfkVFrPrFH8) Cloud Project Bootcamp is a lot of things but easy isn't one of them. And for that, I am grateful to the organizers/instructors. In fact, the only appropriate response from Tintin should've been "Tell me about it, Cap".

Where we are now, is it week 6? Week 7? I'm gonna be honest, I lost count at week 4 guys. If you don't believe me? I'll let this tweet by [Andrew Brown](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjZi5TS-IH-AhUxRfEDHYK7A8wQ6F56BAgIEAE&url=https%3A%2F%2Ftwitter.com%2Fandrewbrown%3Fref_src%3Dtwsrc%255Egoogle%257Ctwcamp%255Eserp%257Ctwgr%255Eauthor&usg=AOvVaw1yY-hlo_ixLQR5TAVy8YmK) do the talking:

![](https://twitter.com/andrewbrown/status/1628122296748752896?s=61&t=u-AwAA7tJdEGo1LU2a00jw) 

Now more than ever, I understand how easy it is for participants to fall behind. And in a bid to help nobody feel left out, I will try to share how I was able to complete some homework challenges throughout the course of the [bootcamp](https://aws.cloudprojectbootcamp.com). Let's get started:

This week, I take us back to Week 1's homework challenge: Launch an EC2 instance that has docker installed, and pull a container to demonstrate you can run your own docker processes. During [week 1](https://github.com/omenking/aws-bootcamp-cruddur-2023/tree/week-1), we created a dockerfile for both our [frontend](https://github.com/omenking/aws-bootcamp-cruddur-2023/blob/week-1/frontend-react-js/Dockerfile) and [backend](https://github.com/omenking/aws-bootcamp-cruddur-2023/blob/week-1/backend-flask/Dockerfile) containers and a [docker-compose.yml](https://github.com/omenking/aws-bootcamp-cruddur-2023/blob/week-1/docker-compose.yml) file as well. These are what we will use to build our images. Using these images we will build, we will then create a running instance(known as a container) on our EC2 instance.

**NB**: I will not be repeating what is taught on the [bootcamp](https://aws.cloudprojectbootcamp.com) (primarily because I know I can't even do half the job Andrew Brown and the guest instructors do) so I will advise you to go and watch the linked videos at the end of this article for further understanding of what is going on.

### Creating an EC2 Instance

Log into the [AWS Console](https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fus-east-1.console.aws.amazon.com%2Fconsole%2Fhome%3FhashArgs%3D%2523%26isauthcode%3Dtrue%26region%3Dus-east-1%26state%3DhashArgsFromTB_us-east-1_83491dec0483b96a&client_id=arn%3Aaws%3Asignin%3A%3A%3Aconsole%2Fcanvas&forceMobileApp=0&code_challenge=cC5oI2Web1N8yHrNHcqkEPFqbZZlf0t2K3eo1VPrnf4&code_challenge_method=SHA-256) (Use an IAM user account for best security practices) and navigate to the EC2 Instance console. Under **Instances,** click on the **Launch Instance.**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680123115548/63f7ad19-dd34-40fd-817b-81028a44f520.png align="center")

We will configure a simple EC2 instance with the following configurations:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680124042270/2192becf-1392-491a-a559-440d2debd97a.png align="center")

Create a new key pair login that we will use to SSH to our instance

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680124047754/4955fc32-d9e5-428b-968b-51c82b6f6c08.png align="center")

Go to advanced network settings and add ports 22(SSH), 3000(frontend), 4567(backend), 443(HTTPS) and 80(HTTP) to our security group.

Configure storage settings as shown below and launch your instance.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680124066818/faa8d332-3068-480e-ac5c-66cf4ee01e2e.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680124652575/d7cf8997-b430-40bc-bee7-2941bb33774b.png align="center")

Now that our instance is running, let's SSH into it using the ipv4 address given to us. I will be using Termius to SSH into my instance with the key pair I just created.

### Install Docker

My installation is on Ubuntu 22.04.

```bash
# First, update your existing list of packages
sudo apt update

# install a few prerequisite packages
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y

# add the GPG key for the official Docker repository 
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add the Docker repository to APT sources
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update your existing list of packages again
sudo apt update

# Finally, install Docker
sudo apt install docker-ce -y

# Check that it’s running
sudo systemctl status docker
```

Output:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680125370917/51684bfc-4544-4871-8187-f91dbe94c365.png align="center")

Next step, clone your aws-bootcamp-cruddur-2023 repository in your EC2 instance. Navigate to your `cd /home/ubuntu/` directory first and clone your repo.

### Create a Bash Script

I created a bash script called `ec2.sh` that makes my installation on EC2 instances easier.

```bash
#!/usr/bin/bash

# Go to /home/ubuntu/ and insall aws cli
cd /home/ubuntu/
CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="Now in home directory"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

# Install aws cli
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="Installed aws cli"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

# install unzip
apt install unzip -y
CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="install unzip"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

# awscliv2.zip is unzipped
unzip awscliv2.zip
CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="awscliv2.zip is unzipped"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

# awscliv2.zip is unzipped
rm awscliv2.zip
CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="awscliv2.zip is unzipped"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

# Initialize Backend
cd /home/ubuntu/aws-bootcamp-cruddur-2023/backend-flask/
apt install python3-pip -y
pip3 install -r requirements.txt
export FRONTEND_URL="*"
export BACKEND_URL="*"
CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="Backend initialized"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

# Initialize Frontend
cd /home/ubuntu/aws-bootcamp-cruddur-2023/frontend-react-js/
export REACT_APP_BACKEND_URL="http://$(curl -s ifconfig.me):4567"
apt update 
apt install npm -y
npm install
CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="installed npm so frontend is initialized"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"

# install docker
cd /home/ubuntu/aws-bootcamp-cruddur-2023/
CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="Installing docker"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"
apt install docker.io

# install docker-compose
CYAN='\033[1;36m'
NO_COLOR='\033[0m'
LABEL="installing docker-compose"
printf "${CYAN}== ${LABEL}${NO_COLOR}\n"
curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

Make your bash script executable with the following command: `chmod u+x ec2.sh` Run it.

### Build Images from Dockerfile

Now that our environment is ideal. We can build images from our Dockerfile.

```bash
# cd into /backend-flask/
cd /home/ubuntu/aws-bootcamp-cruddur-2023/backend-flask/

# run docker build
docker build . –t backend-flask
```

Docker build output:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680127390121/ecde80dc-3375-41ca-b6f6-6d7f15c662e9.png align="center")

```bash
# cd into /backend-flask/
cd /home/ubuntu/aws-bootcamp-cruddur-2023/frontend-react-js/

# run docker build
docker build . –t frontend-react-js
```

Docker build output:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680127846263/a08c8d31-e70e-4413-b704-d61f67d6aae2.png align="center")

### Run Backend and Frontend Containers

```bash
cd /home/ubuntu/aws-bootcamp-cruddur-2023/

# view images
docker images -a

# run backend container
docker run -d -p 4567:4567 -it backend-flask

# run frontend container
docker run -d -p 3000:3000 -it frontend-react-js 
```

Docker run output:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680128491878/65d7e2d1-e5cd-4954-a141-683cd1f0477f.png align="center")

Web browser output:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680129639612/d5095a10-eb09-426e-b8b7-471bc9c1ea6d.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680129648200/b7143e8c-656b-4dd7-aa05-f780e463912a.png align="center")

***NB: Ensure you have this env variable configured on your CLI:***

```bash
export REACT_APP_BACKEND_URL="http://$(curl -s ifconfig.me):4567"
```

### Run docker-compose.yml

We need to stop the 2 running containers because they are using port 3000 and 4567

```bash
# stop both containers
docker stop 438 525

# cd to working dir
cd /home/ubuntu/aws-bootcamp-cruddur-2023/

# run docker compose
docker compose up -d
```

Docker compose up output:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680128745964/d153d5e2-385c-428e-862e-bfda11872a45.png align="center")

Browser output on `http://44.203.194.19:3000(frontend)`:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680129658015/d210de25-c5c3-4f49-bd58-d30bea3e8b01.png align="center")

Browser output on `http://44.203.194.19:4567/api/activities/home(backend)`:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680129690867/d217b23e-d640-4a7f-9c37-6a89f0444102.png align="center")

And that, my friends, is how you deploy docker containers on an EC2 instance.

Some might find it easier to pull the docker images from [dockerhub](https://hub.docker.com/). Don't worry, I got you:

1. [Frontend](https://hub.docker.com/repository/docker/topsideboss2/aws-bootcamp-cruddur-2023-frontend-react-js)
    

1. [Backend](https://hub.docker.com/repository/docker/topsideboss2/aws-bootcamp-cruddur-2023-backend-flask)
    

### [AWS-Cloud-Project-Bootcamp-Viewing-Material](https://www.linuxtek.ca/2023/02/12/aws-cloud-project-bootcamp-week-0-unofficial-homework-guide/)

As promised, here are some quick links to the videos for Week 1:

* YouTube – [Week 1 – Live Streamed Video](https://www.youtube.com/live/zJnNe5Nv4tE?feature=share)
    
* YouTube – [Before You Ask For Help Watch This](https://youtu.be/tDPqmwKMP7Y)
    
* YouTube – [Grading Homework Summary](https://youtu.be/FKAScachFgk)
    
* YouTube – [Week 1 – Create the Notification Feature (Backend and Front)](https://youtu.be/k-_o0cCpksk)
    
* YouTube – [Week 1 – Commit Your Code](https://youtu.be/b-idMgFFcpg)
    
* YouTube – [Week 1 – DynamoDB and Postgres vs Docker](https://youtu.be/CbQNMaa6zTg)
    
* YouTube – [Week 1 – Docker Security Best Practices](https://youtu.be/OjZz4D0B-cA)
    
* YouTube – [Week 1 – App Containerization Pricing Considerations](https://youtu.be/OAMHu1NiYoI)
    
* YouTube – [Free AWS Cloud Project Bootcamp – Update 2023-02-23](https://youtu.be/gQxzMvk6BzM)