---
title: "How to Install Docker & Docker Compose on Ubuntu, Windows, and macOS"
meta_title: ""
description: "this is meta description"
date: 2022-04-04T05:00:00Z
image: "/images/post-1.png"
categories: ["Odoo Setup", "Application"]
author: "Taral Desai"
tags: ["Docker", "Docker Compose"]
draft: false
---

In this guide, we’ll walk you through installing **Docker** and **Docker Compose** on **Ubuntu (Linux)**, **Windows**, and **macOS**.

## 🐳 Why Install Docker for Odoo?

Planning to work with Odoo? Whether you're setting it up for development, testing custom modules, or deploying it for production, Docker makes your life a lot easier.

Instead of going through the hassle of installing Odoo, PostgreSQL, and all the required dependencies manually, Docker allows you to launch everything with just one command. You get a fully functional Odoo environment that works consistently across different machines.

With Docker, you package Odoo and all its services into isolated containers that are easy to manage, replicate, and scale.

{{< notice "tip" >}}
If you're installing Docker on your system, this is your first step toward a smoother and faster Odoo setup.
{{< /notice >}}

---

## 📦 What’s Docker Compose?

Docker Compose is a tool for defining and running multi-container Docker applications. Think of it as a YAML-powered orchestration system. Want to spin up Odoo with a PostgreSQL database? Just a few lines of code in docker-compose.yml, and your entire ERP environment is ready to run.

Example `docker-compose.yml`:

```yaml
services:
  web:
    image: odoo:18.0
    depends_on:
      - db
    ports:
      - "8069:8069"
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=postgres
      - POSTGRES_PASSWORD=odoo
      - POSTGRES_USER=odoo

```

{{< notice "tip" >}}
With this setup, running docker compose up will start both Odoo and PostgreSQL, giving you a complete local Odoo instance in seconds.
{{< /notice >}}

## ⚙️ Installation

{{< accordion "Installation on Ubuntu" >}}

### OS requirements

To install Docker Engine, you need the 64-bit version of one of these Ubuntu
versions:

- Ubuntu Oracular 24.10
- Ubuntu Noble 24.04 (LTS)
- Ubuntu Jammy 22.04 (LTS)
- Ubuntu Focal 20.04 (LTS)

---

1. Set up Docker's `apt` repository.

    ```bash
    sudo apt update
    sudo apt install ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings

    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
    sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

    echo \
    "deb [arch=$(dpkg --print-architecture) \
    signed-by=/etc/apt/keyrings/docker.gpg] \
    https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

    sudo apt update
    sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```
2. Install the Docker packages.

    To install the latest version, run:
    ```bash
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```
3. Verify the installation.

    ```bash
    docker --version
    docker compose version
 
    ```
---

### Post-Installation: Run Without `sudo` on Ubuntu

By default, Docker runs as the `root` user and uses a Unix socket that only `root` can access. That’s why you need to use `sudo` with Docker commands.

### The `docker` Group Fix

To run Docker without `sudo`, you can add your user to the `docker` group. This group has access to the Docker socket.

{{< notice "info" >}}
Many Linux systems create the `docker` group when you install Docker.
{{< /notice >}}

### Steps to Enable Docker Without `sudo`

1. **Create the docker group** (if it doesn’t exist):

```bash
sudo groupadd docker
```

2. **Add your user to the group:**

```bash
sudo usermod -aG docker $USER
```

3. **Apply the group change:**

Log out and log back in. This is important!

{{< notice "note" >}}
If you’re using Linux inside a virtual machine, you may need to restart the VM for changes to take effect.
{{< /notice >}}

Alternatively, you can run:

```bash
newgrp docker
```

4. **Test it:**

```bash
docker run hello-world
```

If everything works, you’ll see a welcome message from Docker **without using `sudo`**.

{{< notice "warning" >}}
Anyone in the <code>docker</code> group can control Docker and the system—just like <code>root</code>. This is convenient but comes with risk. Only add users you trust.

If you're concerned, check out <a href="https://docs.docker.com/engine/security/rootless/" target="_blank">Docker Rootless Mode</a>, which lets you run Docker without giving users root-level access.
{{< /notice >}}



### Fix Permission Errors

If you used `sudo` with Docker before, you might see this error:

```
WARNING: Error loading config file: /home/user/.docker/config.json -
stat /home/user/.docker/config.json: permission denied
```

To fix it, reset the ownership of the `.docker` folder:

```bash
sudo chown "$USER":"$USER" /home/"$USER"/.docker -R
sudo chmod g+rwx "$HOME/.docker" -R
```

{{< /accordion >}}

{{< accordion "Installation on Windows" >}}

### Install WSL 2 (If You Haven’t Already)

Docker Desktop uses **WSL 2** as its default backend. If you haven’t installed WSL 2 yet, here’s how to do it:

1. Open **PowerShell as Administrator** and run:

   ```bash
   wsl --install
   ```
2. Reboot/ Restart your computer if prompted.

{{< notice "warning" >}}
If you’re on an older version of Windows, you might need to install WSL manually. See the official guide <a href="https://learn.microsoft.com/en-us/windows/wsl/install" target="_blank">here</a>.
{{< /notice >}}



### Download and Install Docker Desktop

{{< notice "note" >}}
Docker Desktop includes Docker Compose along with Docker Engine and Docker CLI which are Compose prerequisites.
{{< /notice >}}

1. Head over to the [Docker Desktop for Windows page](https://www.docker.com/products/docker-desktop/) and download the installer.

2. Run the installer and follow the prompts:
   - It will ask to install WSL 2 features and integration if not already installed.
   - Check the option to use **WSL 2 as the backend**.

3. After installation, launch Docker Desktop. You may need to sign in or create a Docker Hub account (free).

4. Verify the Docker CLI & Docker Compose installation.

    ```bash
    docker --version
    docker compose version
    ```

{{< notice "info" >}}
Docker Desktop now includes Docker Compose by default—no need for a separate install!
{{< /notice >}}

{{< /accordion >}}

{{< accordion "Installation on MacOS" >}}

### OS requirements

- macOS **Monterey (12.0)** or later
- At least **4 GB RAM**
- **Apple Silicon (M1/M2)** or Intel processor

Docker Desktop supports both architectures.

---

### Download and Install Docker Desktop

1. Visit: [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Click **"Download for Mac (Apple Chip)"** or **"Download for Mac (Intel Chip)"** depending on your Mac.
3. Open the `.dmg` file and drag the Docker icon into the Applications folder.
4. Launch Docker from Applications (you’ll see the little whale icon in your menu bar).
5. Verify the Docker CLI & Docker Compose installation.

    ```bash
    docker --version
    docker compose version
    ```

{{< notice "note" >}}
Docker may ask for system permissions—grant them. It needs privileged access to run virtual machines.
{{< /notice >}}

{{< notice "info" >}}
Docker Desktop now includes Docker Compose by default—no need for a separate install!
{{< /notice >}}

{{< /accordion >}}

## ✅ You’re All Set!

By now, Docker and Docker Compose should be up and running on your system. You’re ready to launch Odoo or any other containerized app with ease.

Test your installation by running:

```bash
docker run hello-world
```

This will pull a test image and confirm everything is working correctly.

## 📝 Conclusion

Docker and Docker Compose simplify application setup, especially for platforms like Odoo that depend on multiple services. With containers, you can replicate environments, test modules, and deploy faster—all without the usual installation headaches.

Now that your system is ready, start exploring Dockerized Odoo, build custom modules, or connect to other services—all in a neat, isolated workspace.

Happy Odooing & Dockering! 🐳