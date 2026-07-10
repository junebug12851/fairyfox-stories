# Project Status

_Current state only._ For history see `sessions/`; for the changelog see `version.md`.

**Version:** `0.2.3` (single source of truth: repo-root `VERSION`).

**Automation:** the farm loop now runs unattended via a **daily scheduled job (midnight,
America/Denver)** — grow 2 books, plant one when 3+ days have passed, **auto-publish to `main`**.
See `reference/operating-model.md` → *Automation* and `decisions/architecture.md` (2026-07-09).

## Current state (read this first)

Fairy Fox Stories is an **AI-managed story farm** — a Jekyll site publishing short interactive
**books** (fully pre-planned, then written a chapter at a time) over a meshed world of
**universes, characters, and cities**. Sibling to `fairyfox-games`; same mesh discipline,
different craft (fiction) and engine (Jekyll).

**Bootstrapped, live, and growing.** The Jekyll scaffold, integrity check + CI, the five-book
starting shelf (distinct genre/form/style/author each, with cover + ch.1 art), and the daily
automation are all shipped; the site has had two live releases (v0.2.0, v0.2.2). The farm is now in
its **daily grow** phase — advancing real chapters on the least-tended books. The full build plan is
`plans/farm-build-plan.md`; the daily loop is `reference/operating-model.md`.

## The shelf (as of v0.2.3)

| Book | Form | Progress | Last grown |
|------|------|----------|-----------|
| The Wintering House (gothic) | novella | 2 / 11 | 2026-07-10 |
| The Girl Who Sold the Wind (fable) | novelette | 2 / 5 | 2026-07-10 |
| The Cartographer of Decks (SF) | novelette | 2 / 6 | 2026-07-10 |
| The Cinderwick Job (caper) | novelette | 1 / 7 | 2026-07-06 |
| The Two-O'Clock Launderette (magical realism) | short story | 1 / 3 | 2026-07-05 |

All five are `growing`; none complete, so no sequel roll is live yet.

## Next

- **Keep growing** — next runs pick up Cinderwick + Launderette (deferred this run) and continue the
  blend. See `plans/next-steps.md`.
- **Needs Fairy Fox:** reconcile the grow-count (`operating-model.md` says 2/day; task + CLAUDE.md
  say up to 5) into `decisions/`; review + merge the five Dependabot Actions PRs (#2–#6, deploy
  workflow) — held so an unattended grow release never rides an untested workflow change.

## Health

| Area | Status |
|------|--------|
| Repo + branches (dev/main) | ✅ public repo on GitHub; `dev`/`main` in sync, released through v0.2.2 |
| Notes + craft body of knowledge | ✅ written (`reference/` incl. `craft/`) |
| Architecture decided | ✅ Jekyll · form-first · collection · comprehensive sub-notes (`decisions/`) |
| Jekyll scaffold (collections/layouts/reader) | ✅ built + previewed in Chrome |
| Books on the shelf | ✅ **5 planted + growing** (caper · cosy magical-realism · SF · gothic · fable); 3 now at ch.2, 2 at ch.1 |
| Authors / universes | ✅ 5 distinct author-personas, 5 universes — meshed + bylined |
| Cover & chapter art | ✅ generated for all 5 (gpt-image-1 via `scripts/generate-art.mjs`) |
| Integrity check + CI | ✅ `scripts/check-stories.test.mjs` green (5 checks), runs on push/PR |
| GitHub Pages (`fairyfox.io/fairyfox-stories/`) | ✅ live (deploys on tagged release to `main`) |
| Hub registration | ⛔ pending (hub-side edit) |
| Writing/art tooling (`.env` OpenAI key) | ✅ `.env` key present; art via `generate-art.mjs` (prose hand-drafted for now) |
| Self-hosted fonts / no third-party | ✅ vendored from the mesh |
| Legal docs | ✅ Privacy/Terms/Cookies re-scoped to Stories (verify wording on preview) |
