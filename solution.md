# SOLUTION — Get freedommedtechmanagement.com live again (guaranteed) + never lose DNS control again

---

## Part 0 — Why the site went down (so you can explain it in one sentence)

The site was hosted on **GitHub Pages, tied to a GitHub repo**. When that repo went private, GitHub's free plan stopped serving it — and GitHub still holds the domain hostage in a dead state, so it can't be re-attached to any new GitHub setup either. The domain has been returning a 404 ever since.

**The fix is to point the domain at Vercel instead.** Vercel is already 100% set up, already serving the site from a private repo, and never cares about repo visibility. The only thing left is two DNS record changes. Once done, this class of failure is impossible — hosting is fully decoupled from GitHub.

---

## Part 1 — THE FIX: 5 minutes on the Zoom call (client drives, you guide)

> ⚠️ **This client is NOT on GoDaddy.** The domain's registrar is **Squarespace Domains** (verified via whois — it migrated there from Google Domains). All steps below are Squarespace.

### Step 1 — Client logs into Squarespace Domains
- Link to send them: **https://account.squarespace.com/domains**
- Since the domain came from Google Domains, they most likely log in with **"Continue with Google"** using the same Google account that originally owned the domain.
- Can't remember which account? Have them search their email for **"Google Domains is now Squarespace"** — that email went to the owning address.

### Step 2 — Open the domain's DNS settings
1. On the domains dashboard, click **freedommedtechmanagement.com**
2. In the left menu, click **DNS** (or **DNS Settings**)
- Squarespace help doc if you get lost: **https://support.squarespace.com/hc/en-us/articles/213469948** (Accessing your DNS settings)

### Step 3 — Change exactly two things in "Custom Records"

**A. Delete the four old A records** (they point to the dead GitHub host):

| Type | Host | Value — DELETE all four |
|------|------|------------------------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**B. Add / edit these two records:**

| Type | Host | Value — SET TO | Priority/TTL |
|------|------|----------------|--------------|
| A | @ | `76.76.21.21` | leave default |
| CNAME | www | `cname.vercel-dns.com` | leave default |

(The `www` CNAME currently says `johnstudioraine.github.io` — edit it to `cname.vercel-dns.com`.)

- Squarespace help doc for editing records: **https://support.squarespace.com/hc/en-us/articles/360002101888** (Adding custom DNS records)

> **Fallback:** if Squarespace's DNS page says the domain uses *external* nameservers and won't let you edit records, the zone lives in **Google Cloud DNS** instead — log into **https://console.cloud.google.com/net-services/dns** with the same Google account and edit the same two records there.

### Step 4 — Save, then verify live on the call
- Propagation is typically **1–15 minutes**. Vercel issues the SSL certificate automatically — nothing to click.
- Verify in the browser: **https://freedommedtechmanagement.com** → the site loads.
- Or tell Claude **"DNS is flipped"** and I'll verify from the terminal and confirm end-to-end.

### Why this is guaranteed
- The Vercel project already has both `freedommedtechmanagement.com` and `www.freedommedtechmanagement.com` attached and verified — it is literally waiting for traffic.
- The exact same site is already confirmed serving at **https://freedommedtechmanagementcom.vercel.app** (test it right now, before the call).
- Every future update: push to the private GitHub repo → auto-deploys. Repo visibility, GitHub plans, client accounts — none of it can take the site down again.

### Step 5 — While he's still logged in (2 extra minutes): grab permanent access
Have the client invite you as a **contributor** on the Squarespace account so you never need him on a call again:
1. In Squarespace: **Settings → Permissions → Invite Contributor** (grant Domain Manager / Admin)
2. Invite: **johnraine@studioraine.art**
- Help doc: **https://support.squarespace.com/hc/en-us/articles/206537287** (Inviting people to your account)

---

## Part 2 — NEVER AGAIN: standing control over every client's DNS

The permanent fix for all clients (GoDaddy, Squarespace, Namecheap, whatever): **move DNS management — not ownership — into a Cloudflare account YOU control.** The client keeps the domain registration and keeps paying for it; you get a single dashboard where you can edit any client's DNS instantly, forever, without a Zoom call.

### One-time setup (you, 5 minutes, free)
1. Create your Cloudflare account: **https://dash.cloudflare.com/sign-up**
2. Click **Add a site** → enter the client's domain → pick the **Free** plan
3. Cloudflare auto-imports their existing DNS records (double-check the list matches)
4. Cloudflare shows you **two nameservers** (e.g. `ada.ns.cloudflare.com` / `bob.ns.cloudflare.com`)

### Per-client (one short call, once, ever)
Client changes their domain's **nameservers** to your two Cloudflare nameservers at their registrar:
- **GoDaddy:** https://www.godaddy.com/help/change-nameservers-for-my-domains-664
- **Squarespace:** https://support.squarespace.com/hc/en-us/articles/4404183898125 (Using custom nameservers)
- **Namecheap:** https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-to-change-dns-for-a-domain/

After that: every DNS change for that client is yours to make in seconds at **https://dash.cloudflare.com** — plus you get free SSL, CDN, and analytics on their domain as a bonus you can sell.

### Lighter alternative (if a client won't change nameservers)
Get **delegate/contributor access** to their registrar account instead:
- **GoDaddy Delegate Access** (they invite you, you get your own login — no password sharing): https://www.godaddy.com/help/invite-a-delegate-to-access-my-godaddy-account-12376
- **Squarespace contributor invite:** https://support.squarespace.com/hc/en-us/articles/206537287

### New-client delivery SOP (add to every handoff checklist)
1. ☐ DNS access secured (Cloudflare migration or delegate access) **before** final handoff
2. ☐ Site hosted on Vercel from a **private** repo under `johnstudioraine` — never on a client's personal GitHub/hosting account
3. ☐ Verify the site serves from the production domain **and** the `*.vercel.app` fallback URL
4. ☐ Client pays for their own domain registration (ownership stays theirs — liability stays theirs)

---

## Current state cheat sheet (as of 2026-07-13)

| Thing | Status |
|---|---|
| Source code | `github.com/johnstudioraine/freedommedtech-client-delivery` — **PRIVATE** ✅ |
| Vercel hosting | Live, auto-deploys from private repo ✅ — https://freedommedtechmanagementcom.vercel.app |
| Backup host (GitHub Pages mirror, output only) | Live ✅ — https://johnstudioraine.github.io/freedommedtechmanagement-site/ |
| freedommedtechmanagement.com | ❌ 404 — waiting on the two DNS records above |
| DNS registrar | Squarespace Domains (client's account) |
