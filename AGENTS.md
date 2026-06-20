# Project Overview
Jarosz Logistics is a static, multi-page marketing site for a Northwest Arkansas
small business offering three services: mobile auto detailing, smart-home
installs, and box-truck logistics. The site is hosted on a private VPS.

# URL Prefix / Portability
All asset and inter-page links use **relative paths** (no leading `/`), so the
site works at any URL prefix — `/`, `/new`, `/foo/bar`, etc. — without changes.
- Root pages (`index.html`) reference assets as `assets/...` and siblings as
  `detailing/`, `smart-home/`, `logistics/`.
- Sub-pages (`detailing/index.html` etc.) use `../assets/...` and
  `../detailing/` etc. to climb out of their directory first.
- Same-page fragment links (`#book`) stay as bare fragments — do not prefix.
If you add a new page, follow the same depth-based convention. Avoid `<base
href>` because it breaks fragment-only links.

# Structure
All web content lives under `src/`; everything in `src/` is what gets rsynced
to the server by `make deploy`. The repo root holds only the `Makefile`, this
`AGENTS` file, and `.gitignore`.
- `src/index.html` — landing page; hero + three service cards (detailing,
  smart home, logistics) + contact.
- `src/detailing/index.html` — detailing service page with pricing tables and
  an embedded Cal.com booking calendar.
- `src/smart-home/index.html` — install service page with pricing, gallery,
  and embedded Cal.com booking calendar.
- `src/logistics/index.html` — trucking/last-mile content.
- `src/assets/css/styles.css` — shared design system.
- `src/assets/js/main.js` — year stamping, smooth scroll, active nav
  highlight, lightbox.
- `src/assets/img/raw/` — raw originals (gitignored, not shipped); web
  versions live in `src/assets/img/{detailing,smart-home}/`.

# Styling Notes
- CSS variables in `:root` define the color system. Per-page accent is set by
  a `body.page-*` class (`page-detail` amber, `page-smart` teal,
  `page-logistics` sky). Add new colors via variables, not hex literals.
- Layout uses flexbox and CSS grid. Mobile-first; the main breakpoints are
  700px (contact card), 800px (service grid), 900px (two-column grids).
- The dark theme uses radial gradients on `<body>` for ambient color; keep
  background changes consistent.
- Uses `color-mix()` for tinted backgrounds — requires modern browsers
  (Chrome 111+, Safari 16.2+, Firefox 113+). Provide rgba fallbacks if older
  browsers become a target.

# JavaScript Notes
- Vanilla JS only, loaded from `assets/js/main.js` (root pages) or
  `../assets/js/main.js` (sub-pages) at the bottom of each page.
- The active nav state is derived from `<body data-page="...">`; matching
  `<a data-page="...">` entries in `nav.primary` receive `.active`.
- Smooth scroll hooks every `a[href^="#"]`; ensure new anchors use real IDs.

# Cal.com Booking
The detailing and smart-home pages each embed a Cal.com inline calendar at
`#book`, each in its own Cal namespace with its own `calLink` and brand color:
- Detailing → namespace `auto-detail`, `jaroszlogistics/auto-detail`, amber
  brand (`#fbbf24`).
- Smart Home → namespace `smart-install`, `jaroszlogistics/smart-home-install`,
  teal brand (`#14b8a6`).
The Cal account belongs to `julius@jaroszlogistics.com`. To add a page-level
booking elsewhere, copy the `<section id="book">` block from one of these
pages and change three things: the namespace string in `Cal("init", …)`, the
`calLink`, and the `cal-brand` CSS var to match the page accent.

# Testing / Preview
- Serve locally with `make serve` (runs `python3 -m http.server` inside
  `src/`). `file://` will break asset paths and the Cal.com embed.
- Validate layout across mobile (<700px), tablet (~800px), and desktop.

# Deploy
- `make deploy` rsyncs the contents of `src/` to
  `jaroszlogistics@quasarj.com:www/` (additive — no `--delete`).
- `make dry-run` shows what would change without writing.
- Excludes `.DS_Store` and `assets/img/raw/` so locals don't ship.

# Accessibility
- Maintain ARIA labels on `<nav>` and section headings; `.sr-only` is available
  for visually-hidden labels.
- Keep `:focus-visible` outlines on `.btn` and `.cta`; don't strip them.

# Content TODOs
- Julius's available days/hours (configure in Cal.com).
- Hero/gallery photos for detailing and smart-home pages.
- USDOT/MC numbers if Julius wants them displayed.
