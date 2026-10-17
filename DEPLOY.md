# Putting amcoconsultants.tech live

The website is plain files (`npm run build` → `out/`). It goes on the **same
server as the ERP** (`72.60.194.207`), served by the nginx that already runs
there. No Node process runs for it, no database, no `.env`.

```
GitHub repo  ──git pull──▶  /srv/amco-website  ──npm run build──▶  out/  ──copy──▶  live/  ◀── nginx
```

Do the parts in order. Parts 1 and 2 are on your PC and in Hostinger; 3 to 6 are
on the server, over SSH.

---

## Part 1 — Put the code on GitHub (your PC)

1. On github.com, top-right **+** → **New repository**.
   - Name: `amco-consultants-website`
   - **Private**
   - Do **not** tick "Add a README", ".gitignore" or "license" — it must be empty.
   - **Create repository**.
2. In a terminal on your PC:

   ```
   cd D:\Projects\AMCO-Consultants-Website
   git init
   git add .
   git commit -m "AMCO Consultants website"
   git branch -M main
   git remote add origin https://github.com/harisamjad1810/amco-consultants-website.git
   git push -u origin main
   ```

   Refresh the GitHub page — you should see `src/`, `public/`, `deploy/`,
   `README.md`. You should **not** see `node_modules/`, `.next/` or `out/`
   (`.gitignore` keeps them out).

---

## Part 2 — Point the domain at the server (Hostinger)

1. hPanel → **Domains** → `amcoconsultants.tech` → **DNS / Nameservers**.
2. On the **Nameservers** tab, it should say Hostinger's nameservers
   (`ns1.dns-parking.com`, `ns2.dns-parking.com`). If it shows something
   else, the records below must be made wherever those nameservers are.
