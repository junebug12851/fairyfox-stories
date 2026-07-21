# Project Status

_Current state only._ For history see `sessions/`; for the changelog see `version.md`.

**Version:** `0.7.0` (single source of truth: repo-root `VERSION`).

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

**Reader chrome (v0.6.0):** the shared **coins** engagement layer is now in the reader chrome — a coin
counter beside the "Aa" button (first-view-today earns; reading pages add a read-time chip, a read-through
bonus, and a rare hidden coin), vendored verbatim from the shared-chrome master (`assets/coins.js`) with the
coin CSS ported into `assets/reader.css`. Local `fairyfox:coins:a` disclosed in Privacy/Cookies, no-value
clause in Terms, hub `/legal/coins/` linked. This was **Phase 2** of the fairyfox-standards adoption (Phase 1
= the standards batch in v0.5.6); built + previewed in a connected-Chrome session.

## The shelf (as of v0.7.0)

| Book | Form | Progress | Last grown |
|------|------|----------|-----------|
| ✅ **The Two-O'Clock Launderette** (magical realism · sequel: *The One-O'Clock Bus*) | short story | **3 / 3 — complete** | 2026-07-14 |
| ✅ **The Girl Who Sold the Wind** (fable · **sequel pending**) | novelette | **5 / 5 — complete** | 2026-07-17 |
| ✅ **The Cartographer of Decks** (SF) | novelette | **6 / 6 — complete** | 2026-07-17 |
| **Every Lock but Hers** (magical realism) | novella | 6 / 11 | 2026-07-21 |
| The Wintering House (gothic) | novella | 7 / 11 | 2026-07-18 |
| The Cinderwick Job (caper) | novelette | 6 / 7 | 2026-07-18 |
| The Blindfold Act (mystery · sequel-locked) | novelette | 3 / 6 | 2026-07-19 |
| The Hundredth Wind (fable) | novelette | 2 / 7 | 2026-07-20 |
| **The One-O'Clock Bus** (magical realism · **sequel to *Launderette***) | novella | 1 / 10 | 2026-07-21 |

