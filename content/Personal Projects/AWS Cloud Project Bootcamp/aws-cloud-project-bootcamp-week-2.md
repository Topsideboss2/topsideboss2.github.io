---
title: AWS Cloud Project Bootcamp - Week 2
subtitle: Week-2 Homework Challenge - Implementing Datadog to Monitor our Docker Containers
date: 2023-04-01T11:54:23.874Z
readTime: 4 min
slug: aws-cloud-project-bootcamp-week-2
tags:
  - aws
  - aws-cloud-project-bootcamp
---

After battling with containerization with docker in week-1, week-2 felt like a breath of fresh air. In hindsight, I feel like it was "The calm before the storm". Because frankly, what was yet to come in week-3 was not a walk in the park.

During week-2, the information given to us was that the fractional CTO had suggested that we implement observability and distributed tracing first. So that as we begin to add cloud services it wouldn't become difficult to pinpoint issues. This would help us keep pace with the development timeline. So with the strong leadership skills of our very own Community Hero ([Andrew Brown](https://twitter.com/andrewbrown?s=21&t=WnYJjlJsJdx-hx6M3qIuKg)) and guest instructor([Jessica Joy Kerr](https://twitter.com/jessitron?s=21&t=6myH7LrrsodBGaBdLwiP7w)), we were able to implement modern observability. This includes and is not limited to:

1. Metrics using [honeycomb](https://www.honeycomb.io)
    
2. Logging using [rollbar](https://rollbar.com)
    
3. Tracing using [AWS X-ray](https://aws.amazon.com/xray/).
    

As usual, you can find the links to the viewing material and learning resources at the end of this article. So from my understanding, there are two types of monitoring. That is:

1. Application Performance Monitoring
    
2. Server/Container Monitoring
    

What we implemented using honeycomb was Application Performance Monitoring(APM). Since we were free to make up our own homework challenges (as long as they are relevant to the week’s focus), I decided to go ahead and implement Datadog to perform container monitoring. Let's get straight into it.

### So, what is Datadog?

![DataDog's Logo is a picture of a dog called “Bits.”](https://www.vectorlogo.zone/logos/datadoghq/datadoghq-ar21.png align="left")

[Datadog](https://www.datadoghq.com/about/leadership/) is an enterprise solution for essential monitoring and security for your cloud applications. With end-to-end traces, metrics, and logs, datadog makes your applications, infrastructure, and third-party services entirely observable.

**NB** - I came to learn that Datadog has a name for the dog on their logo. His name is Bits. Now, don't be fooled by [Bits](https://www.datadoghq.com/about/resources/). He might not look like it but he sure ain't one of those cute little dogs that make you go "Aaaawww! Choo chweet! So cute!". And I'll show you why in just a few.

### Pricing

%[https://twitter.com/muriifx/status/1642095000493211649?s=61&t=WnYJjlJsJdx-hx6M3qIuKg] 

As is with all enterprise solutions, there is a cost. Datadog pricing is broken down into two sections:

1. Pricing for datadog itself.
    
2. Price for where you’re running data.
    

Containers are supported in Pro and Enterprise plans. Depending on your plan, you can monitor 5 or 10 containers free for each host license. The container count is averaged across your entire infrastructure.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680341726059/26f0316d-750b-4581-9bf8-5afe138ce5ed.png align="center")

For my fellow students who are eligible for the [GitHub Student Developer Pack](https://education.github.com/pack), I have good news for you. Datadog is offering a Pro Account, including 10 servers, free for 2 years. [Get access by connecting your GitHub account on Datadog.](http://studentpack.datadoghq.com/)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680342250617/07ce9466-98fc-4dae-b1ca-f39f2051de9f.png align="center")

### Installing Datadog on Docker

After creating your user account. Log into the dashboard and navigate through the left side of the landing page and under **Integrations** hit **Agent** as shown below:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680342853236/839882ce-3fff-448d-9924-abe31a7c49f9.png align="center")

This page will assist us in the installation of Datadog Agent as a Docker container which will be monitoring our host. Lucky for us the Docker integration is enabled by default, as well as autodiscovery in auto config mode.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680343022183/33a669e9-5d69-494f-b5bc-0eec04f51ec4.png align="center")

Proceed to 'Select an API Key'. This will create one if you do not already have it. It is also important to note that this API key is automatically generated. Since we are currently deploying our containers in a [gitpod](https://www.gitpod.io) CDE. We will need to store this API key in our environment variables. Launch your gitpod environment and run the following command in your command line to save the API key.

```bash
# Save as env variable in current session
export DD_API_KEY="**********"

# Save as env variable in future gp sessions
gp env DD_API_KEY="**********"
```

Confirm the env variable is stored:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680344540512/57cac5b3-4428-4aa5-ac98-dd85aac95604.png align="center")

In our `.gitpod.yml` file, add the following block of code to always run the docker container on start-up

```yaml
- name: datadog
    init: |
      gp sync-await aws
      docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_API_KEY="${DD_API_KEY}" -e DD_SITE="us5.datadoghq.com" gcr.io/datadoghq/agent:7
      exit
```

Now that the Datadog agent is deployed, run `docker-compose up` to run all your containers.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680346035069/e78c507c-c72e-4f14-935c-ad906e5e99f4.png align="center")

You can now view the data in the Datadog UI. Log in and navigate through the left side of the page and choose **Dashboard** as shown below:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680345081102/e1fbf87e-51ab-4e2b-ae61-87836eff9fb8.png align="center")

Under Docker-Overview, you can see I have 5 containers running.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680346173769/5014d526-7fc7-4ce4-8893-1a056f8b5b0e.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680346185466/21e2d2e7-6ef4-45a7-87ac-e57e5dc96046.png align="center")

Under Container-Overview:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680346206221/277fb04a-b03d-4a4e-a781-f883de307ab2.png align="center")

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1680346689960/e4e925d1-15e2-442f-a37a-8defce60f96d.png align="center")

