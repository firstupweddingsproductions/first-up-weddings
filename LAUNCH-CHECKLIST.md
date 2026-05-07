# Launch Checklist — First Up Weddings

Step-by-step list of everything that still needs to happen between "code is ready" and "live with custom domain". Tick off as you go.

## 1. Code & repo

- [x] `npm run build` succeeds locally.
- [x] Web3Forms access key wired in (`d6563e44-690a-485c-a92e-9bf1721c261b`).
- [x] `filmstil.mp4` compressed to 18 MB (under Cloudflare's 25 MiB per-asset limit).
- [x] `einblick.mp4` already small (1.97 MB).
- [x] `/impressum` and `/datenschutz` exist as placeholder routes.
- [x] Footer links to `/impressum` and `/datenschutz`.
- [x] Layout has Open Graph + Twitter Card + canonical.
- [x] Git repo initialized with first commit.
- [ ] Create a GitHub repo and push (commands below).

## 2. GitHub

After creating an empty GitHub repo (private is fine):

```bash
git remote add origin git@github.com:<your-user>/<your-repo>.git
git branch -M main
git push -u origin main
```

(Or use HTTPS:  `https://github.com/<user>/<repo>.git`)

## 3. Cloudflare Pages

- [ ] Sign in at [dash.cloudflare.com](https://dash.cloudflare.com).
- [ ] **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
- [ ] Build settings:
  - Framework preset: **Astro**
  - Build command: `npm run build`
  - Output directory: `dist`
  - Root directory: `weddings` (only if monorepo)
  - Environment variable: `NODE_VERSION = 20`
- [ ] Save & Deploy. Wait ~1 min. Open the `*.pages.dev` URL — site should appear.

## 4. .de Domain (external registrar)

- [ ] Buy `firstupweddings.de` at INWX, Strato, IONOS, Namecheap, Hetzner, etc.
- [ ] In Cloudflare → **Websites → Add a site → `firstupweddings.de` → Free plan**.
- [ ] Cloudflare gives you **two nameservers** (e.g. `xena.ns.cloudflare.com`, `walt.ns.cloudflare.com`).
- [ ] In the registrar's control panel: find **Nameservers** and replace the registrar's defaults with the two Cloudflare nameservers.
- [ ] Wait for propagation (5 min – 24 h). Cloudflare emails you when the zone is **Active**.

## 5. Connect custom domain to Cloudflare Pages

Once the Cloudflare zone is active:

- [ ] In Cloudflare Pages → your project → **Custom domains → Set up a custom domain → `firstupweddings.de`**.
- [ ] Cloudflare auto-creates the DNS records.
- [ ] Optionally also add `www.firstupweddings.de` and set a redirect to the apex.
- [ ] HTTPS is provisioned automatically (Cloudflare Universal SSL).
- [ ] Open `https://firstupweddings.de` and confirm the live site loads.

## 6. Contact form — live test

- [ ] On the live URL, send one real test submission via `/kontakt`.
- [ ] Confirm the message arrives at `firstupweddings@gmail.com`.
- [ ] Optional: open dev tools, tick the hidden `botcheck` honeypot, submit again, confirm Web3Forms blocks it.

## 7. Legal pages — fill placeholders before launch

In `src/pages/impressum.astro`:

- [ ] Replace `[Straße und Hausnummer]` with real address line.
- [ ] Replace `[PLZ Ort]` with real postal code & city.
- [ ] Decide whether to publish the phone number publicly. If not, delete that line.
- [ ] **Umsatzsteuer** section: keep with Kleinunternehmer hint, fill USt-IdNr., or delete the entire block.
- [ ] **Verantwortlich nach § 18 Abs. 2 MStV**: replace `[Anschrift wie oben]` with the real address.

In `src/pages/datenschutz.astro`:

- [ ] Replace `[Straße und Hausnummer]` and `[PLZ Ort]`.
- [ ] Replace `[Monat Jahr]` with the real "last updated" date.
- [ ] Re-read end-to-end before publishing.

**Important:** the placeholder text is a starting point, not legally final. Have a lawyer or [eRecht24](https://www.e-recht24.de) review both pages before launch.

## 8. Business / tax (Germany)

- [ ] Check whether a **Gewerbeanmeldung** is required before charging clients for paid wedding work — generally yes the moment recurring paid work starts.
- [ ] If yes: register at the local Gewerbeamt (~30 €), then update the Impressum.
- [ ] Check **Kleinunternehmerregelung (§ 19 UStG)**. If applicable, add the standard hint to the Impressum.
- [ ] Optional: research **Künstlersozialkasse** — wedding filmmakers often qualify.

## 9. Mobile / SEO smoke test

- [ ] Open every page on a real phone over 4G.
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on the live URL — aim for >90 mobile.
- [ ] Verify autoplay videos start within a couple of seconds.
- [ ] Verify the sticky portrait on `/ueber-mich` stays in place on desktop scroll.
- [ ] Submit the URL to Google Search Console once the domain is live.

## 10. Final pre-launch

- [ ] Re-check every email and phone number on the site (Header, Footer, Kontakt, Impressum, Datenschutz).
- [ ] Re-check social links (Instagram + TikTok `@firstupweddings`).
- [ ] Confirm `astro.config.mjs` `site:` matches the live domain.
- [ ] Tag a release commit (`git tag v1.0.0`).
- [ ] Announce.

---

## Files added / updated during launch prep

- `src/pages/impressum.astro` — placeholder Impressum (natural person)
- `src/pages/datenschutz.astro` — placeholder Datenschutzerklärung (Cloudflare, Web3Forms, Google Fonts)
- `src/pages/kontakt.astro` — Web3Forms backend + honeypot + status feedback + privacy note
- `src/pages/euer-tag.astro` — `<video>` poster + `preload="metadata"`
- `src/pages/filmstil.astro` — `<video>` poster + `preload="metadata"`
- `src/pages/index.astro` — cleaned up hero placeholder comment
- `src/layouts/Layout.astro` — Open Graph + Twitter Card + canonical + favicon fallbacks
- `astro.config.mjs` — `site: 'https://firstupweddings.de'`
- `public/favicon.svg` — minimal F-mark favicon
- `public/einblick-poster.jpg`, `public/filmstil-poster.jpg` — first-frame posters
- `public/filmstil.mp4` — replaced with 18 MB websmall version
- `public/logo.png` — replaced with cropped 400×400 brand wordmark
- `README.md` — full deployment guide for external registrar + Cloudflare DNS workflow
- `.gitignore` — Astro/Node defaults
- `LAUNCH-CHECKLIST.md` — this file