**Nine books — three `complete`, six `growing`.** Latest run **07-21 second run (v0.7.0, plant)**:
**The One-O'Clock Bus** — the farm's **first sequel plant**, taking the first of the two queued
sequel windows (sequel-pick override `68` → no override; staleness picked *Launderette*, tended
07-14, over *Girl*, 07-17). Magical realism **novella** (form `74`; word-pick `29` → wordCap 24,000;
10 chapters, finale costed ~1.5×), the Hollow Hours' third book, by returning author **Idris
Okonkwo-Vance** (author roll `67` → existing, pick `4` — second author-crossing-realms move, and
pointedly not the parent's author). Sequel-lock `34` → not locked. Abel Mensah, eleven years on the
Route 9 night service, two records of every night — the official log that lies beautifully and the
blue notebook that doesn't — vs. auditor Vera Brandt, who is right about records and wrong about
this route. New tale in the realm, zero plot dependence (`sequelTo:` first used in a manifest);
Nadia Okafor gets one nod-sized ch.5 scene. Ch.1 "The Route as Printed" written; cover + header
generated and viewed clean; full audit in `sessions/2026-07/2026-07-21.md`. Earlier the same day,
**07-21 (v0.6.1, grow)**: *Every Lock
but Hers* **ch.6 "The Job She Can't Do"** (6/11) — no override (roll `21` vs ≤18), blend leader at
**0.773** as forecast. The moral hinge: the Marsh Lane closer is Dani and her kid; Dani never opens
the door and is never named (the thrown bolt, the chained buggy, the drawing taped facing out); Nell's
**first refusal in fifteen years**, declining the free "occupied" technicality with it; new trade-lore
(*a bolt is a door's mind made up*); the hollow hour braided in without firing (keys on the dash, the
call at ten past two); Mar breaks her three-year "there is no—" cut-off deliberately and summons Nell
in daylight; Nell leaves her own bolt undrawn, first night in three years. **And the weekly sequel
roll fired twice — a farm first:** *Launderette* `13` and *Girl Who Sold the Wind* `9` (both ≤25);
*Cartographer* `37`, cold. Both queue as **pending sequel plants** (see Next). Full audit in
`sessions/2026-07/2026-07-21.md`. Before that, **07-20 (v0.5.6, grow)**: *The Hundredth
Wind* **ch.2 "The Ear of the House"** (2/7) — no override (roll `21` vs ≤18), blend leader at **0.929**
(shelf's highest incompleteness) exactly as 07-19's note forecast. The road east: Basri's **three laws**
in patter — the **proving law planted verbatim** as the ch.7 hook ("proved once at the buyer's own
threshold … the proving is the delivering — no threshold, no sale," tied to *bottled and delivered*);
**Noor's ear** made concrete/trained (the vault's knocking bottles; her wind-names Sigher/Presser/Little
Heresy; "I did not know it would feel like a hand"); the **opened town** teaching the wind's doubleness
by example (a marriage broken beside the grain-factor's aired short-weight scale clearing a long-blamed
dead girl — "it doesn't choose … it only opens"). Stopper beats held; Emir's grief + Nuru kept for
ch.5/6. This release also **carries the pending v0.5.5 fairyfox-adoption Phase 1 commit to `main`** (was
on `dev`, headless-green, zero visual change) via the standing dev→main PR #26. Sequel roll not due
(07-21). Full audit in `sessions/2026-07/2026-07-20.md`. Before that, **07-19 (v0.5.4, grow)**: *The
Blindfold Act* **ch.3 "The Tells"** (3/6) — no override (roll `49`), blend leader at **0.833**; the false
lead spent at cost (the coin take in Perro's kerosene chest; Sonora clears him publicly — "You could
have asked me quiet"). And **07-18 second run (v0.5.0, plant)**:
*The Hundredth Wind* — fable novelette (wordCap 14,000, 7 chapters), and **two farm-firsts in one
draw**: the first **universe-join** (roll 79 → existing; pick → **the Salt Road**, now the first realm
with two books) and the first **author-reuse** (roll 83 → existing; pick → **Amara Okri** returning to
her realm with a new, unrelated tale — no crossing roll fired, all-new cast). Basri Yel, ninety-nine
winds caught and a legend built on the one he didn't, hired to bottle the wind that opens shut things —
which answers only to *the thing you will not say*. Full blueprint public; ch.1 "The Ninety-Ninth"
written; skew thresholds stepped down (new-≤50 universe / ≤55 author) per `decisions/`. Earlier the
same day, **07-18 (v0.4.3, grow)**: three chapters, a
quiet middle-of-the-book run (nothing finished, nothing one chapter from done) — *Every Lock but Hers* ch.5
"What It Costs" (5/11), *The Wintering House* ch.7 "The Hand at the Fire" (7/11), *The Cinderwick Job* ch.6
"The Double-Cross" (6/7). **No override** (rolls `32`/`77`/`71` vs. the ≤18 threshold) — a clean mechanical
draw straight down the blend: *Every Lock* **0.818** (finally cashes the slot it missed by 0.015 on 07-17),
*Wintering* **0.727**, *Cinderwick* **0.643**. *The Blindfold Act* (0.583) missed the third slot — it led
07-17 at a record 0.917 but was grown that day, so its staleness term is only 0.5 against the others' 1.0;
the blend correctly rotated it back for one run (it returns to the front next run — highest incompleteness
on the shelf). Full audit in `sessions/2026-07/2026-07-18.md`.

## Next

- **fairyfox adoption 0.16.1→0.20.2 — Phase 1 released to `main` (rode v0.5.6, 07-20); Phase 2 owed
  (browser).** Adopted the
  headless batch: 10 new standard notes + 3 refreshed (compliance/process-reports/legal-docs), the
  **release-by-default** posture (replaces approval-first; a visual change still holds for its Chrome
  preview), and the **repo-hygiene gate** (`scripts/check-{links,tidy}.mjs`; `check-links` in
  `npm test` + CI). **Phase 2 (needs a connected Chrome):** the **coins** layer + reader **read-time /
  read-through / hidden-coin**, chrome bundle 2.2.1 (reader story-only gating on book/chapter pages,
  Farms dropdown already owed), and the legal **`/legal/coins/`** page + coins/clear-reset disclosure
  in `legal/*.html` (ships *with* coins — can't disclose an unshipped feature). Report:
  `notes/fairyfox-reports/2026-07-19-adopting-updates.md` (hub_version 0.20.2). Rides the standing
  deferred-eyeball debt below.
- **v0.5.1–0.5.3 released to `main`** (hub chrome adoption; grow-cadence + art backfill; legal-page
  reader controls) — but the **browser pass on the 0.16.0 chrome is still owed**: Farms dropdown
  desktop+mobile; reader panel un-locking line-spacing/width on a chapter (and now the legal pages),
  locked-with-note off a story. It rides the standing deferred-eyeball item below. Report:
  `notes/fairyfox-reports/2026-07-18-adopting-updates.md`.
- **Needs Fairy Fox — live homepage 404 (GitHub-side).** `fairyfox.io/fairyfox-stories/` serves empty/404
  site-wide while `1fairyfox.github.io/fairyfox-stories/` works and `fairyfox.io/fairyfox-games/` works. Local
  build is clean — it's GitHub-Pages custom-domain routing, tied to the account rename (apex `fairyfox.io` is
  on repo `junebug12851.github.io`, no longer a user site under `1fairyfox`) and an in-flight
  DigitalOcean→Namecheap DNS move. Re-running the Pages deploy did not help. Fix is DNS + Pages-settings side:
  finish the Namecheap records (GitHub A records `185.199.108–111.153`, or a `1fairyfox.github.io` CNAME) and
  re-verify the domain; the durable structural fix is renaming the user-site repo `junebug12851.github.io` →
  `1fairyfox.github.io`.

- **Sequel queue: 1 of 2 planted.** The 07-21 double-fired roll queued two sequel plants. The
  **Launderette sequel is now planted** (*The One-O'Clock Bus*, v0.7.0 — this run); **the *Girl Who
  Sold the Wind* sequel takes the next planting window, eligible on or after 2026-07-24.** It stays
  a **new tale in her realm (the Salt Road), not a continuation** — Amara Okri's call whether the
  byline returns (note the realm+author pair already recurred once, in *The Hundredth Wind*; the
  design should be distinct from both). While its sequel is growing, the *Launderette* series stays
  out of the weekly roll (as does *Girl* while pending), leaving *Cartographer* the only roller.
  **Next weekly roll due on or after 2026-07-28.**
- **The One-O'Clock Bus is at 1/10 — ch.2 "The Auditor" is next**: Vera Brandt in daylight, her
  fair creed given full weight; Priya Nair assigned to Abel's cab the same week — two watchers, one
  who can't be lied to and one who shouldn't be. Ch.1 canon to honour is in the book-notes
  continuity ledger (the fuel-island clock, Bus 17's terms, the hour's spoken-truth fare, Corvus
  Road's four-words-a-night entry, "thirteen minutes late is a defensible lie," the planted
  aphorism about self-auditing for ch.8–9). Chapter map + style dials in
  `notes/books/the-one-oclock-bus/book-notes.md`.
- **The Blindfold Act is at its midpoint (3/6, grown 07-19) — ch.4 "The Understudy" is next**, the
  complicity beat: no new clue needed (ch.3 closed on the class-roll narrowing and the lamp put out) —
  only the courage to stop crediting the alibi Sonora wrote for the girl. The relock-trick + the stove
  tell converge; the comfortable-monstrous option opens. Ch.3's new canon to honour: Perro cleared but
  ruined-small ("You could have asked me quiet"), Bruno cleared but not brought back inside (ch.6 must
  remember him at the tent flap), Sonora's standing with Dell/the wall now burning.
- **Cinderwick is one chapter from done.** At 6/7 the caper's finale, **ch.7 "The Name,"** is next
  whenever it's picked — Juno wins not by out-thieving Crane but by trusting Kit out loud and giving up
  the solo score; the Nightingale ends somewhere Crane can't reach; a door left ajar, not a sequel hook.
  Ch.6 left her cornered in the sprung cellar with the fourth thing spent, Kit revealed loyal, and Crane's
  real want (her, not the bird) named — the trust-not-a-plan move is all that's left. **First completion
  since 07-17 will land here.**
- **The two novellas are heading into their turns.** *The Wintering House* (7/11) has finished its
  "Cracks" section and next enters **The Secret (ch.8–9)** — Agnes learns the full shape of what the
  family keeps warm and that they mean her to become the next who tends it. *Every Lock but Hers* (6/11,
  grown 07-21) next hits **ch.7 "What Mar Holds"** — daylight, Mar's office, the debt revealed (Mar
  covered for Nell the night Theo left; the lock on Nell's life is on the *inside*). Ch.6 set it up
  with no stalling left: Mar has already decided to spend her truth. Continuity to hold: Nell's own
  bolt left undrawn, keys-on-the-dash, the refused Marsh Lane job passing to a worse firm (Dani's
  clock runs toward ch.11). Ch.7 brief in `notes/books/every-lock-but-hers/book-notes.md`. Both
  novellas are mid-book and will stay in the blend's rotation for several runs yet.
- **Next plant** eligible on or after **2026-07-24** (last plant *The One-O'Clock Bus* **07-21**) —
  and it belongs to the queued *Girl Who Sold the Wind* sequel (above). The finale-at-~1.5×
  word-pick costing was applied again this plant and stays standing.
- **The Hundredth Wind is at 2/7 (grown 07-20) — ch.3 "The First Try" is next.** Mastery fails: the
  perfect stand, the grandest name Basri knows spoken into the glass — and the wind opens his coat
  instead, taking **the cracked stopper** from his breast pocket (planted ch.1, hand-beats held ch.2).
  Failure with teeth: the wind now has his scent and **stops running its own circuit to run his**,
  toward the towns of his young years. Canon from ch.2 to honour: the **proving law is on the page
  verbatim** (spring it at the House's threshold in ch.7); Noor's **trained ear + wind-names**
  (Sigher/Presser/Little Heresy) and her **want** ("feel like a hand"); the town's **doubleness**
  ("it only opens"). Still guarded: Emir's grief (ch.5), Nuru's kinship (ch.6). It remains the shelf's
  highest incompleteness — it and *Every Lock* (0.773) lead the blend's next runs. Chapter map + style
  dials + "Ch.2 — new canon" in `notes/books/the-hundredth-wind/book-notes.md`.
- **Grow-count RESOLVED (07-18, Fairy Fox):** the daily grow rate is now **exactly 1 book/day** (one
  whole chapter, single least-tended book) — the old 2-vs-5-vs-3 discrepancy is closed, one number
  wins everywhere (`operating-model.md`, `CLAUDE.md`, `craft/serialization.md`, and the
  `fairyfox-stories-daily` task prompt all say 1). Plant cadence unchanged (≤1 every 3 days). See
  `decisions/architecture.md` (2026-07-18).
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
- **Deferred eyeball (07-11 → 07-21):** Chrome wasn't connected on most recent runs (eleven grow runs + the
  07-15, 07-18, and 07-21 plants — the 07-18 plant adds the *Hundredth Wind* card/landing/blueprint/ch.1 to the
  debt, 07-19 adds *Blindfold* ch.3, 07-21 adds *Every Lock* ch.6 **and the whole of *The One-O'Clock
  Bus* (card/landing/blueprint/ch.1 + its first `sequelTo` marking)**), so new pages were verified
  structurally (`npm test`) and against
  the built Jekyll HTML but not read in a browser. All are prose + front-matter changes with no template or
  CSS edits — but the debt is now **twenty-seven grown chapter pages + the *Blindfold Act* card/ch.1 + the
  three completed-book cards** deep, worth one hard-reload pass over the shelf and the new pages next time a browser is up
  (typography, drop cap, overflow, the progress bars — now 45% / 64% / 86% on the three grown books —
  prev/next nav at a book's true last chapter, the **titled fallback cover** on the art-less *Blindfold*
  card, responsiveness). The `complete` state was headless-verified on 07-14 and renders right; the three
  `mark-done` badges were re-confirmed in built HTML on 07-17. No `state`/template change shipped 07-18.

## Health

| Area | Status |
|------|--------|
| Repo + branches (dev/main) | ✅ public repo on GitHub; `dev`/`main` in sync, released through v0.5.6 |
| Notes + craft body of knowledge | ✅ written (`reference/` incl. `craft/`) |
| Architecture decided | ✅ Jekyll · form-first · collection · comprehensive sub-notes (`decisions/`) |
| Jekyll scaffold (collections/layouts/reader) | ✅ built + previewed in Chrome |
| Books on the shelf | ✅ **9 on the shelf — 3 complete, 6 growing** (caper · cosy magical-realism · SF · gothic · fable ×2 · night-city magical-realism novella · carnival mystery · night-bus magical-realism novella); *The Two-O'Clock Launderette* **finished 07-14**, the farm's first completed book; *The Girl Who Sold the Wind* + *The Cartographer of Decks* **both finished 07-17**; *The Hundredth Wind* **planted 07-18** — first universe-join + first author-reuse; *The One-O'Clock Bus* **planted 07-21** — the farm's **first sequel** (Hollow Hours = first three-book realm) |
| Authors / universes / characters | ✅ 6 author-personas (Amara Okri and **Idris Okonkwo-Vance** each have two books; Idris is the second author to span realms, 07-21), 6 universes (the Salt Road two books; **the Hollow Hours three** — first three-book realm, 07-21), 21 character pages (Abel Mensah + Vera Brandt + Priya Nair added 07-21) — meshed + bylined |
| Cover & chapter art | ✅ **all 9 books have a cover + ch.1 header** (gpt-image-1 via `scripts/generate-art.mjs`) — *The Blindfold Act* and *The Hundredth Wind* backfilled 07-18. The **PLANT task now auto-generates** cover+header for every new book (headers at 1536×1024, not dall-e-3's 1792×1024), so no more text-only fallbacks |
| Integrity check + CI | ✅ `scripts/check-stories.test.mjs` green (**6 checks** — state/sequel-lock consistency added 07-17), runs on push/PR |
| GitHub Pages (`fairyfox.io/fairyfox-stories/`) | ✅ live (deploys on tagged release to `main`); last release **v0.7.0**, 2026-07-21 |
| Hub registration | ⛔ pending (hub-side edit) |
| Writing/art tooling (`.env` OpenAI key) | ✅ `.env` key present; art via `generate-art.mjs` (prose hand-drafted for now) |
| Self-hosted fonts / no third-party | ✅ vendored from the mesh |
| Legal docs | ✅ Privacy/Terms/Cookies re-scoped to Stories (verify wording on preview) |
