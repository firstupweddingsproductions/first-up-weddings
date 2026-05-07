# First Up Weddings

Cinematic wedding film & photography brand site, built with Astro + Tailwind. Fully static, deployed on Cloudflare Pages.

## Local development

```bash
npm install
npm run dev      # serves on http://localhost:4322
npm run build    # static output to dist/
npm run preview  # preview the production build locally on http://localhost:4321
```

Node version: 18+ recommended (20+ is fine).

## Deployment on Cloudflare Pages with an external .de registrar

The domain (`firstupweddings.de`) is bought from an external registrar (e.g. INWX, Strato, IONOS, Namecheap), but **DNS is delegated to Cloudflare** so that Cloudflare Pages can serve the site under the apex domain with HTTPS. Hosting stays free on Cloudflare Pages.

### Step 1 — Push to GitHub

1. Create a new GitHub repository (private is fine).
2. Push this `weddings/` folder. If the repo also contains `productions/`, set Cloudflare Pages **Root directory** to `weddings`.
3. Confirm `npm run build` works locally.

### Step 2 — Cloudflare Pages project

1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com).
2. **Workers & Pages → Create → Pages → Connect to Git.**
3. Select the GitHub repo, authorize Cloudflare.
4. Build configuration:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `weddings` (only if monorepo)
   - **Environment variables (Production):** `NODE_VERSION = 20`
5. Save & Deploy. Cloudflare runs `npm install && npm run build` and uploads `dist/`. The site is reachable at `https://<project-name>.pages.dev` within ~1 minute.

### Step 3 — Add the domain to Cloudflare as a site / DNS zone

This step is needed because the registrar is external. It moves DNS management to Cloudflare so the apex domain can be pointed at Cloudflare Pages.

1. In Cloudflare → **Websites → Add a site → enter `firstupweddings.de` → Free plan.**
2. Cloudflare scans existing DNS records (probably empty for a new domain).
3. Cloudflare shows you **two nameservers** like `xena.ns.cloudflare.com` and `walt.ns.cloudflare.com`.

### Step 4 — Change nameservers at the external registrar

1. Log into the .de registrar (where the domain was bought).
2. Find the section for **Nameservers / DNS / Nameserver-Einstellungen**.
3. Replace the registrar's default nameservers with the **two Cloudflare nameservers** from Step 3.
4. Save. Propagation usually takes 5 minutes – 24 hours.
5. Cloudflare will email you when the zone goes active (status: ✅ Active).

### Step 5 — Connect the custom domain to Cloudflare Pages

Once the zone is active in Cloudflare:

1. In Cloudflare Pages → your project → **Custom domains → Set up a custom domain → `firstupweddings.de`.**
2. Cloudflare auto-creates the necessary CNAME / AAAA records inside the zone.
3. Repeat for `www.firstupweddings.de` if you want both apex and www. (Recommend: redirect www → apex.)
4. HTTPS is provisioned automatically. No extra setup.

### Step 6 — Verify

- Visit `https://firstupweddings.de` — should serve the live site.
- Test the contact form on `/kontakt` — submit one message and confirm it arrives at `firstupweddings@gmail.com`.
- Test on a phone (mobile autoplay, layout).

After every push to `main`, Cloudflare auto-rebuilds. Branch pushes get preview deployments at `<branch>.<project>.pages.dev`.

### Asset size limits

Cloudflare Pages enforces **25 MiB per file**. Current videos:
- `public/filmstil.mp4` — 18.1 MB ✅
- `public/einblick.mp4` — 1.97 MB ✅

## Video export — recommended settings

For autoplay/background loops on the web:

- **Resolution:** 1080p max (1920×1080).
- **Codec:** H.264 (`libx264`), pixel format `yuv420p` (universal browser support).
- **Bitrate:** ~3–6 Mbit/s for 1080p loops. CRF 23–26 with `-preset slow` is a good balance.
- **Audio:** drop the audio track (`-an`) — hero videos are always `muted`.
- **Faststart:** add `-movflags +faststart` so playback starts before the file is fully loaded.
- **Length:** 10–30 s loop with start/end frames that match closely.
- **Target file size:** 5–20 MB for hero loops.

**Example ffmpeg command:**
```bash
ffmpeg -i source.mp4 \
  -t 16 \
  -c:v libx264 -crf 25 -preset slow \
  -pix_fmt yuv420p \
  -an \
  -movflags +faststart \
  -vf "scale=1920:-2" \
  output.mp4
```

For each video, also extract a poster image:
```bash
ffmpeg -ss 1 -i video.mp4 -frames:v 1 -q:v 4 video-poster.jpg
```

The `<video>` tags in the project already use `poster="..."` and `preload="metadata"`.

## Contact form (Web3Forms)

The form on `/kontakt` uses [Web3Forms](https://web3forms.com) — no backend needed. The access key for `firstupweddings@gmail.com` is already wired into `src/pages/kontakt.astro`. Inbound messages arrive at the inbox on submit.

The form includes:
- name, email, optional phone, wedding date, location, message
- hidden honeypot field (`botcheck`) for spam protection
- inline success / error feedback, no redirect
- short privacy note linking to `/datenschutz`

If the access key ever needs to be rotated:
1. Log in at [web3forms.com](https://web3forms.com).
2. Generate a new key.
3. Replace the value of the `access_key` hidden input in `src/pages/kontakt.astro`.
4. Commit & push — Cloudflare rebuilds automatically.

## Legal pages

`/impressum` and `/datenschutz` exist as **placeholders with bracket markers** like `[Straße und Hausnummer]`. They are written for a natural person (Adem Kocyigit), **not** for a registered company. Before going live:

- Replace every `[Straße und Hausnummer]`, `[PLZ Ort]`, `[Monat Jahr]` with real values.
- Decide whether to publish the phone number publicly.
- Decide whether the **Umsatzsteuer** section in the Impressum applies. If you are not (yet) a registered business, remove it; if you operate under § 19 UStG (Kleinunternehmer), add a note.
- Once registered, add Gewerbeanmeldung / VAT details to the Impressum.
- Have a lawyer or service like [eRecht24](https://www.e-recht24.de) review both pages.

The current text is a placeholder, **not legally final**.

## Project structure

```
weddings/
├── public/                 # static assets served as-is
│   ├── *.jpg, *.png, *.mp4
│   ├── favicon.svg
│   └── logo.png
├── src/
│   ├── components/         # Header, Footer
│   ├── layouts/            # Layout.astro (head, OG tags, fonts)
│   ├── pages/              # one .astro file per route
│   └── styles/             # global.css (Tailwind + custom utilities)
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Manual to-dos before launch

See `LAUNCH-CHECKLIST.md`.
