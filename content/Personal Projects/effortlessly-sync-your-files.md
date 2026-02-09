---
title: "Effortlessly Sync Your Files"
subtitle: "A guide to setting up Rsync & Password-less SSH Login"
date: 2023-04-17T16:44:12.057Z
readTime: 4 min
coverImage: https://cdn.hashnode.com/res/hashnode/image/upload/v1681745820181/68873cf0-a3e6-4582-a80d-0a7deeee82a3.jpeg
slug: effortlessly-sync-your-files
---

### What is Rsync?

Rsync stands for 'Remote Sync'. It is a Linux-based tool that can be used to sync files between remote and/or local servers.

This comes in handy when one needs to migrate from one server to another without incurring any additional costs. Rsync can also be used to back-up data on another server. The purpose of creating a mirror of your server with Rsync is, if your main server fails, your backup server can take over to reduce the downtime of your website. This way of creating a backup is very good and effective for small and medium-sized web businesses.

### Using RSYNC

I will be using Ubuntu 20.04 but the instructions should work on any modern Linux distribution.

* Main Server - 192.168.1.9
    
* Backup Server - 192.168.1.5
    

#### Step 1: Install Rsync

Install Rsync on both servers with the following command.

```bash
sudo apt-get install rsync
```

NB: **Ensure you are not the root user for safe practices**.

If you are, kindly use the following command to create another user and a password:

```bash
useradd <username>
passwd <password>
```

#### Step 2: Setup SSH Password-less Login

Using password-less login with SSH Keys will increase the trust between the two Linux servers for easy file synchronization or transfer.

First, generate a public and private key on the 192.168.1.5 server with the following command:

```bash
ssh-keygen -t rsa -b 2048
```

When prompted to enter a passphrase, don't provide one and hit **ENTER** to proceed without one.

Now once the public and private keys have been generated, we will share our public key with the main server (192.168.1.9) so that it can easily recognize the backup server and thus allows us to login without asking for a password while syncing data. Navigate to where the public key is saved, usually the `/root/.ssh/` folder and use this command:

```bash
ssh-copy-id -p 6000 -i ./id_rsa.pub <username>@192.168.1.9
```

By default, the command will use port 22 for SSH. If your SSH port is mapped onto another port use the flag `-p <port-number>`

To specify the public key file, use the `-i <filename>` as shown above

#### Step 3: Synchronize/Transfer the files

The typical rsync format isn't very intimidating when broken down.

```bash
rsync [option] [origin] [destination]
```

Each Rsync command should begin with `rsync`. It is then followed by an option. Below is a list of basic Rsync options to familiarize yourself with.

| Option | Description |
| --- | --- |
| `-a` | copy files recursively and preserve ownership of files when files are copied |
| `-v` | runs the verbose version of the command; all of the processes that are run will be written out for the user to read |
| `-z` | compress the data synced |
| `-h` | initiate rsync help |
| `-e` | tell rsync what shell to use |
| `-exclude="*.fileType"` | exclude all of a specific filetype. Replace filetype with the actual file type that should be excluded |
| `-delete` | delete any extraneous files from the destination directory |

If more than one option with a dash is used, they may be consolidated into one bundle of options that has only one dash i.e `-avzhe`

A few examples of commands you can use for your day-to-day use.

Here is a command you can use on the main server (192.168.1.9) to copy the `/var/www/internmanagementsystem-b-backend/` directory from the main server to the backup server 192.168.1.5 in the `/var/www/ims-backend/`

```bash
rsync -avzhe "ssh -p 10000" /var/www/internmanagementsystem-b-backend <username>@192.168.1.5:/var/www/ims-backend
```

Here is the command you will use on the main server to synchronize all files that end with `*.sql` in the `/var/www/` directory to save them in the 192.168.1.5 backup server in the `/var/www/server9/databases` directory:

```bash
rsync -avzhe "ssh -p 10000" /var/www/*.sql <username>@192.168.1.5:/var/www/server9/databases/
```

### In conclusion

Rsync is an essential tool when it comes to file-level operations. It is a flexible tool that will keep your directories in sync, minimize cost of transferring whole file changes, exclude what you do not want to synchronize and ensure your files are backed up by using these three simple steps.