# Project Status

_Current state only._ For history see `sessions/`; for the changelog see `version.md`.

**Version:** `0.4.3` (single source of truth: repo-root `VERSION`).

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

## The shelf (as of v0.4.3)

| Book | Form | Progress | Last grown |
|------|------|----------|-----------|
| ✅ **The Two-O'Clock Launderette** (magical realism) | short story | **3 / 3 — complete** | 2026-07-14 |
| ✅ **The Girl Who Sold the Wind** (fable) | novelette | **5 / 5 — complete** | 2026-07-17 |
| ✅ **The Cartographer of Decks** (SF) | novelette | **6 / 6 — complete** | 2026-07-17 |
| Every Lock but Hers (magical realism) | novella | 5 / 11 | 2026-07-18 |
| The Wintering House (gothic) | novella | 7 / 11 | 2026-07-18 |
| The Cinderwick Job (caper) | novelette | 6 / 7 | 2026-07-18 |
| The Blindfold Act (mystery · sequel-locked) | novelette | 2 / 6 | 2026-07-17 |

**Seven books — three `complete`, four `growing`.** Latest run **07-18 (v0.4.3, grow)**: three chapters, a
quiet middle-of-the-book run (nothing finished, nothing one chapter from done) — *Every Lock but Hers* ch.5
"What It Costs" (5/11), *The Wintering House* ch.7 "The Hand at the Fire" (7/11), *The Cinderwick Job* ch.6
"The Double-Cross" (6/7). **No override** (rolls `32`/`77`/`71` vs. the ≤18 threshold) — a clean mechanical
draw straight down the blend: *Every Lock* **0.818** (finally cashes the slot it missed by 0.015 on 07-17),
*Wintering* **0.727**, *Cinderwick* **0.643**. *The Blindfold Act* (0.583) missed the third slot — it led
07-17 at a record 0.917 but was grown that day, so its staleness term is only 0.5 against the others' 1.0;
the blend correctly rotated it back for one run (it returns to the front next run — highest incompleteness
on the shelf). Full audit in `sessions/2026-07/2026-07-18.md`.

## Next

- **The weekly sequel roll is due on the next run on or after 2026-07-21.** Three eligible completed
  series: **The Launderette, The Girl Who Sold the Wind, The Cartographer of Decks**, each rolling ~25%
  independently. All three are **unlocked**, so the still-unwired exclusion (below) can't bite on this
  roll — but it now has a date three days out. Note for whoever runs it: both newer books close their
  frames deliberately (*Girl*'s narrator finishes her telling; *Cartographer* ends on a promise it
  refuses to make), so a sequel to either should be a **new tale in the realm**, not a continuation —
  *Cartographer* has even planted its own hook in-world (**433, Emil Tolver at 31**), deliberately
  unpromised.
- **The Blindfold Act returns to the front next run.** It sat out 07-18 only because it was grown 07-17
  (staleness 0.5); at 2/6 it carries the highest incompleteness on the shelf (0.667) and will be stale-2
  next run, so the blend puts it back at the top. **ch.3 "The Tells"** is next — the fire-eater Perro's
  debt as the false lead, the money half-surfacing. Ch.2 planted Lark's stove tell and closed the door
  Sonora shut herself; ch.4's turn later has to cost Sonora the alibi she wrote for the girl, not a new
  clue.
- **Cinderwick is one chapter from done.** At 6/7 the caper's finale, **ch.7 "The Name,"** is next
  whenever it's picked — Juno wins not by out-thieving Crane but by trusting Kit out loud and giving up
  the solo score; the Nightingale ends somewhere Crane can't reach; a door left ajar, not a sequel hook.
  Ch.6 left her cornered in the sprung cellar with the fourth thing spent, Kit revealed loyal, and Crane's
  real want (her, not the bird) named — the trust-not-a-plan move is all that's left. **First completion
  since 07-17 will land here.**
- **The two novellas are heading into their turns.** *The Wintering House* (7/11) has finished its
  "Cracks" section and next enters **The Secret (ch.8–9)** — Agnes learns the full shape of what the
  family keeps warm and that they mean her to become the next who tends it. *Every Lock but Hers* (5/11)
  next hits **ch.6 "The Job She Can't Do"** — the Dani eviction that breaks Nell's no-questions rule. Both
  are mid-book and will stay in the blend's rotation for several runs yet.
- **Next plant** eligible on or after **2026-07-18** (`fairyfox-stories-new`, ~every 3 days; last plant
  *The Blindfold Act* 07-15) — but that's the sibling `-new` job's call, not this grow job's. Planting
  note still standing: **cost the finale at ~1.5× a middle chapter** when drawing the word-pick
  (`craft/forms.md`).