Now you can monitor several metrics on each of your containers such as:

1. Memory Usage
    
2. CPU Utilization
    
3. Network Intensity
    
4. I/O Read Operations
    

How simple was that? I hope you can now see how Bits is most definitely one badass doggo.

And with that, you can now be able to comfortably implement container monitoring with Datadog on your cloud web applications.

### [AWS-Cloud-Project-Bootcamp-Viewing-Material](https://www.linuxtek.ca/2023/02/26/aws-cloud-project-bootcamp-week-2-unofficial-homework-guide/)

As promised here are some quick links to the videos for Week 2.

* [YouTube – Free AWS Cloud Project Bootcamp – Update – 2023-02-23](https://youtu.be/gQxzMvk6BzM)
    
* [YouTube – Week 2 – Live Streamed Video –](https://www.youtube.com/live/2GD9xCzRId4?feature=share) [Honeycomb.io](http://Honeycomb.io) [Setup](https://www.youtube.com/live/2GD9xCzRId4?feature=share)
    
* [YouTube – Week 2 – Instrument X-Ray](https://youtu.be/n2DTsuBrD_A)
    
* [YouTube – Week 2 – X-Ray Subsegments Solved](https://youtu.be/4SGTW0Db5y0)
    
* [YouTube – Week 2 – CloudWatch Logs](https://youtu.be/ipdFizZjOF4)
    
* [YouTube – Week 2 – Rollbar](https://youtu.be/xMBDAb5SEU4)
    
* [YouTube – Week 2 – Security Considerations](https://youtu.be/bOf4ITxAcXc)
    
* [YouTube – Week 2 – Spend Considerations](https://www.youtube.com/watch?v=2W3KeqCjtDY)
    
* [YouTube – Week 2 – Github Codespaces Crash Course](https://youtu.be/L9KKBXgKopA)