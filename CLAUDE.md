# Fairy Fox Stories — AI Context

An **AI-managed story farm**: a growing library of short interactive **books** — genuine
fiction, fully pre-planned then written a chapter at a time — and, beneath them, a growing
set of **universes/realms** the books live in. A new book is *planted* at most once every
three days; existing books are *grown* daily. Built by Fairy Fox (github.com/1fairyfox).
Part of the fairyfox.io project mesh; **contributions welcome** (public repo). Served at
`fairyfox.io/fairyfox-stories/`.

Sibling to `fairyfox-games` — same disciplined mesh shape (living notes, git-flow, static
site, self-hosted fonts, accurate legal), different craft: **fiction, not games.**

## Start Here

Read `notes/status.md` first. Then the operating model — **how the farm actually runs** —
in `notes/reference/operating-model.md`. The craft you write to lives in
`notes/reference/craft/`.

| File | What's in it |
|------|-------------|
| `notes/status.md` | **Current state** — start here |
| `notes/reference/operating-model.md` | The farm loop: cadence, picking, sequels, universe rolls, the RNG rules |
| `notes/reference/craft/` | **The body of knowledge** — forms, structure, character, voice, pitfalls, what makes fiction good |
| `notes/reference/universe-system.md` | How universes/realms work (tags, spans, crossings) |
| `notes/reference/reading-experience.md` | The bookshelf + immersive reader design |
| `notes/sessions/` · `notes/version/` · `notes/decisions/` · `notes/plans/` | Living notes (see `notes/README.md`) |

## The farm, in brief (full detail in `operating-model.md`)

- **Plant a new book at most once every 3 days.** A book begins as a **complete public
  blueprint** — premise, form, main character, cast, universe, arc, and a real
  chapter-by-chapter plan — *before a word of prose is written*. The blueprint ships next to
  the book as an open, spoiler-forward "what you're getting into" (informed consent).
- **Roll the form first** (short story · novelette · novella · — rarely — novel). The form
  sets the length band **and** the structure the book is written to (`craft/forms.md`).
- **Grow books daily: pick up to 5, write exactly one whole chapter each.** One chapter at a
  time, but always a *finished* chapter (assembled across generation segments if needed).
  Chapter/paragraph length is a craft call, never a formula.
- **Pick by "least-tended-first" blend** (least-complete + least-recently-grown), with a
  **15–20% pure-random override** so the shelf never feels mechanical.
- **Sequels are unplanned:** a weekly roll, ~25% chance per eligible completed series; some
  books are pre-marked **"complete · no sequel"** (a rare marking).
- **Universes:** each new book rolls new-vs-existing. A universe spans time periods; seldom,
  characters cross within a universe (even across eras); very seldom, universes bridge.

## Critical Things Not to Get Wrong

- **Best craftsmanship, always — this is the highest responsibility.** Every book, from a
  1,500-word short story to a rare 100k novel, is fully planned and genuinely well written:
  a real, flawed, first-person main character (never a hollow reader-insert — that idea is
  disproven, see `craft/character.md`), meaningful choices and consequence, earned endings.
  No filler, no cheese, no near-identical padding. If it isn't excellent, it doesn't ship.
- **Plan the whole book before writing it.** The blueprint maps the entire arc and every
  chapter. Pantsing is the #1 newbie pitfall (`craft/common-pitfalls.md`).
- **Write to the rolled form.** A novella is structured differently from a short story or a
  novel. Know the form deeply (`craft/forms.md`) before planning the book.
- **Books are self-contained + liftable.** One folder under `stories/<slug>/`, relative
  paths only, **no reaching across books**; a universe is a *tag + shared codex*, never a
  parent folder a book is nested in. A book folder could be lifted out whole.
- **The book is the focus, not the collection.** The shelf shows individual books like a
  library — **not** bins grouped by universe. The universe is quiet context on a book.
