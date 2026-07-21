# Architecture Decisions

Newest first. Each: the decision, why, and what it rules in/out.

## 2026-07-21 — First sequel plant: sequel semantics + the `sequelTo` manifest field

Planting *The One-O'Clock Bus* (the *Launderette* sequel — the first sequel in farm history) fixed
three semantics. **(1) A sequel plants into its parent's realm without a universe roll** — the
operating model already defines a sequel as "tied to the same universe/characters," so rolling
new-vs-existing would be theatre. All other plant rolls still run (form, word-pick, author,
sequel-lock). **(2) The author roll is NOT pinned to the parent's author** — it ran normally and
returned Idris Okonkwo-Vance, not Posy Fell, and that's a feature: a "new tale in the realm, not a
continuation" is sharpened by a different implied author, and the byline question flagged for the
*Girl* sequel is likewise the roll's to answer. **(3) The series link is recorded as `sequelTo:
<parent-slug>` in the child's manifest** — inert to the integrity checker (validation can come
later if sequels multiply), honest to the mesh, and enough for the weekly-roll bookkeeping
(a series with a planted-but-incomplete sequel stays out of the roll; tracked in status.md).
Parent-book presence in the sequel is series canon, kept nod-sized (one Nadia scene), and needs no
crossing roll; a reader of either book needs nothing from the other. Rules out: sequels as
continuations (the parent's closed frame stays closed), and physical nesting of any kind — the
sequel is a first-class book folder like any other.

## 2026-07-18 — Grow slows to 1 book/day (grow-count resolved); plant now auto-generates art

Two owner-directed changes (Fairy Fox).

**(1) The daily grow rate is now EXACTLY 1 book per day** — one whole finished chapter, on the single
least-tended book. This **resolves the long-standing grow-count discrepancy**: `operating-model.md`
had said "exactly 2", `CLAUDE.md` and `craft/serialization.md` and the scheduled task said "up to 5",
and every run 07-11→07-18 actually grew 3. One number now wins everywhere: **1**. **Why:** the owner
asked to slow the pace; a single book/day is calmer, keeps each day's craft focused, and matches the
games farm (which already grows one/day). The **15–20% random override** is retained as a per-day
probability (on ~1 day in 5–6 the single pick is purely random). Updated in step: `operating-model.md`
(single source of truth for the constant), `CLAUDE.md`, `craft/serialization.md`, and the
`fairyfox-stories-daily` scheduled-task prompt. **Plant cadence is unchanged — still ≤1 new book every
3 days.** Rules in/out: the least-tended-first blend and sequel/plant machinery are otherwise
unchanged; only the daily pick count drops 2→1.

**(2) The PLANT job now generates cover + opening-chapter art automatically.** `operating-model.md`
step 7 always specified "Cover/header art is generated (budget-aware)", but the `fairyfox-stories-new`
automation never actually ran `scripts/generate-art.mjs`, so every book it planted (*The Blindfold
Act* 07-15, *The Hundredth Wind* 07-18) shipped text-only against the titled fallback. Fixed the
automation to match the spec: the plant prompt now runs the art tool for a cover (1024x1024) and a
ch.1 header (**1536x1024** — gpt-image-1 rejects dall-e-3's 1792x1024), views the cover to confirm no
garbled lettering, and sets `cover:`/`header_image:`. The two art-less books were **backfilled** this
run. **Why:** a new book should look finished on the shelf, not degrade to fallback. Rules in/out: art
stays budget-aware and local-only (never at read time); on an image-API failure the plant job
BAIL-OUTs (records the skip) rather than shipping art-less.

## 2026-07-18 — First universe-join + first author-reuse; the skew steps down

Planting *The Hundredth Wind*, both parallel new-vs-existing rolls came up **existing** for the first
time in the farm's life (universe `79`, author `83`), and the picks landed on **the Salt Road** and
**Amara Okri** — *The Girl Who Sold the Wind*'s own pair. Decisions: **(1) honour the rolls as they
fell** — no re-roll because the pairing "felt samey"; the honesty rule (`operating-model.md`,
"reproducible, honest") outranks aesthetic second-guessing, and distinctness is enforced where it
belongs, in the design (new cast, new engine, new shape; no crossing — no crossing roll fired). An
author returning to their realm is the body-of-work move `author-personas.md` explicitly wants. **(2)
Step the skew thresholds down one notch** now both counts sit at 6: universe new-≤**50** (was 55 at 5
realms), author new-≤**55** (was 60 at 5). **Why:** `universe-system.md` and `author-personas.md` both
mandate a drift from lean-new toward reuse as the rosters fill; stepping ~5 points per count-increase
is gradual, auditable, and keeps fresh realms/authors common. **Rules in/out:** joins deepen a realm
via the codex (canon respected, seeds grown/tended) — never via plot dependence; a joined book still
stands alone and needs no other book to be read. Existing-picks draw uniformly over the alphabetical
roster (out-of-range draws re-rolled, recorded). The thresholds continue stepping down as counts grow;
the constants' home remains `operating-model.md` (`UNIVERSE_NEW_SKEW`).

## 2026-07-15 — Sequel-lock: first exercise, and recording it at planting

Planting *The Blindfold Act*, the **sequel-lock roll came up locked** (`5` ≤ ~10%) — the first time
in the farm's life. The grow runs had flagged this as broken ("no `sequelLock` field exists; every
completed book is eligible for the weekly roll forever"). Decision: **implement the producing half
now, at planting** — write `sequelLock: true` into the book manifest as the honest, durable record of
the roll — and leave the **consuming half** to the daily/sequel job. **Why:** the roll belongs to the
plant sequence (`operating-model.md` step 6), so the plant job is the right place to *record* it;
recording is inert and safe (the integrity check already accepts the `complete-no-sequel` state and
the shelf card already renders its "✦ Complete · no sequel" marking), so this advances the flagged gap
without a risky behavioural change. **Rules in/out:** a `sequelLock: true` book stays `growing` and
shows normal progress until its last chapter; the field does nothing on its own. What still needs the
sibling job (recorded as the open half): (a) on completing a locked book, set `state:
complete-no-sequel` rather than `complete`; (b) exclude locked books from the weekly sequel roll. Until
then the field is a truthful marker, not yet a working exclusion. The lock is per-**book**, not
per-universe — The Sawdust Circuit can still grow other, unlocked tales.

## 2026-07-15 — A grounded, non-magical realm is a valid universe

*The Blindfold Act* founds **The Sawdust Circuit** — a 1920s travelling-carnival America with **no
magic at all** (the only "magic" is the con). Decision: a real-world, historically-grounded setting
counts as a full universe, not a lesser one. **Why:** `universe-system.md` explicitly allows "our
world, bent," a universe is a *setting bible* (texture, figures, forces, code) rather than a magic
system, and the shelf's realms were **all speculative** — a grounded realm is exactly the range the
genre-range mandate asks for. **Rules in/out:** a universe needs a coherent bible and canon (here: the
code *with it and for it*, the show-as-sealed-family, the law-to-be-squared, the restrained register),
not a supernatural premise; grounded and speculative realms are peers on the shelf.

## 2026-07-10 — Reading the join/reuse rolls as a craft brief, not a shortcut

Planting *Every Lock but Hers* rolled **join an existing universe** (0.95) **+ reuse an existing
author** (0.93) — the combination most at risk of producing a re-skin. Decision: when both rolls
point at existing assets, treat them as a brief to find the *least* re-skin-prone pairing, not the
laziest. Here that meant deliberately **crossing an author against the grain of a universe** — Del
Marsh's hard-boiled caper voice writing the gentle Hollow Hours — rather than reusing that
universe's own author (Posy Fell) or a genre-matched voice. **Why:** it satisfies the mesh intent of
reuse (an author now spans two universes; the thinnest realm deepens to a tonally different pair)
while keeping the hard distinctness bar (new premise, voice, shape; unlike both the Hollow Hours'
other book and Marsh's own). **Rules in/out:** genre may repeat when a universe-join forces it (each
realm ≈ one genre), but the *book* must still feel unlike its shelfmates — carried by author-voice ×
form × premise, not by inventing a new realm to dodge the roll. The rolls stay honoured, never
re-rolled to avoid a hard combination.

## 2026-07-09 — Automated daily farm job (grow 2, plant every 3 days, auto-publish)

The farm loop now runs unattended via a scheduled job (Claude scheduled task `Fairy Fox Stories —
daily farm run`), firing **daily at midnight America/Denver** (cron `0 6 * * *`, UTC). Each run
**grows exactly 2** books and **plants one new book only when 3+ days have passed** since the last
planting, then **auto-publishes to `main`**. Grow count moved from *up to 5* to **exactly 2**
(tunable). **Why:** nothing was executing the documented cadence — the shelf hadn't moved since
v0.2.0 (2026-07-06) because grow/plant were policy-on-paper with no runner. Fairy Fox set the
cadence (2 daily, new book every 3 days) and **pre-authorized this job to release to `main`** so
the live site updates daily without manual approval. **Rules in/out:** the pre-authorization covers
*only* the scheduled job; manual/interactive runs still ask before releasing. The job needs the PC
on + desktop app open at midnight; if the device or OpenAI key is unreachable it **skips and
reports** rather than half-finishing. Grow and plant remain **separate cadences** (daily vs 3-day)
inside one daily runner — deliberately not welded into an every-3-days run.

## 2026-07-06 — Pseudo-authors as a first-class, meshed collection

Author-personas are a real `_authors` collection (like universes/characters/cities), not just
notes. On planting, **roll new-vs-existing author** (parallel to the universe roll): invent a fresh
persona or reuse one to build a body of work. Books tag `author: <slug>`; the reader + shelf show a
**byline**; author pages auto-list their books. **Why:** the owner wants the shelf to feel like a
collaboration of many passionate authors, meshed even between pseudo-authors (a returning author is
an author-level thread between universes). Byline is now live (was flagged future). Integrity check
validates the `author` link.

## 2026-07-06 — Content bar: dark but broadly accessible (no explicit)

Books may be dark, tense, sad, and frightening, but the shelf stays **broadly accessible and
is not walled behind a maturity gate**: **no** NSFW/sexual explicitness, gore, gruesome horror,
or obscenity. Benchmark: "dark but not adult-only" (*Carmen Sandiego* — real danger and darkness,
never graphic). **Why:** the owner wants wide reach without sacrificing creativity; restraint is
a craft tool, not a muzzle. Encoded in `CLAUDE.md` (landmines) and `craft/genre-range.md`;
enforced by author judgement + the content note.

## 2026-07-06 — Comprehensive sub-note collections (characters + cities)

Characters and cities/places are **first-class Jekyll collections** from the start (not just
universes), so the world cross-links fully: character pages list their books; city pages tie to
books and characters; universes aggregate all three. **Why:** the owner wants the meshing and
"expanding sub-notes" to be real, browseable, linked pages, not buried text. **Cost:** more
front-matter discipline; the integrity check enforces the links.

## 2026-07-06 — Jekyll, not static HTML

The site is built with **Jekyll** (like the fairyfox.io hub), not served as raw static HTML
(the model `fairyfox-games` currently uses). **Why:** the world is inherently relational
(books ↔ universes ↔ characters ↔ cities) and grows sub-notes over time; Jekyll collections +
Liquid turn that meshing and cross-linking into data instead of hand-maintained HTML, and align
with the hub. Ruby 3.3 / Jekyll 4.4 / Bundler are installed locally, so preview is
`bundle exec jekyll serve`. **Trade-off accepted:** a build step (no `.nojekyll` verbatim
serve), and the "one fully self-contained, liftable folder per unit" purity softens — a book's
*content* stays grouped and portable (Markdown), but rendering is site-level. Deliberate
exception to the mesh's usual per-unit self-containment, made with the owner.

## 2026-07-06 — Form-first books (short story · novelette · novella · rare novel)

Each book **rolls its form**, which sets both length band and structure; word count is a
consequence of form, not the primary knob. **Why:** the forms are genuinely different machines
(POV budget, subplot tolerance, chaptering, pacing); planning to the form is what makes a book
well-built. Novel is **rare (~5%)** but held to the same quality bar. See `reference/craft/forms.md`.

## 2026-07-06 — Collection (monorepo), greenfield, on Jekyll

Set up per the hub `new-project-setup` runbook as a **collection/monorepo** (many books in one
repo) rather than one-app-per-repo — the runbook's allowed deliberate exception, agreed with the
owner (mirrors `fairyfox-games`). Bootstrapped **greenfield** (a prior unauthorized scaffold was
cleared first). Key `fairyfox-stories`, public, MIT.

## 2026-07-06 — First-person, real-character mandate

Every book is **first person**, following a real, flawed, agency-driven main character — never a
hollow reader-insert (that theory is disproven; see `reference/craft/character.md`). A standing
craft constraint, not per-book.

## 2026-07-06 — OpenAI as the writing/art service

Prose and art (cover + chapter headers) come from OpenAI via local tooling keyed in `.env`
(git-ignored); art is generated budget-consciously. The published site calls no API at read
time. Revisit only if a better fit appears.
