# Portfolio — Syed Ibrahim Ali

A hand-built, no-framework static portfolio. Dark theme, teal accent, mobile-first, zero build step. Lives at `graysuit.github.io/portfolio/`.

## Preview locally

Run a local server (plain `file://` works too, but a server is cleaner):

```powershell
python -m http.server 8000
```

Open http://localhost:8000

## Structure

```
graysuit/graysuit repo root     <- served at https://graysuit.github.io/
  index.html            Hero + stats bar + featured project cards + short "what I do"
  pages/
    projects.html       Filterable, expandable project grid
    skills.html         Expert / Strong / Good / Archived / Skip
    about.html          Bio + timeline 2019 → now
    contact.html        Fiverr, GitHub, LinkedIn, Discord, location
  404.html
  assets/css/style.css          Design system
  assets/js/
    components.js       Injects shared header/footer
    projects.js         ALL project data (one array)
    main.js             Rendering, filters, expand, nav, reveal
  assets/img/
    favicon.svg / og-image.svg / ibrahim.jpg
    projects/           Real client screenshots (33 files, the actual payload)
    screens/            SVG mocks — only natforms.svg + the screen.svg fallback
  robots.txt / sitemap.xml
  README.md             GitHub profile page (renders on github.com/graysuit)
  README.site.md        This file — site documentation
```

The site root is the repository root. Locally this folder is called `portfolio/`, but it is pushed to the repo root and served from the domain root.

Sits alongside locally, and is **never deployed**:

```
portfolio_work/                <- tooling + source material
  download_images.py    Scan fiverr_inbox chats, download images, OCR, organise
  download_phase1.py    Phase 1: bulk parallel download of chat images
  ocr_phase2.py         Phase 2: PaddleOCR pass, detect software names, rename
  gen_mocks.py          Regenerates the SVG window mocks
  chat_images/          568 raw Fiverr chat screenshots (66 MB)
  order_images/         25 Fiverr order screenshots
```

`portfolio_work/chat_images/` and `order_images/` are named with **real Fiverr usernames and order IDs** and must stay out of anything public. They exist only as a source pool for picking screenshots. `.gitignore` in this repo blocks `*.py`, `chats/`, `orders/`, `*_manifest.json` and `*Cookies*.txt` as a second line of defence.

## Add a project

Edit `assets/js/projects.js` and append an object to `PROJECTS`:

```js
{
  name: "YourProject",
  tagline: "One short line for the card.",
  cat: "desktop",          // desktop | scraping | automation | opensource | hardware | security
  accent: "#2dd4bf",       // colour for chips + mock
  tags: ["WPF", "VB.NET"],
  year: "2026",
  client: "Cv***** · United Kingdom 🇬🇧",   // ALWAYS anonymised
  image: "assets/img/projects/yourproject.png",
  problem: "One-three short sentences.",
  did: "One-three short sentences, own calls called out.",
  result: "One-two short sentences.",
  featured: true,          // true = also shows on homepage
  url: "https://..."       // optional external link (open source)
}
```

Filter categories are a fixed list in `main.js` (`initProjectFilters`, currently `all, desktop, scraping, automation, opensource, hardware, security`). Add new `cat` values there if you introduce one, and only add a category you actually have projects for — an empty category renders a blank grid.

## Add a real screenshot

1. Save the image as `assets/img/projects/<name>.png` (or `.jpg`).
2. Point the project's `image` at `assets/img/projects/<name>.png`.
3. Done — the card resizes to fit (16:10 area, `object-fit: cover`).

If a project has no real screenshot, omit `image` entirely and the card falls back to `assets/img/screens/screen.svg`.

## Deploy to GitHub Pages

This repository **is** the site. `graysuit/graysuit` is a user profile repository, so its contents are served from the root of `main` at `https://graysuit.github.io/`. Push the root of this folder, never `portfolio_work/`.

```powershell
git add .
git commit -m "Update portfolio site"
git push origin main
```

Pages serves from `main` / root. The live URL is:

```
https://graysuit.github.io/
```

Because the site is served from the domain root, every `canonical`, `og:url` and JSON-LD `url` is written as `https://graysuit.github.io/...` with **no** `/portfolio/` prefix. If you ever move the site into a subfolder, those references and `sitemap.xml` have to change with it.

Before you commit, confirm nothing private slipped in:

```powershell
Select-String -Path assets\js\projects.js -Pattern 'FO[A-Z0-9]{10,}'
Get-ChildItem assets\img -Directory -Recurse | Select-Object -ExpandProperty Name
```

Both should return nothing but `projects` and `screens`.


## Content & privacy rules

- **Client work is always anonymised** — first 2 letters + `*****` + country + flag, e.g. `Cv***** · United Kingdom 🇬🇧`. Never show real Fiverr usernames.
- **Archived offensive-security work is listed, deliberately.** Four 2019–2021 entries (`grayfish`, `facebrute`, `gray-keylogger`, `RunSomeAware`) predate a 2021 move out of that field. The tools are deleted from my control; third-party mirrors still exist and are named here rather than quietly omitted. Three further entries — Snapchat/TikTok SSL-pinning bypass, `deoptfuscator` — are ordinary Android security research and remain under the `security` filter.
- Stats are the real ones: 200+ orders, 4.96/5.0, $76k, 25+ countries, 1.3k stars.
- Skills page lists real limits and a dedicated **Skip** section (no ASP.NET Core, cloud, Docker, SQL Server, heavy React).