- **The site is Jekyll** (like the fairyfox.io hub), built to static output and served by
  GitHub Pages. The world meshes as **collections** (books, chapters, universes, characters,
  cities) that cross-link via front-matter; prose is Markdown. Preview with
  `bundle exec jekyll serve`. `notes/`, `assets/references/`, `scripts/` are build-excluded.
- **Prose comes from the writing service (OpenAI), keyed via `.env` (git-ignored).** Art
  (cover + chapter headers) via the same, **budget-consciously**. The published site calls
  **no** API at read time and stays zero-third-party.
- **Keep the legal docs accurate** (`legal/{privacy,terms,cookies}.html`). They must match
  what the site actually does — no accounts, reading progress + reader prefs in
  `localStorage` only, no cookies/analytics/tracking, self-hosted fonts, static Pages. A
  data-practice change updates the docs **in the same change**, with a bumped "Last updated"
  date. Fonts stay **self-hosted** (`assets/fonts/`).
- **Content transparency + accessibility.** Books range across genres and can go dark, tense,
  or sad; the blueprint and a quiet content note give informed consent up front. But the shelf
  stays **broadly accessible — not walled behind a maturity gate**: no NSFW/explicit, gore,
  gruesome horror, or obscenity. The bar is "dark but not adult-only" (think *Carmen Sandiego*):
  real danger and darkness, never graphic. Restraint is a craft tool, not a loss of edge — see
  `craft/genre-range.md`.
- **Never bump MAJOR** (`→ 1.0.0`) — Fairy Fox's call only.

## Standing Rules — the books are first-class citizens (a standing instruction)

These are **not** throwaway drafts. They are first-class works that earn ongoing investment:

- **The shelf widens and deepens.** Beyond planting new books, existing books are **grown a
  little every day** — the daily job advances real chapters, not just adds titles.
- **Every book carries real craft** — a premise with pull, a living cast, a voice of its own,
  a form written to its structure. Passion and care are visible on the page.
- **Stay simple where it counts — clean, immersive reading is the hard constraint.** Depth is
  story and character, never clutter. The reading experience stays polished.
- **New books are genuinely distinct** — new premise, voice, genre, shape; never a re-skin.
  Check `stories/` and the pitched ideas first.
- **It's "Stories."** Reading lives at `fairyfox.io/fairyfox-stories/` (GitHub Pages).
- **Header conventions.** The landing mirrors the fairyfox.io chrome. **Stories** sits right
  of Projects; **About is always last**. The brand/Home link is the way home — no redundant
  "← Back to Fairy Fox".

## Build / Run

You CAN build, test, run, commit, and push — via PowerShell on the local machine (git +
`gh` authed as `1fairyfox`; Node 18+). CI runs tests on every push and PR; Pages deploys
on push to `main`.

**Tooling (non-negotiable, per `notes/reference/agent-tooling.md`):** use **PowerShell + the
file tools (Read/Edit/Write)** for everything — **never the Cowork bash sandbox**, which
mangles line endings and can't touch `.git` here. **Execute** the work yourself. A root
`.gitattributes` (`* text=auto eol=lf`) forces LF.

```sh
# read locally (Jekyll build; Ruby 3.3 / Jekyll 4.4 / Bundler installed)
bundle install                  # first time
bundle exec jekyll serve        # open http://localhost:4000/fairyfox-stories/

# integrity checks (zero deps, Node built-in runner)
npm test                        # runs check-stories + any *.test.mjs, from repo root
```

## Default Workflow — Do These By Default (a standing instruction)

**Plan before you execute (`notes/reference/planning.md`).** For non-trivial work write a
short plan in `notes/plans/` first. A book's blueprint *is* its plan.

After changes, run this loop **without being asked**:

1. **Run the checks** (`npm test`) — structural integrity (manifest/blueprint/universe/
   progress). **Preview reading/visual changes in Chrome before shipping** — serve over HTTP,
   read the changed pages, hard-reload (Ctrl+Shift+R), self-critique (typography, drop cap,
   overflow, progress bar, nav, responsiveness). Never release a visual change unseen.
