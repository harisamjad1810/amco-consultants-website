# AMCO Consultants — website

The marketing site for AMCO Consultants and AMCO ERP, in **English and Urdu**.
Served at `amcoconsultants.tech`. Completely separate from the ERP repository.

## Stack

| | |
|---|---|
| Framework | Next.js (App Router), **static export** — `npm run build` writes plain files to `out/` |
| Styling | Tailwind CSS v4 — every colour is a token in `src/app/globals.css` |
| Animation | **CSS only** (transform + opacity), plus one small scroll observer for the fade-ins |
| Fonts | Inter and Plus Jakarta Sans (bundled by next/font); Noto Nastaliq Urdu self-hosted in `public/fonts/` |

⚠️ **No animation or smooth-scroll libraries, on purpose.** The first version used Motion, GSAP and Lenis. Lenis broke mouse-wheel and touchpad scrolling, and the bundle made the page take 5 seconds to show on a phone. Without them the English page shows in about 0.3s on a slowed-down phone CPU and weighs 270 KB. Add a library back only for an effect CSS genuinely cannot do, and measure before and after.

## Run it

```
npm install
npm run dev        # for EDITING — compiles on demand, so it is slow; not the real speed
npm run preview    # builds, then serves the real site at http://localhost:4600
npm run build      # static site in out/
npm run typecheck
```

**Judge speed with `npm run preview`, never with `npm run dev`.**

## How the two languages work

- **English is the default and has no prefix** (`/`, `/explore/`, `/demo/`); **Urdu lives under `/ur/`** (`/ur/`, `/ur/explore/`, `/ur/demo/`). Urdu pages are `dir="rtl"` and set in Nastaliq. Every address is built in `src/lib/paths.ts`.
- The pages are `src/app/(en)/…` and `src/app/ur/…`; both draw the same views in `src/views/` through one shell, `SiteShell.tsx`.
- A first-time visitor sees the language dialog. A visitor who chose Urdu before and opens the bare domain is sent to `/ur/` by the shell's inline head script, before anything is drawn.
- The choice is saved in **localStorage and a cookie** (`amco_lang`, one year). The EN | اردو pill in the top bar changes it and keeps you on the same page. Both languages' pages are prefetched, so the switch is near-instant.
- All text is in `src/i18n/dictionaries/en.ts` and `ur.ts`. `ur.ts` is typed against `en.ts`, so a missing Urdu string **fails the build**.
- To add a page: write its view in `src/views/`, add a route file under BOTH `src/app/(en)/` and `src/app/ur/`, add its path to `src/lib/paths.ts` and `src/views/metadata.ts`, its text to both dictionaries, and its link in `Navbar.tsx`.

### ⚠️ The Urdu font — three traps, all hit once already

1. **It is self-hosted, not loaded through next/font.** next/font can only preload a font for every page or for none, so either every English visitor downloaded 235 KB they never use, or Urdu visitors saw the headline redraw.
2. **The preload is issued by the inline head script, on Urdu pages only.** A `<link rel="preload">` element was tried: React turned it into a hint that the English page's prefetch of `/ur/` acted on, so English visitors downloaded the font anyway.
3. **The font stacks name the families directly** (`'Inter', 'Noto Nastaliq Urdu'`), Latin first. next/font's variables carry a local Arial fallback, and Arial on Windows has Urdu letters, so Urdu was drawn in Arial.

On English pages the "اردو" label in the switcher is drawn in the system font, and the Nastaliq file starts downloading only when the visitor hovers over, touches or focuses the Urdu side.

## Pages

| Address | What |
|---|---|
| `/`, `/ur/` | Home: hero, features, the five tax authorities, why AMCO (`#why`), our team (`#team`) |
| `/explore/`, `/ur/explore/` | AMCO ERP in detail: modules, a tour of 8 real screens with numbered markers, tax authorities, videos |
| `/demo/`, `/ur/demo/` | The free-demo request form, with "what happens next" |

The navbar links AMCO ERP, Why AMCO and Our team; **Free demo** is its main button. On the home page the link of the section on screen lights up as you scroll.

## The free-demo form — how it reaches the ERP

The website never touches a database. This site is static (no server code), so it **posts** the form to the ERP's one public, write-only endpoint:

```
POST https://amcoerp.com/api/public/demo-request
```

The ERP validates it, stores it in its own `demo_requests` table and answers "thank you". The Super Admin works through the requests on **ERP › Super Admin › Platform › Demo Requests**. The endpoint returns nothing stored, is limited to 5 requests per IP per hour, ignores bots through a hidden field, and only `amcoconsultants.tech` may call it from a browser (`PUBLIC_FORM_ORIGINS` in the ERP's `.env`).

The address is fixed at build time (`DEMO_REQUEST_URL` in `src/lib/site.ts`). To test locally against the dev ERP:

```
NEXT_PUBLIC_DEMO_REQUEST_URL=http://localhost:4000/api/public/demo-request npm run preview
```

## Screenshots and videos

- `public/erp/*.webp` are real ERP screens, and `src/lib/erp-screens.json` holds the measured position of each numbered marker. **Re-capture both together** when the ERP's screens change; the marker text is in the dictionaries (`product.tour.screens`).
- Videos: one per language — `public/videos/amco-erp-tour-en.mp4` and `amco-erp-tour-ur.mp4` (about 94 MB each), set in `src/lib/erp-videos.ts`. They are the DRAFT renders from `D:\Projects\AMCO-ERP-Videos\out\drafts`; to update, overwrite the files under the same names. A language set to `null` shows "Video coming soon".

## Brand

- **Logo**: the supplied files are in `public/brand/` (green for light grounds, white for dark). `src/components/brand/Logo.tsx` draws the same logo inline so the navbar can switch between them; its wordmark uses the Sora font, bundled through next/font.
- **Browser-tab icon**: `src/app/icon.svg` (the amber "A" mark).

## Still to supply

- **Team names, roles and photos**: the eight people in `src/lib/team.ts` are placeholders, with stand-in pictures in `public/team/`. Replace both there (names and roles in English and Urdu); the section adapts to any number of people.
- **The videos** for the product page.
- The Urdu copy should be reviewed by a native speaker before launch.

## Going live

**[`DEPLOY.md`](DEPLOY.md)** — GitHub, DNS, the server, nginx, HTTPS, and every later update (`bash /srv/amco-website/deploy/deploy.sh`).