3. On the **DNS records** tab:
   - **Delete** any existing record named `@` of type **A** or **AAAA**, and
     any `www` record (these are Hostinger's parking page).
   - **Add**: Type `A`, Name `@`, Points to `72.60.194.207`, TTL `3600`.
   - **Add**: Type `A`, Name `www`, Points to `72.60.194.207`, TTL `3600`.
4. Wait 10–30 minutes (sometimes longer), then on your PC:

   ```
   nslookup amcoconsultants.tech
   nslookup www.amcoconsultants.tech
   ```

   Both must answer `72.60.194.207`. **Do not do Part 5 until they do** —
   the HTTPS certificate cannot be issued before.

---

## Part 3 — Get the code onto the server

SSH in the same way you do for the ERP:

```
ssh amco@72.60.194.207
```

**3.1 Check the tools.** Node must be 20.9 or newer:

```
node -v
git --version
rsync --version | head -1     # if missing:  sudo apt -y install rsync
```

**3.2 Give the server read access to the private repo** (a "deploy key"
that can only read this one repository):

```
ssh-keygen -t ed25519 -f ~/.ssh/amco_website -N "" -C "amco-website deploy"
cat ~/.ssh/amco_website.pub
```

Copy the line that `cat` prints. On GitHub, open the repo → **Settings** →
**Deploy keys** → **Add deploy key** → Title `server`, paste the key, leave
"Allow write access" **unticked** → **Add key**.

Back on the server, tell SSH to use that key for this repo:

```
cat >> ~/.ssh/config <<'EOF'

Host github-website
  HostName github.com
  User git
  IdentityFile ~/.ssh/amco_website
  IdentitiesOnly yes
EOF
chmod 600 ~/.ssh/config
ssh -T github-website
```

The last command must say *"Hi harisamjad1810/amco-consultants-website! You've
successfully authenticated…"* (answer `yes` if it asks about the host).

**3.3 Clone and build:**

```
sudo mkdir -p /srv/amco-website
sudo chown amco:amco /srv/amco-website
git clone git@github-website:harisamjad1810/amco-consultants-website.git /srv/amco-website
bash /srv/amco-website/deploy/deploy.sh
```

The script pulls, installs, builds (about a minute) and copies the site into
`/srv/amco-website/live`. At the end it prints four addresses with `000` —
that is expected now, because nginx does not know the site yet.

```
ls /srv/amco-website/live        # index.html  explore  demo  ur  _next  404.html …
```

---

## Part 4 — Tell nginx about the site

```
sudo cp /srv/amco-website/deploy/amcoconsultants.conf /etc/nginx/sites-available/amcoconsultants
sudo ln -s /etc/nginx/sites-available/amcoconsultants /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

`nginx -t` must say *"syntax is ok"* and *"test is successful"*. If it
complains about `amco-security.conf`, the ERP's snippet is missing:
`sudo cp /srv/amco-erp/deploy/nginx/amco-security.conf /etc/nginx/snippets/`.

Check it answers (still plain http):

```
curl -s -o /dev/null -w '%{http_code}\n' -H 'Host: amcoconsultants.tech' http://127.0.0.1/
curl -s -o /dev/null -w '%{http_code}\n' -H 'Host: amcoconsultants.tech' http://127.0.0.1/explore/
```

Both must print `200`. The ERP is not touched: it has its own file and its own
`server_name`.

---

## Part 5 — HTTPS

```
sudo certbot --nginx -d amcoconsultants.tech -d www.amcoconsultants.tech
```

If it asks whether to redirect HTTP to HTTPS, choose **redirect**. certbot adds
the certificate to the site file and renews it automatically (the same timer
already renews the ERP's).

Now open **https://amcoconsultants.tech** in a browser. Check:

- `/` — the home page (English)
- `/explore/` — AMCO ERP in detail
- `/demo/` — the demo form
- `/ur/` — Urdu; the EN | اردو pill switches and keeps you on the same page
- the navbar's **Our team** jumps to the team section

---

## Part 6 — Make sure the demo form reaches the ERP

The form posts to `https://amcoerp.com/api/public/demo-request`. That endpoint
arrived with the ERP commit *"Added Public demo API"* (`72fbaae`) and its
migration `…025400-create-demo-requests`. **Production must be running that
version.** Check from the server:

```
curl -s -o /dev/null -w '%{http_code}\n' -X OPTIONS \
  -H 'Origin: https://amcoconsultants.tech' \
  -H 'Access-Control-Request-Method: POST' \
  https://amcoerp.com/api/public/demo-request
```

- `204` → ready. Send a test request from https://amcoconsultants.tech/demo/
  and look for it in **ERP › Super Admin › Demo Requests**.
- `404` → production has not got that release yet. Deploy the ERP first, the
  usual way (`/srv/amco-erp/deploy/deploy.sh production`, after the usual
  backup); its migration creates the table. No `.env` change is needed:
  `PUBLIC_FORM_ORIGINS` already allows `amcoconsultants.tech` and `www`.

---

## Every later update

On your PC:

```
cd D:\Projects\AMCO-Consultants-Website
npm run build                    # optional: make sure it builds before pushing
git add .
git commit -m "What changed"
git push
```

On the server:

```
ssh amco@72.60.194.207
bash /srv/amco-website/deploy/deploy.sh
```

The site keeps working while it builds. The script prints the four addresses
with `200` when it is done. If a page still looks old, do a hard refresh
(Ctrl+F5).

---

## If something goes wrong

| What you see | Why, and what to do |
|---|---|
| certbot: *"Timeout during connect"* or *"NXDOMAIN"* | DNS is not pointing at the server yet. Re-check Part 2 with `nslookup`, wait, try again |
| Browser shows Hostinger's parking page | An old `@`/`www` record is still in hPanel, or DNS has not updated yet |
| `403 Forbidden` | nginx cannot read the folder: `sudo chmod 755 /srv/amco-website /srv/amco-website/live` |
| `404` for every page | `live/` is empty — run `bash /srv/amco-website/deploy/deploy.sh` again and read its output |
| `git pull` fails with *"Permission denied (publickey)"* | The deploy key is missing or the clone used `github.com` instead of `github-website`: `git -C /srv/amco-website remote -v` |
| The demo form says it could not send | Part 6 — the ERP endpoint is not live, or the browser console shows a CORS error naming the origin |