2. **Commit + push on `dev`**, staging specific files (never `git add -A`). The **changelog
   entry rides inside the commit** (top of `notes/version/YYYY-MM.md`), and **bump `VERSION`**
   when warranted (PATCH default, MINOR for a milestone like a new book, never MAJOR).
3. **Get Fairy Fox's explicit approval before releasing to `main`** — release deploys Pages.
   Commit/push to `dev` freely, then stop and ask. When approved, release the git-flow way:
   `main` advances only by a `--no-ff`, **tagged** merge via **PR** (`main` is
   branch-protected): `gh pr create --base main --head dev` → `gh pr checks --watch` →
   `gh pr merge --merge`, then hand-**tag** `vX.Y.Z` and push it. `release.yml` reacts to the
   tag.
4. **Back-merge invariant — `dev` must contain `main`.** After every release,
   `git checkout dev && git merge --ff-only main && git push origin dev`.

**Hard safety rules:** never `push --force` / rewrite pushed history; never `reset --hard` /
`rebase` / `clean -fd` / delete a branch without an explicit request. Inspect `git status`
before and after. Full rules: `notes/reference/git-workflow.md`.

## Maintaining the Notes — Your Responsibility

| Trigger | Action |
|---------|--------|
| Did work worth recording this session | Append to today's `notes/sessions/YYYY-MM/YYYY-MM-DD.md` |
| Made a substantive commit | Inline changelog entry atop `notes/version/YYYY-MM.md`, same commit |
| Health / next changed | Update `notes/status.md` |
| Learned/refined craft | Update the relevant `notes/reference/craft/` note (it's a living body of knowledge) |
| Made / rejected a decision | `notes/decisions/architecture.md` / `rejected.md` |
| A change warrants a version | Bump `VERSION`, same commit |
| Changed data practices / added a user-facing surface | Update `legal/*.html` + "Last updated", same change |
| Planted a new book | New `stories/<slug>/` (manifest + blueprint + chapters + book-notes + reader); list it on the shelf + root README; tag/attach its universe |

## Cross-project standards & checking the fairyfox system for updates

This project is a **node in the fairyfox system** (the hub mesh): it pulls shared standards
on request — see `notes/reference/cross-project-sync.md`.

**When the user asks you to check *the fairyfox system* for updates** — sync the standards,
get the latest, pull a particular standard/runbook — treat it as the check-for-updates flow.
**To invoke it the request must carry the word "fairyfox"** (normally "the fairyfox system",
or a *fairyfox*-prefixed variant) *paired with* an update/sync intent (check for updates ·
what changed · sync · refresh · pull the latest). Generic handles — "the hub", "the mesh",
"the standards", a bare "system", or an update verb alone — do **not** qualify.

The default is **check, report, then wait**: refresh the read-only system clone under
`assets/references/`, diff it against what this project adopted, and **report what changed +
what adopting it would touch — then stop.** Apply nothing until the user says go ahead.

**Exception — pre-authorized changes.** If an active entry in the hub's
`authorizations.yml` `covers` the change, the user already gave the go-ahead at the system —
apply directly, skipping only that redundant pause; still reconcile, still write the process
report, still verify before *and* after. If verification can't complete, fall back to
check-report-wait.

**After running any fairyfox system procedure, write a process report** in
`notes/fairyfox-reports/YYYY-MM-DD-<procedure>.md` (from the hub's `fairyfox-report.md`
template): what was done, what was rough, suggestions. The hub reads these to improve the
system.

**Guardrails:** on-request only (anti-recursion); reference clones are read-only and
git-ignored; never apply changes or rewrite history without an explicit go-ahead; reconcile
with local edits, don't clobber them.

> Naming: the user calls it **the fairyfox system**; the website calls it the **hub**. Same
> fairyfox.io mesh.
