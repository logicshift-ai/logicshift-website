---
title: "Launch Odoo 18 Like a Pro with Docker Compose"
slug: launch-odoo-18-like-a-pro-with-docker-compose
meta_title: ""
description: "this is meta description"
date: 2022-04-04T05:00:00Z
image: "/images/post-2.png"
categories: ["Technology", "Data"]
author: "Taral Desai"
tags: ["Odoo Setup", "Docker"]
draft: false
---


Ever wanted to try out **Odoo 18** without diving into dependency hell? You're in the right place. With **Docker Compose**, we’ll spin up a full Odoo environment — clean, fast, and production-ready in minutes.

> ⚡ This guide is for makers, hackers, developers, and small business heroes who just want to get things running — with no fluff.

---

## 🧰 Prerequisites
Before we dive in, make sure you’ve got Docker and Docker Compose installed:

- ✅ [Docker on macOS](#)
- ✅ [Docker on Ubuntu](#)
- ✅ [Docker on Windows](#)

If you’re set, let’s roll!

---

## 📁 Project Structure
Here’s how your setup will look:

```
odoo-docker-setup/
├── docker-compose.yml
├── odoo_pg_pass         # PostgreSQL password (securely stored)
├── config/
│   └── odoo.conf        # Odoo configuration file
└── addons/              # Your custom addons
```

---

## 🧾 `docker-compose.yml`

```yaml
services:
  web:
    image: odoo:18.0
    depends_on:
      - db
    ports:
      - "8069:8069"
    volumes:
      - odoo-web-data:/var/lib/odoo
      - ./config:/etc/odoo
      - ./addons:/mnt/extra-addons
    environment:
      - PASSWORD_FILE=/run/secrets/postgresql_password
    secrets:
      - postgresql_password

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=postgres
      - POSTGRES_PASSWORD_FILE=/run/secrets/postgresql_password
      - POSTGRES_USER=odoo
      - PGDATA=/var/lib/postgresql/data/pgdata
    volumes:
      - odoo-db-data:/var/lib/postgresql/data/pgdata
    secrets:
      - postgresql_password

volumes:
  odoo-web-data:
  odoo-db-data:

secrets:
  postgresql_password:
    file: odoo_pg_pass
```

---

## 🗃️ Odoo Configuration: `odoo.conf`

{{< tabs >}}
{{< tab "Tab 1" >}}

To customize your Odoo instance, create a configuration file at `config/odoo.conf` with the following content:

```ini
[options]
addons_path = /mnt/extra-addons
data_dir = /var/lib/odoo
admin_passwd = admin
```

This tells Odoo where to look for extra modules (`/mnt/extra-addons`), where to store persistent data (`/var/lib/odoo`), and sets the master admin password (`admin`).

Odoo automatically loads `/etc/odoo/odoo.conf` when it starts, and our volume mapping (`./config:/etc/odoo`) ensures this file is picked up.

{{< /tab >}}


{{< tab "Tab 2" >}}


### 🧾 Full Template for `odoo.conf`

Here’s a more complete sample configuration file with optional parameters:

```ini
[options]
addons_path = /mnt/extra-addons
data_dir = /var/lib/odoo
; admin_passwd = admin
; csv_internal_sep = ,
; db_maxconn = 64
; db_name = False
; db_template = template1
; dbfilter = .*
; debug_mode = False
; email_from = False
; limit_memory_hard = 2684354560
; limit_memory_soft = 2147483648
; limit_request = 8192
; limit_time_cpu = 60
; limit_time_real = 120
; list_db = True
; log_db = False
; log_handler = [':INFO']
; log_level = info
; logfile = None
; longpolling_port = 8072
; max_cron_threads = 2
; osv_memory_age_limit = 1.0
; osv_memory_count_limit = False
; smtp_password = False
; smtp_port = 25
; smtp_server = localhost
; smtp_ssl = False
; smtp_user = False
; workers = 0
; xmlrpc = True
; xmlrpc_interface = 
; xmlrpc_port = 8069
; xmlrpcs = True
; xmlrpcs_interface = 
; xmlrpcs_port = 8071
```

Uncomment and adjust the settings you need. This gives you fine-grained control over memory usage, logging, multi-worker setup, email, and more.


{{< /tab >}}
{{< /tabs >}}

---

## 🔐 Secure Your Secrets

Create your secret password file like this:

```bash
echo "supersecurepassword" > odoo_pg_pass
```

Keep this file out of version control (`.gitignore` it!).

---

## 🚀 Launch Time

From your project root, run:

```bash
docker compose up -d
```

📍 Visit [http://localhost:8069](http://localhost:8069) — your Odoo instance is live!

Create a new database, choose a password, and start exploring Odoo’s powerful features.

---

## 🧽 Tidy Up

To stop your environment:

```bash
docker compose down
```

To also remove persistent volumes (⚠️ this deletes your data):

```bash
docker compose down -v
```

---

## 📦 About Volumes

We use Docker volumes to persist important data:

- `odoo-web-data`: stores Odoo's database files, attachments, and session info.
- `odoo-db-data`: stores PostgreSQL data files.

These volumes ensure your data survives container restarts or upgrades.

If you want to back them up, you can use:
```bash
docker run --rm -v odoo-web-data:/data busybox tar czf - /data > odoo-web-data-backup.tar.gz
```

---

## 🔗 Resources

- [Odoo Docker Hub](https://hub.docker.com/_/odoo)
- [Odoo Docs](https://www.odoo.com/documentation/18.0/)

---

## 💡 Pro Tips

- Add custom modules in `addons/`
- You can tweak startup behavior with command overrides
- Use environment files (`.env`) for large configs

---

Give it a spin and unleash the power of Odoo — with zero install pain. 😎

