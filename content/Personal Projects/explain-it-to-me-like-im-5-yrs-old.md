---
title: "Explain it to me like I'm 5 yrs old..."
subtitle: "What happens when you type google.com in your browser and press Enter?"
date: 2023-04-13T22:53:22.192Z
readTime: 7 min
coverImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1681426581312/56c5de3c-565a-4da0-ba90-986081b413d4.jpeg
slug: explain-it-to-me-like-im-5-yrs-old
---

### Introduction

In the first article of this series, we take a look at DNS. Specifically the question "**What happens when you type** [**google.com**](http://google.com) **in your browser and press Enter?".**

This question is a classic and still a widely used interview question for many types of software engineering positions. It is used to assess a candidate’s general knowledge of how the web stack works on top of the internet. One important guideline to begin answering this question is that you should ask your interviewer whether they would like you to focus on one specific area of the workflow. For a front-end position, they may want you to talk at length about how the DOM is rendering. For an SRE position, they may want you to go into the load-balancing mechanism. I am going to explain it to the best of my ability, so that regardless of your tech background, you can still be able to understand. That's what this series is all about, isn't it? So, with that being said, let's get straight into it.

### Terminologies

A brief summary of terminologies used in this article and what they mean:

#### DNS(Domain Name System)

DNS in simple terms is the technology that translates human-adapted, text-based domain names (google.com) to machine-adapted, numerical-based IP addresses (192.168.1.9).

#### TCP/IP(Transmission Contol Protocol/Internet Protocol)

TCP/IP is like a set of rules that helps computers talk to each other on the internet. It helps computers break up messages into small pieces called packets and sends them across the internet to another computer. Then the other computer puts all the packets back together to get the message. Similar to sending a puzzle in pictures and the other person putting it back together to see the whole picture.

#### Firewall

I like to think of a firewall as a security guard for your computer. The firewall checks everything that tries to come in or out of your computer and only lets the good things through while blocking the bad things.

#### HTTPS/SSL

HTTP (Hyper Text Transfer Protocol) is a protocol over which data is sent between your browser and the website that you are connected to. The 'S' at the end of HTTPS stands for secure, this means that all the communication between your browser and the website is encrypted.

#### Load-balancer

A load-balancer distributes the workload of your system to multiple individual systems, or a group of systems to reduce the amount of load on an individual system. This increases the reliability, efficiency and availability of your enterprise application or website.

#### Web Server

A web server is a software program that serves web pages and other web-related content to clients over the internet.

#### Application Server

An application server is a software platform that provides an environment to run and manage business applications and services.

#### Database

A database is a structured collection of data.

### Step 1: DNS Request

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1681422741259/b008344c-cc3e-4028-bcb7-0116f68a2bb2.png align="center")

Your computer first needs to translate the domain name "[google.com](http://google.com)" into an IP address that the browser can use to communicate with the server. This is done through a process called Domain Name System (DNS) resolution. If the domain name is not cached in the browser, the browser sends a DNS request to a local DNS resolver, which then starts to look up the IP address of the server that hosts [google.com](http://google.com). If the resolver doesn't have the IP address cached, it will forward the request to the root server.

<details data-node-type="hn-details-summary"><summary>How many root servers are there in the world?</summary><div data-type="detailsContent">There are only 13 root servers in the world. These servers are critical components of the Domain Name System (DNS) infrastructure and are responsible for providing the authoritative responses to DNS queries for the top-level domains. These root servers are distributed across multiple locations around the world to ensure redundancy and reliability.</div></details>

If the root server doesn't have the IP address cached, it will forward the request to the TLD server(Top Level Domain Server). If the TLD server doesn't have the IP address cached, it will forward the request to the authoritative server responsible for [google.com](http://google.com). The authoritative nameserver looks up the corresponding IP address of the domain name, it will then send the IP address of the server hosting the website to the DNS resolver. Finally, the DNS resolver responds to the web browser with the IP address of the requested domain.

### Step 2: TCP/IP

Once the browser has obtained the IP address of the server, it establishes a Transmission Control Protocol (TCP) connection with the server using the Internet Protocol (IP). TCP is a protocol that ensures the reliable transmission of data between the client and the server. This involves a three-way handshake between the client and the server, where they exchange packets to establish and confirm the connection.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1681424258764/632937af-51c3-44e7-9284-1d70b0d445d8.png align="center")

### Step 3: Firewall

Before the TCP connection is established, it is possible that a firewall may intercept the connection request to ensure it is authorized to connect. If the firewall allows the request to proceed, then the client can establish a TCP connection with the server. Firewalls are important because they help protect web servers and applications from unauthorized access, attacks, and data breaches.

### Step 4: HTTPS/SSL

The next step is to establish a secure connection using the Hypertext Transfer Protocol Secure (HTTPS) protocol. This encryption ensures that the data being transmitted cannot be intercepted or tampered with by third parties.

### Step 5: Load-Balancer

In the case of a high-traffic website like Google, the incoming requests may be distributed across multiple servers using a load-balancer. This ensures that the traffic is evenly distributed across the servers, preventing any one server from being overwhelmed with requests. A load balancer can also help to improve the website's reliability and availability, as it can route traffic to healthy servers and detect and route traffic away from any failure or degraded servers.

### Step 6: Web Server

The next step involves the client sending an HTTP request to the server asking for the web page to be served. The server, in this case, Google's web server, receives the request and processes it. It then retrieves the requested web page and sends it back to the client as an HTTP response.

### Step 7: Application Server

If the requested web page requires dynamic content, such as personalized information or user authentication, the web server may send the request to an application server. The application server processes the request, retrieves data from a database, and generates a response that the web server can send back to the client.

### Step 8: Database

If the requested web page requires data that is stored in a database, the application server retrieves the necessary data from the database and generates a response that the web server can send back to the client. Databases can be used to store a wide range of data, including user account information, search results, and other types of data that can be accessed through the website.

### Conclusion

In summary, when you type "[google.com](http://google.com)" in your browser and press Enter, your browser sends a DNS request to translate the domain name into an IP address. Once the IP address is obtained, the browser establishes a TCP connection with the server using the IP protocol. The server then establishes a secure connection using HTTPS/SSL, and any incoming traffic may be routed through a load balancer to distribute the load across multiple servers. The web server processes the HTTP request and may send it to an application server or database to generate a response. Finally, the web server sends the response back to the browser and voilà! The client now has a Google web page on his/her browser and can continue to browse comfortably.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1681425277323/e07a6dff-684e-45d9-b81f-c756bbbc3592.png align="center")

In most cases, the DNS resolution process is completed within a few hundred milliseconds but might take upto several seconds depending on various factors such as network latency, DNS caching, and the performance of the DNS resolver and authoritative nameserver. I hope this helped you learn a lot more about DNS and it made you appreciate the internet and its underlying infrastructure.