- **Needs Fairy Fox (still open, 8th run):** reconcile the grow-count — `operating-model.md` says
  **exactly 2/day**, while `CLAUDE.md`, `craft/serialization.md`, and the scheduled task say **up to
  5**. Every run 07-11 → 07-18 has grown **3** (inside "up to 5", above "exactly 2") and flagged it
  rather than silently picking a side; one number should win, recorded in `decisions/`.
- **Needs Fairy Fox — sequel-lock, part (b) only, now on a deadline (07-21):** part (a) is **done as of
  this run** — a book's `state` is now derived from the chapters on disk and enforced by `npm test`, and
  a `sequelLock: true` book at full chapters **must** be `complete-no-sequel`, never a plain `complete`.
  What's still owed is **(b): exclude `sequelLock: true` books from the weekly sequel roll.** Left
  unwired deliberately — it changes the roll's semantics in `operating-model.md`, which isn't a bug fix.
  *The Blindfold Act* (2/6) is the only locked book and is nowhere near completion, so there's room.
- **Needs Fairy Fox:** review + merge the five Dependabot Actions PRs (#2–#6, deploy workflow) — held
  so an unattended grow release never rides an untested workflow change.
- **The `branch-sync` CI fix has shipped and is confirmed working** (was carried here as "on `dev`,
  awaiting the next release"). It rode v0.4.1 to `main`; `dev` and `main` were verified identical at
  `6e78be5` at the start of the 07-17 run. On the **v0.4.2 release it went green on the first attempt
  in 42s** — the retry (6×/30s) absorbing the by-design race where `branch-sync` checks `dev` in the
  seconds before the back-merge lands, exactly as designed. **Closed; no longer watch-listed.**
- **Deferred eyeball (07-11 → 07-18):** Chrome wasn't connected on any recent run (eight grow runs + the
  07-15 plant), so new pages were verified structurally (`npm test`) and against the built Jekyll HTML
  but not read in a browser. All are prose + front-matter changes with no template or CSS edits — but the
  debt is now **twenty-four grown chapter pages + the *Blindfold Act* card/ch.1 + the three completed-book
  cards** deep, worth one hard-reload pass over the shelf and the new pages next time a browser is up
  (typography, drop cap, overflow, the progress bars — now 45% / 64% / 86% on the three grown books —
  prev/next nav at a book's true last chapter, the **titled fallback cover** on the art-less *Blindfold*
  card, responsiveness). The `complete` state was headless-verified on 07-14 and renders right; the three
  `mark-done` badges were re-confirmed in built HTML on 07-17. No `state`/template change shipped 07-18.

## Health

| Area | Status |
|------|--------|
| Repo + branches (dev/main) | ✅ public repo on GitHub; `dev`/`main` in sync, released through v0.4.3 |
| Notes + craft body of knowledge | ✅ written (`reference/` incl. `craft/`) |
| Architecture decided | ✅ Jekyll · form-first · collection · comprehensive sub-notes (`decisions/`) |
| Jekyll scaffold (collections/layouts/reader) | ✅ built + previewed in Chrome |
| Books on the shelf | ✅ **7 on the shelf — 3 complete, 4 growing** (caper · cosy magical-realism · SF · gothic · fable · night-city magical-realism novella · carnival mystery); *The Two-O'Clock Launderette* **finished 07-14**, the farm's first completed book; *The Girl Who Sold the Wind* + *The Cartographer of Decks* **both finished 07-17** — first time two books completed on one run; *The Blindfold Act* **planted 07-15**, the first mystery + first sequel-locked book |
| Authors / universes / characters | ✅ 6 author-personas (Roan Cassady added 07-15), 6 universes (The Sawdust Circuit — a grounded, non-magical realm — added 07-15), 15 character pages (Madame Sonora + Lark + Colonel Aurelio added 07-15) — meshed + bylined |
| Cover & chapter art | ✅ covers generated for the first 6 (gpt-image-1 via `scripts/generate-art.mjs`); ch.1 header art on the first 5. *The Blindfold Act* is **text-only (budget-deferred)** — the shelf card degrades to the titled fallback; cover/header art can be generated in a later pass |
| Integrity check + CI | ✅ `scripts/check-stories.test.mjs` green (**6 checks** — state/sequel-lock consistency added 07-17), runs on push/PR |
| GitHub Pages (`fairyfox.io/fairyfox-stories/`) | ✅ live (deploys on tagged release to `main`); last release **v0.4.3**, 2026-07-18 |
| Hub registration | ⛔ pending (hub-side edit) |
| Writing/art tooling (`.env` OpenAI key) | ✅ `.env` key present; art via `generate-art.mjs` (prose hand-drafted for now) |
| Self-hosted fonts / no third-party | ✅ vendored from the mesh |
| Legal docs | ✅ Privacy/Terms/Cookies re-scoped to Stories (verify wording on preview) |
