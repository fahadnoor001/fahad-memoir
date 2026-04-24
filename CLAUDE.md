# CLAUDE.md

Context for Claude Code sessions working on this repository. Read this first before making changes.

## What this repo is

A personal memoir and digital business card for Fahad — a static website (no build step, no framework) with three pages:

- `index.html` — Biography (Houston) + video hero + 3 chapter modules
- `powerlifting.html` — Powerlifting (Six years. Three lifts.)
- `contact.html` — Contact

All pages share `styles.css` and `script.js`.

## Tech stack

- **Vanilla HTML / CSS / JavaScript** — no React, no Vue, no build tools
- **Node.js** only for the dev preview (`server.js` — built-in `http` module, no deps)
- **No package.json** by design
- **GitHub Pages** hosting — `.github/workflows/pages.yml` deploys on push to `master`

Live site: https://fahadnoor001.github.io/fahad-memoir/
Intended custom domain: `fahadnoor.ai`

## Design language — "The Index"

**Ferrari / Rolls-Royce / Ritz-Carlton / Hublot palette.** Dark editorial. Integrated from the `Fahad Memoir-handoff.zip` Claude Design direction (2026-04-23).

### Palette (CSS custom properties in `:root`)

| Token          | Value       | Use                                 |
|----------------|-------------|-------------------------------------|
| `--bg`         | `#0C0C0E`   | Hublot near-black, primary bg       |
| `--bg-2`       | `#111115`   | Alt chapter bg, marquee, footer     |
| `--bg-3`       | `#17171C`   | Tertiary panel                      |
| `--cream`      | `#EAE3D0`   | Ritz-Carlton cream, primary text    |
| `--cream-dim`  | `#9A9182`   | Body copy, dim text                 |
| `--muted`      | `#4A453C`   | Copyright / ultra-quiet text        |
| `--warm`       | `#B08A4A`   | Rolls champagne gold, accents       |
| `--warm-bright`| `#D4B073`   | Ferrari highlight gold, hover       |
| `--rule`       | `rgba(234,227,208,0.10)` | Hairline dividers          |
| `--rule-strong`| `rgba(234,227,208,0.18)` | Grid separators            |

### Typography

- **Serif:** Cormorant Garamond, weight 300 (display) / 400 (body) — italic reserved for pull-quotes and page subtitles only
- **Caps:** Inter, weight 500, letter-spacing 0.3em–0.42em, text-transform uppercase
- **Mono:** JetBrains Mono for photo-frame labels (`HOUSTON — FIG. 1`)

### Core components

- **Sticky nav** — 20px 56px padding, `backdrop-filter: blur(16px)` over `rgba(12,12,14,0.94)`, active link has gold hairline underbar
- **Video hero** (`index.html` only) — 860px tall, grayscale + grain + bottom fade, 30s loop trim, mute toggle with `backdrop-filter: blur(8px)`, "Houston · Texas" overlay bottom-left, scroll cue gold→transparent gradient
- **Page hero** (other pages) — centered kicker + display title + italic subtitle on near-black
- **Marquee** — infinite horizontal scroll, gold `◆` separators, Inter caps
- **Featured quote** — 32px italic serif on bg-2 panel, gold attribution kicker
- **Chapter module** — 1fr/1fr grid, 580px image tile, kicker + title + body + pull-quote + CTA; `.chapter--flip` swaps image to right via `direction: rtl`; `.chapter--alt` uses `--bg-2`
- **Lifts grid** (powerlifting) — 3-column hairline-bordered grid, 96px Cormorant numbers
- **Footer** — flex row, three text links + "© 2026 · Houston, Texas"

### Design rules (don't break without asking)

