---
title: "How to Install Docker & Docker Compose on Ubuntu, Windows, and macOS"
meta_title: ""
description: "this is meta description"
date: 2022-04-04T05:00:00Z
image: "/images/image-placeholder.png"
categories: ["Application", "Data"]
author: "Taral Desai"
tags: ["Docker", "Docker Compose"]
draft: false
---

In this guide, we’ll walk you through installing **Docker** and **Docker Compose** on **Ubuntu (Linux)**, **Windows**, and **macOS**. Plus, we’ll clear up a common source of confusion: the difference between `docker-compose` and `docker compose`.


## What’s Docker & Docker Compose?

- **Docker** is a platform to build, ship, and run applications inside containers.
- **Docker Compose** is a tool for defining and running multi-container Docker applications using a YAML file.

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
{{< accordion "Installation on Ubuntu" >}}

### OS requirements

To install Docker Engine, you need the 64-bit version of one of these Ubuntu
versions:

- Ubuntu Oracular 24.10
- Ubuntu Noble 24.04 (LTS)
- Ubuntu Jammy 22.04 (LTS)
- Ubuntu Focal 20.04 (LTS)

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
3. Check the installation.

    ```bash
    docker --version
    docker compose version
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

4. Check the Docker CLI installation.

    ```bash
    docker --version
    docker compose version
    ```

{{< notice "info" >}}
Docker Desktop now includes Docker Compose by default—no need for a separate install!
{{< /notice >}}

{{< /accordion >}}

---