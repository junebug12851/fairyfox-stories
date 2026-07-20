---
date: 2026-07-19
procedure: adopting-updates
node: fairyfox-stories
outcome: partial
hub_version: 0.20.2
hub_commit: 697bc5c
---

# Process Report — adopting-updates, 2026-07-19

> A full, honest account of running a fairyfox system procedure. The point is to
> improve the system — so say what was rough even if the run succeeded. Voice: direct,
> matter-of-fact, no hype. Standard: `hub/standards/process-reports.md`.

## Outcome in one line

Checked the fairyfox system (mirror `0.16.0 → 0.20.2`), then — on the owner's explicit "adopt
everything + switch to release-by-default" — adopted the whole headless-verifiable batch (Phase 1:
13 standards, the release posture, the repo-hygiene gate) and deferred the visual coins / reader
read-time / chrome 2.2.1 feature to a Phase 2 browser session, since a UI change can't ship unseen
and Chrome wasn't connected.

## What was done

- **Refreshed the hub mirror.** `assets/references/fairyfox.io` fast-forwarded cleanly
  `5803ba3 → 697bc5c`, hub `VERSION` `0.16.0 → 0.20.2`. Only the git-ignored mirror was touched.
- **Scoped the span from the last report.** Last-adopted anchor `hub_version: 0.16.0` (the
  2026-07-18 adopting-updates report). Read the hub changelog across `0.16.1 → 0.20.2` first, then
  opened the specific standards it pointed at.
- **Glanced at the node's own tree** (check step 3): clean, on `dev`, in sync with `origin/dev` —
  nothing alarming.
- **Confirmed the pre-authorization.** `adopt-standards-by-default` (standing) covers all of
  `hub/standards/` + `hub/templates/`, so the standards/templates batch is adopt-by-default. But the
  **verification floor** can't be met for the visual pieces here (no browser), so per the runbook I
  fell back to check-report-wait **for those** and reported the full picture to the owner before
  acting. Owner then said adopt everything + release-by-default.
- **Adopted 10 new standard notes** into `notes/reference/` (copy, verbatim — matching this node's
  existing convention of mirroring hub standards): farm-operating-model, coins, testing,
  engineering-quality, repo-hygiene, docs-lifecycle, research-capture, working-rhythm,
  self-hosted-assets, maintenance-sweep.
- **Refreshed 3 changed standards** (verbatim, additive-only diffs): compliance, process-reports,
  legal-docs.
- **Adopted the release-by-default posture** into `notes/reference/git-workflow.md` (the new
  "Release posture — the brand rule" block + a node-divergence note recording the switch) and
  `CLAUDE.md` Default Workflow step 3, replacing the old approval-first stance.
- **Wired the repo-hygiene gate**: ported `scripts/check-links.mjs` (into `npm test` + CI) and
  `scripts/check-tidy.mjs` (`npm run tidy`, session-end). Adapted `check-links` SKIP to this repo:
  skip `notes/reference/` (the verbatim hub-standard mirror carries hub-relative links by design)
  and the Jekyll content collections + `stories/` (their `.md` links are Jekyll permalinks, not
  filesystem paths). Green over 44 doc files.
- **Swept a stale ref** (docs-lifecycle): `package.json` repository URL `junebug12851 → 1fairyfox`.
- **Verified headlessly:** the 6 structural tests pass; `check-links` green; Jekyll build clean.
- **Recorded** the changelog entry, session log, `VERSION 0.5.4 → 0.5.5`, status, and this report.

**Deferred to Phase 2 (browser session):** coins.js + read-time/read-through/hidden-coin into this
node's own chrome, reader story-only gating on book/chapter pages, and the legal `/legal/coins/`
page + coins/clear-reset disclosure in `legal/*.html` (the legal-docs *standard* is adopted now, but
the node **pages** can't disclose coins until coins actually ships — "accurate to the code").

## What went well

- The changelog-first scoping worked exactly as the runbook intends: the append-only hub log across
  the version span told the whole story; file diffs were only needed to confirm the additive blocks.
- Every changed standard was a **clean additive mirror** of the node's copy (single-hunk diffs, no
  local divergence), so `compliance`/`process-reports`/`legal-docs` could be copied wholesale — fast
  and safe.
- The pre-authorization + verification-floor interaction is well specified: it was clear that
  standards adopt by default **but** the visual pieces fall back to check-report-wait when they
  can't be verified. That distinction did real work this run.

## What went wrong / friction

- **The repo-hygiene link gate needs per-repo scoping that the standard under-signals.** Out of the
  box `check-links` false-positived on (a) this node's verbatim-adopted hub standards, which
  legitimately carry hub-relative links (`docs-site/`, `../templates/`, `../../_data/…`) that resolve
  at the hub and not here, and (b) Jekyll content collections whose `.md` files link by **permalink**
  (`[…](blueprint/)`), not filesystem path. Both are correct-by-design in the node but read as broken
  to a naive file-existence check. The script's one-line "Adapt SKIP to your repo" is easy to miss;
  a node that wires it unthinkingly gets a red wall of ~50 false positives on first run.
- **The legal brand-minimum coupling isn't spelled out.** The legal-docs brand minimum tells a node
  to disclose coins — but a node that hasn't shipped coins yet must NOT (rule 2, accurate-to-the-
  code). So the *standard* and the *pages* adopt at different times. It took a beat to see that the
  legal-page edits belong with the coins feature, not the standards batch.
- **A big multi-milestone span (0.16→0.20) mixes headless-safe standards with a browser-gated visual
  feature in one adoption.** The runbook's "adopt-by-default vs fall-back-to-wait" is per-*change*,
  which is right, but there's no explicit guidance on **phasing** a single adoption when part of it
  is shippable now and part is browser-gated. Splitting into Phase 1 / Phase 2 was the obvious call
  but was invented locally, not prescribed.

## Suggestions / feedback

- **`repo-hygiene.md` / `check-links.mjs`: ship a fuller default SKIP and call out the two classic
  false-positive classes** — (1) directories that hold verbatim-adopted external docs with foreign-
  relative links, and (2) static-site content collections whose links are permalinks. A sentence in
  the standard ("scope the gate to your *authored prose*, not adopted mirrors or permalinked content")
  would save every node the same discovery.
- **`adopting-updates.md`: add a short "phasing a mixed adoption" note** — when one span carries both
  headless-verifiable standards and a browser-gated visual change, adopt+ship the verifiable part and
  defer the visual part to a preview session, in one combined report. This run is a concrete example.
- **`legal-docs.md`: state explicitly that the coins disclosure ships *with* the coins feature**, not
  with the standard — otherwise a node risks disclosing a feature it hasn't built.
- **`check-links.mjs` matches links inside code spans** — this very report tripped the gate on the
  example token it uses to *describe* the false positive, even though the token is inside inline
  backticks. Any doc that quotes a markdown link hits this. Fixed locally by stripping fenced blocks
  and inline-code spans before matching; recommend folding the two-line guard into the hub template so
  every node inherits it.

## Environment

Jekyll static site (Ruby 3.3 / Jekyll 4.4), Node built-in test runner, Windows + PowerShell (the
node's non-negotiable tooling: PowerShell + file tools, never the bash sandbox — honored). This node
reimplements the shared chrome in its own `assets/` files rather than vendoring the hub bundle, which
is why the coins/reader/chrome adoption is a re-apply-of-intent (Phase 2), not a file copy. Branch
model on arrival: clean `dev`, in sync with `origin/dev`, released through v0.5.4. Standing
deferred-eyeball debt already present (Chrome unconnected across recent unattended runs); Phase 2 adds
to it.
