# Next Steps

Ordered, current. Remove as done; history lives in `../sessions/`. The master build spec is
`farm-build-plan.md`; the daily loop is `../reference/operating-model.md`.

The scaffold, integrity check + CI, the five-book starting shelf (each with cover/ch.1 art), and
two live releases (v0.2.0, v0.2.2) are **done**. The farm is in its **daily grow** phase.

1. **Keep growing the shelf** — the daily job advances the least-tended books one whole chapter
   each (blend + 15–20% random override), weekly sequel roll once a series completes. As of
   v0.2.3: Wintering House 2/11, Girl Who Sold the Wind 2/5, Cartographer of Decks 2/6, Cinderwick
   Job 1/7, Two-O'Clock Launderette 1/3. Cinderwick + Launderette are next up (most-recently-grown
   / most-complete, deferred this run).
2. **Reconcile the grow-count doc** *(needs Fairy Fox)* — `operating-model.md` says grow **exactly
   2**/day (v0.2.1); the daily task file + `CLAUDE.md` say **up to 5**. Pick one, record it in
   `decisions/`, make the operating model the single source of truth.
3. **Dependabot PRs #2–#6** *(needs Fairy Fox)* — five GitHub-Actions bumps on `dev` touching the
   Pages **deploy** workflow (checkout 4→7, deploy-pages 4→5, configure-pages 5→6,
   upload-pages-artifact 3→5, attest-build-provenance 2→4). Left un-merged so an unattended grow
   release never rides on an untested workflow change; review + merge (ideally on a run with no
   content release, or verify the deploy after).

## Bench (ideas, not commitments)

- `scripts/generate-chapter.mjs` — an OpenAI prose-drafting helper (chapters are currently
  hand-drafted by the maintainer; `generate-art.mjs` already exists for art).
- Per-book `image:` (the cover) so share cards use the cover instead of the generic emblem.
- A universe/character/city index page as the world grows; the Atom feed already ships (jekyll-feed).
