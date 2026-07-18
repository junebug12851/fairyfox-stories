---
date: 2026-07-18
procedure: adopting-updates
node: fairyfox-stories
outcome: completed
hub_version: 0.16.0
hub_commit: 5803ba3
---

# Process Report — adopting-updates, 2026-07-18

> A full, honest account of running a fairyfox system procedure. The point is to
> improve the system — so say what was rough even if the run succeeded. Voice: direct,
> matter-of-fact, no hype. Standard: `hub/standards/process-reports.md`.

## Outcome in one line

Checked the fairyfox system, then — on the user's explicit go-ahead — adopted both
un-adopted hub changes on `dev` (owner rename + the 0.16.0 chrome). Held `main` for a
browser pass, since the chrome change is visual and couldn't be verified headlessly.
Also surfaced (and could not fix from here) a live-site 404 on the custom domain.

## What was done

- **Refreshed the hub mirror.** `assets/references/fairyfox.io` was absent → fresh
  single-branch `dev` clone (`junebug12851.github.io`), HEAD `5803ba3`, hub `VERSION`
  0.16.0. Only the git-ignored mirror was touched.
- **Scoped the span.** No prior adopting-updates report; the setup report records no
  `hub_version`, so the last-adopted anchor was inferred as ~0.15.1. Read the hub
  changelog across 0.15.x → 0.16.0.
- **Adopted change 1 — owner rename `junebug12851` → `1fairyfox`** (hub 0.12.x). Swept
  every source reference (27 across `_config.yml`, `_includes/{header,footer}.html`,
  `.github/ISSUE_TEMPLATE/config.yml`, `legal/{privacy,terms,cookies}.html`,
  `README.md`, `CLAUDE.md`) via an EOL-safe UTF-8-no-BOM replace; verified none remain
  in source or built HTML. `notes/` history left intact (records what was true then).
- **Adopted change 2 — reader story-only spacing/width + "Farms" nav dropdown** (hub
  0.16.0, chrome bundle → 2.0.0). This node reimplements the chrome (own
  `styles.css`/`reader.css`/`reader.js`/`nav.js`, not the verbatim bundle), so it was a
  re-apply of intent, not a copy:
  - `assets/reader.js` and `assets/nav.js` replaced with the hub master (they were the
    same files minus the 0.16.0 additions — dropdown driver + `data-story` gating).
  - `_includes/head.html` pre-paint gated so `--reading-lh`/`--reading-width` apply only
    when `<html data-story>`.
  - `_layouts/default.html` sets `data-story` on `<html>` for `chapter`/`book`/`blueprint`
    pages (the per-book reading surfaces).
  - `assets/styles.css` gained the `.ff-rp-note` / `.ff-rp-sec.is-locked` rules; the
    `.dd` dropdown CSS was already present (styles.css had tracked it).
  - `_includes/header.html` nav: flat Stories/Games → a `Farms` `details.dd` dropdown,
    summary + Stories link marked active.
- **Verified.** `npm test` 6/6 green; `jekyll build` clean; built HTML confirms the
  Farms dropdown on the shelf, `<html lang="en" data-story>` on a chapter page (absent on
  the shelf), and the `1fairyfox` Source link. Reader panel is JS-injected, so the
  disabled/lock state isn't in static HTML — logic copied verbatim from the hub master.
- **Glanced at the working tree** (check step 3): clean, on `dev`, up to date. No
  mid-merge/detached-HEAD/divergence.
- **Held `main`.** Committed on `dev`; did not release — the chrome change is visual and
  needs a browser pass (Chrome not connected this session), and release is Fairy Fox's call.

## What went well

- The hub changelog was detailed enough to scope "what changed and why" without a file diff.
- `reader.js`/`nav.js` were byte-identical to the hub master apart from the 0.16.0
  additions, so the vendored-copy path was clean and low-risk; `styles.css` already
  carried the `.dd` dropdown CSS, so the nav change was markup-only.

## What went wrong / friction

- **No `hub_version` anchor from setup.** `2026-07-06-setup.md` has no front-matter, so
  the last-adopted anchor had to be inferred. Setup should plant it.
- **Chrome adoption can't be browser-verified here.** The 0.16.0 change is visual and
  CLAUDE.md forbids releasing a visual change unseen; Chrome isn't connected (a standing
  deferred-eyeball debt). Adopted on `dev` per the user's go-ahead, but `main` is held
  for a hard-reload pass over the Farms dropdown (desktop + mobile) and the reader panel
  (line-spacing/width unlocking on a chapter, locked with the note off a story).
- **Bundle divergence not flagged by the runbook.** The adopting-updates table treats the
  chrome as a verbatim-copy bundle, but this node reimplemented it, so "copy the bundle"
  didn't apply — it was a hand re-apply. The runbook could note that a node which took the
  reimplement path re-applies chrome *intent*, not the bundle files.
- **Live 404 (surfaced, not fixable here).** `https://fairyfox.io/fairyfox-stories/`
  serves empty/404 site-wide, while `https://1fairyfox.github.io/fairyfox-stories/` works
  and `https://fairyfox.io/fairyfox-games/` works. Local build is clean. Re-ran the Pages
  deploy from `gh` — no change. Root cause is GitHub-Pages custom-domain routing tied to
  the account rename (apex `fairyfox.io` sits on repo `junebug12851.github.io`, no longer
  a user site under `1fairyfox`), compounded by an in-flight DigitalOcean→Namecheap DNS
  move. GitHub-dashboard / DNS side; left for Fairy Fox.

## Suggestions / feedback

- **`new-project-setup` should require `hub_version` (+ `hub_commit`) in the setup report
  front-matter** — it is the anchor the first check depends on, and this run had to infer it.
- **`adopting-updates.md`**: add a line that a node which reimplemented the chrome
  re-applies the 0.16.0 *intent* into its own CSS/JS rather than copying `chrome/`, and
  that a visual chrome change with no browser available adopts on `dev` and holds `main`.
- Consider an explicit "if trivially cheap, sanity-check the live custom-domain URL" note
  in the check flow — a custom-domain regression isn't in git but a check pass can catch it.

## Environment

Jekyll 4.4 / Ruby 3.3 node, Windows + PowerShell + file tools (no Cowork bash, per
`agent-tooling.md`). On `dev`, tree clean on arrival. Repo owner is now `1fairyfox`
(rename from `junebug12851`); local remote still uses the old name via GitHub's redirect.
Chrome not connected — visual verification unavailable this session.