1. **Blur is allowed and intentional.** Nav uses `blur(16px)`, mute toggle uses `blur(8px)`, image labels use `blur(4px)` — this is the handoff spec.
2. **Italic Cormorant is reserved for pull-quotes, hero subtitles, and featured quotes.** Everything else is upright weight 300 or 400.
3. **Hairline rules** (`var(--rule)`) in semi-transparent cream separate sections — no gradients except the video hero fade and the scroll cue.
4. **Chapter kickers** appear above each chapter body in Inter caps 10px letter-spacing 0.42em, colored `var(--warm)` (gold).
5. **Photos are grayscale(0.25) contrast(1.05)** filtered in chapter modules — keeps them muted against the gold accent.
6. **Alternating chapters** — swap bg via `.chapter--alt` and image side via `.chapter--flip` for editorial rhythm.

## How to develop

### Local preview
```bash
node server.js
# opens http://localhost:3002
```

No install required — just Node.js. The Claude Preview MCP runs this via `.claude/launch.json` config `memoir-site`.

### Branch workflow

- **`master`** is the deploy branch. Every push to `master` auto-deploys to GitHub Pages (~1–2 min).
- **Never commit directly to `master`.** Always work on a feature branch and open a PR.
- **Branch naming**: `claude/<short-description>-<short-hash>` for Claude-authored work, `feature/<name>` for human-authored work.
- Squash-merge PRs: `gh pr merge <N> --squash --delete-branch` (no `--auto` — GitHub Free blocks it).

### Repo layout warning — two clones on this PC

Two independent clones of this repo live on Fahad's PC, both pointing at `origin/master`:

- **`C:\Users\fahad\Documents\AI\fahad-memoir\`** — TOP-LEVEL. Preview server + GitHub Pages deploy read from here. `__dirname` in `server.js` resolves to this path.
- **`C:\Users\fahad\Documents\AI\memoir\fahad-memoir\`** — NESTED. Used for feature-branch work.

Edits in one clone are invisible to the other until `git push` + `git pull`. Intended flow: commit on nested → push → pull on top-level. Before editing, confirm which clone is being served via `preview_list` → match `cwd`. Full details: `~/.claude/projects/C--Users-fahad-Documents-AI/memory/project_memoir_repo_layout.md`.

## Things to avoid

- **Don't add a build system.** The "no build step" simplicity is intentional.
- **Don't add dependencies.** Must work as static files served from any HTTP server.
- **Don't add a CSS framework.** Hand-crafted.
- **Don't put secrets in code.**
- **Don't revert to the old ivory "Monocle Editorial" palette.** That aesthetic was retired 2026-04-23 when the dark Claude Design handoff was integrated.

## File map

```
fahad-memoir/
├── .github/workflows/pages.yml    # GitHub Pages deploy on push to master
├── .claude/launch.json             # Dev preview config for Claude Code
├── assets/
│   ├── houston-skyline.jpg        # Chapter I image (~147KB)
│   └── profile-photo.jpeg         # Chapter II image (~136KB)
├── index.html                      # Biography + video hero + 3 chapters
├── powerlifting.html               # Powerlifting + lifts grid
├── contact.html                    # Contact
├── styles.css                      # Dark-palette stylesheet (shared)
├── script.js                       # Mute toggle + mobile nav + smooth scroll
├── server.js                       # Local dev preview server (Node built-ins only)
├── CLAUDE.md                       # This file
├── README.md                       # Human-facing project overview
└── .gitignore
```

Deprecated / removed: `contact.css`, `qr.js`, `growth.html`.

## Recent history

- **2026-04-23 — Dark handoff integration.** Full rebuild on `Fahad Memoir-handoff.zip` Claude Design direction. Cormorant Garamond serif. Near-black `#0C0C0E` bg. Champagne gold `#B08A4A` accents. Video hero with mute toggle. Alternating chapter modules. Six-year powerlifting history. Growth tab retired.
- **Pre-2026-04-23** (retired) — "Monocle Editorial × Ritz-Carlton" ivory aesthetic with `#F5F1EB` bg, Playfair Display, no-blur rule.
