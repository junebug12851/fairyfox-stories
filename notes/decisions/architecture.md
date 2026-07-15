# Architecture Decisions

Newest first. Each: the decision, why, and what it rules in/out.

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
