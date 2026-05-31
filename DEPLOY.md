# AW Media — Go-Live Runbook (20i Node.js Cloud Server)

Deploying the Next.js site to the 20i Cloud Server (2 core / 4GB / 80GB, Node 20).
Strategy: **deploy + test on the server's temp URL first, then point the domain.** Zero downtime.

---

## 0. Prereqs (have these ready)
- 20i Cloud Server built ✅ (you've done this)
- GitHub repo: `https://github.com/awmediamarketing44/website.git`
  - It's private — to pull it on the server you need either a **GitHub Personal Access Token**
    (github.com → Settings → Developer settings → Tokens, repo scope) for the HTTPS clone,
    **or** download the repo ZIP (green Code button → Download ZIP) and upload it.
- A **mailbox** for the contact form (e.g. `alex@awmedia.marketing`) + its SMTP password.
- **ActiveCampaign API key — ROTATED** (the one pasted in chat must be regenerated).

---

## 1. Platform Transfer (move the package to the new server)
20i panel → Migrations → Platform Transfer → move `awmedia.marketing` to the new Cloud Server.
(Per 20i: https://my.20i.com/migrations/platform-transfer)

## 2. Get the code onto the server
SSH into the Cloud Server (20i panel gives you SSH details), then:
```bash
cd ~        # or the web root 20i tells you, e.g. /home/sites/...
git clone https://github.com/awmediamarketing44/website.git app
# (paste your GitHub username + Personal Access Token when prompted)
cd app
```
*No git? Upload the ZIP via 20i File Manager, unzip to `app/`, then `cd app`.*

## 3. Install + build
```bash
npm ci
npm run build
```
4GB RAM handles this fine. (If it ever OOMs: `NODE_OPTIONS=--max-old-space-size=3072 npm run build`.)

## 4. Register the Node.js app (20i panel)
Follow https://docs.20i.com/managed-cloud-servers/install-nodejs-cloud-server and set:

| Setting | Value |
|---|---|
| Node.js version | **20** |
| Application root | the `app` folder from step 2 |
| Application startup file | **`server.js`** |
| Application mode | **Production** |
| Start command (if asked) | `npm run start` |

## 5. Environment variables (set in the Node app config — NOT in the repo)
```
NODE_ENV=production

# Contact form (your 20i mailbox)
SMTP_HOST=mail.awmedia.marketing
SMTP_PORT=465
SMTP_USER=alex@awmedia.marketing
SMTP_PASS=<mailbox password>
SMTP_FROM=alex@awmedia.marketing
CONTACT_TO=alex@awmedia.marketing

# ActiveCampaign (use the ROTATED key)
AC_API_URL=https://awmedia46905.api-us1.com
AC_API_KEY=<rotated key>
AC_LIST_ID=<Master Contact List id>
AC_TAG_ID=<new-website tag id>
AC_MARKETING_TAG_ID=<marketing opt-in tag id>
```
> The site goes live fine without these — only the **contact form send + ActiveCampaign** need them.
> Restart the Node app after setting/changing env vars.

## 6. Start + test on the TEMP URL (before touching the domain)
Start the app in the panel. Open the server's temporary URL / IP and check:
- [ ] Homepage loads
- [ ] `/blog` loads, open a migrated post — reads clean
- [ ] `/work` — branding logos fill the cards
- [ ] Old URL redirects, e.g. `/website-mistakes-that-are-costing-fitness-coaches-clients` → `/blog/...` (301)
- [ ] `/freelance-web-designer-sheffield` → `/locations/web-design-sheffield` (301)
- [ ] Contact form sends (only if env vars set) + lands in inbox + appears in ActiveCampaign

## 7. Go live — point the domain
Once the temp URL checks out:
- Map `awmedia.marketing` (+ `www`) to the Node app in the 20i panel.
- **Force HTTPS:** use 20i's **Force HTTPS toggle** — do NOT force HTTPS in .htaccess (causes redirect loops behind 20i's proxy).
- Old WordPress files get replaced; the 301s in the app catch every old URL.

## 8. Post-launch (Part 2)
- Move the two audit tools (currently Railway) onto AW subdomains: `audit.awmedia.marketing`, `social.awmedia.marketing`.
- Update the Free Audit page links to the new subdomains.
- **Cancel Railway.**
- Submit the new sitemap in Google Search Console; export the Pages report so we can extend redirects for any stragglers.

## Rollback
If anything's wrong after pointing the domain, repoint `awmedia.marketing` back to the old platform in the 20i panel — the WordPress site is untouched until you're happy.
