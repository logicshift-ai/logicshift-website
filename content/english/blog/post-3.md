---
title: "Run Odoo Using Docker – A Beginner-Friendly Guide"
meta_title: ""
description: "this is meta description"
date: 2022-04-04T05:00:00Z
image: "/images/post-3.png"
categories: ["Odoo Setup", "Docker"]
author: "Taral Desai"
tags: ["Odoo Setup", "Docker"]
draft: false
---

Curious about running your own Odoo server, but not ready to dive into Docker Compose or full production setups? This guide walks you through launching Odoo using simple Docker commands — step by step — with clear explanations so even first-timers can follow along.

---

## 🧱 Step 0: What You Need First

Before we start, make sure you have Docker installed. Docker lets you run apps like Odoo in a contained, isolated environment without messing up your main system.

- 🔗 [How to install Docker on macOS, Ubuntu, or Windows](#)
- 🧠 No need to install PostgreSQL or Python — Docker handles it all inside the containers.

---

## 🔧 Step 1: Start the Database (PostgreSQL)

Odoo needs a place to store your data — customer info, sales, settings, etc. That’s where PostgreSQL comes in. We’ll run it inside its own container:

```bash
docker run -d \
  -e POSTGRES_USER=odoo \
  -e POSTGRES_PASSWORD=odoo \
  -e POSTGRES_DB=postgres \
  --name db postgres:15
```

✅ We’re setting a username (`odoo`) and password (`odoo`) so that Odoo can log into this database later.

---

## 🚀 Step 2: Start the Odoo App

Now we launch Odoo, tell it where to find the database, and expose it on port 8069 (the default Odoo web UI port). Here's what each part of the command does:

```bash
docker run \
  -p 8069:8069 \        # Maps your local port 8069 to the container's port 8069 (Odoo's default web port)
  --name odoo \           # Names this container 'odoo' so you can easily refer to it later
  --link db:db \          # Links this container to the one named 'db' and gives it the alias 'db'
  -t odoo                 # Uses the official Odoo image and allocates a terminal for logs/output
```

🔗 `--link db:db` tells Docker: “this Odoo container can access the database container using the name `db`.”

👉 Think of it like saying: *"Make the database container visible inside the Odoo container as the name `db`."* This is important because Odoo tries to connect to the database using the hostname `db` by default.

🌐 Now visit [http://localhost:8069](http://localhost:8069) and you’ll see the Odoo setup screen!

---

## 🧩 Helpful Tips to Avoid Surprises

These tips are important to avoid common mistakes and data loss:

### 🔄 Stopping and Restarting
Need to shut down Odoo or PostgreSQL?

```bash
docker stop odoo
docker start -a odoo
```

If you restart the database, always restart Odoo right after:
```bash
docker restart db
docker restart odoo
```

📌 Why? Docker's internal linking breaks when the database restarts, and Odoo won't reconnect automatically.

### 💾 Don’t Lose Your Data – Use Volumes
By default, all data is stored *inside* the container. If you delete it — poof, it’s gone. Named volumes keep your data safe.

#### Safe Odoo Data
```bash
docker run -v odoo-data:/var/lib/odoo \
  -d -p 8069:8069 \
  --name odoo \
  --link db:db \
  -t odoo
```

#### Safe PostgreSQL Data
```bash
docker run -v odoo-db:/var/lib/postgresql/data \
  -d \
  -e POSTGRES_USER=odoo \
  -e POSTGRES_PASSWORD=odoo \
  -e POSTGRES_DB=postgres \
  --name db postgres:15
```

🧠 Volumes store your data *outside* the container so you can delete the container and not lose anything.

### ⚙️ Customizing Odoo with a Config File
Want to control how Odoo runs (like its data folder, logging, etc)? Use a config file like this:

```bash
docker run -v /path/to/config:/etc/odoo \
  -p 8069:8069 \
  --name odoo \
  --link db:db \
  -t odoo
```

Or pass settings directly inline:
```bash
docker run -p 8069:8069 \
  --name odoo \
  --link db:db \
  -t odoo -- --db-filter=odoo_db_.*
```

### 🧩 Installing Custom Addons
Got your own modules? Just mount your `addons` folder:
```bash
docker run -v /path/to/addons:/mnt/extra-addons \
  -p 8069:8069 \
  --name odoo \
  --link db:db \
  -t odoo
```

Yes, this even works for **Odoo Enterprise** if you’ve got the right licenses and files!

---

## 🧪 Running Multiple Odoo Instances

Want to test different Odoo setups at once? You can run multiple containers — just change the port:

```bash
docker run -p 8070:8069 --name odoo2 --link db:db -t odoo
docker run -p 8071:8069 --name odoo3 --link db:db -t odoo
```

🧠 Odoo uses `web.base.url` to generate links in emails and reports. If you’re using ports like 8070 or 8071, go into:
**Settings → Parameters → System Parameters**
and update:
```
web.base.url = http://localhost:8070
```
Otherwise, your links may not work correctly.

---

## 🌍 Environment Variables – What They Mean

Environment variables are like quick settings you pass when starting a container. They tell Odoo how to connect to the database:

| Variable   | What It Does                                                  | Default |
|------------|---------------------------------------------------------------|---------|
| `HOST`     | The address of your PostgreSQL server (usually just `db`)     | `db`    |
| `PORT`     | The port PostgreSQL listens on                                | `5432`  |
| `USER`     | The database username Odoo should use                         | `odoo`  |
| `PASSWORD` | The password for that user (should match the DB container)    | `odoo`  |

👍 These help you connect Odoo to any database setup without editing files.

🔍 But why does just using `db` work — and what kind of network is this?

When you use `--link db:db` in the `docker run` command, Docker sets up a special internal network between containers — by default, it's called the **bridge network**. It gives your Odoo container an entry in its internal DNS system, so that `db` points to the actual IP address of the database container inside that bridge network.

In simple terms: Docker is acting like a helpful traffic guide — when Odoo asks "Where’s `db`?", Docker replies with "Right here at this internal IP address."

➡️ That’s why the `HOST` in your environment or config must be exactly `db` — it’s the alias that works in this bridge network thanks to the `--link` option.

🧠 If you're not using `--link` and instead use modern Docker networking (like with `docker network create`), containers on the same user-defined bridge network can still reach each other using their container names — even without `--link`. But for this guide, we stick with `--link` to keep things simple for beginners.


