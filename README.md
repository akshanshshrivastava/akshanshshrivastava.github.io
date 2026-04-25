# KRAVVY — Own Your Vibe

A premium streetwear "coming soon" landing page with an interactive T-shirt customizer.

> Built different. Worn by you.

## Stack

- Vanilla **HTML / CSS / JavaScript** — zero build step.
- Hosted on **GitHub Pages** (`kravvy.github.io`).
- Fonts via Google Fonts (`Bebas Neue`, `Inter`, `Share Tech Mono`, `Noto Sans JP`).

## Features

- **Hero** — KRAVVY logo over banner artwork, glitching `COMING SOON`, parallax cursor reaction, live countdown timer (days / hours / minutes / seconds).
- **T-Shirt Customizer** — men's oversized + women's fitted SVG mockups with:
  - 3D mouse-tilt + neon glow on hover
  - 5 colorways (Bone, Obsidian, Volt, Violet, Blood)
  - `Randomize Design` button — generates fresh graphic overlays on both shirts
- **Floating ornaments** — clothing tags, barcode, kanji, abstract glyphs that drift in the background.
- **Glassmorphism contact card** — name / email / dropdown / message → `mailto:support@kravvy.com`.
- **Custom cursor** with a soft glow trail, scanlines and grain overlays, and subtle reveal-on-scroll.
- Fully responsive and respects `prefers-reduced-motion`.

## Local development

Just open the file:

```bash
open index.html
```

Or serve with anything (recommended for clean asset paths):

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Project structure

```
.
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── images/
│       ├── banner.png
│       └── logo.png
└── README.md
```

## Deploy

Already configured for GitHub Pages — push to `main` and the site is live at
[kravvy.github.io](https://kravvy.github.io).
