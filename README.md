# Fairy Fox Stories

[![CI](https://img.shields.io/github/actions/workflow/status/1fairyfox/fairyfox-stories/ci.yml?branch=main&style=flat-square&logo=githubactions&logoColor=white&label=CI)](https://github.com/1fairyfox/fairyfox-stories/actions/workflows/ci.yml)
[![Version](https://img.shields.io/github/v/tag/1fairyfox/fairyfox-stories?style=flat-square&label=version)](https://github.com/1fairyfox/fairyfox-stories/releases)
[![Read](https://img.shields.io/badge/read-fairyfox.io-4c9?style=flat-square)](https://fairyfox.io/fairyfox-stories/)
[![License](https://img.shields.io/github/license/1fairyfox/fairyfox-stories?style=flat-square)](LICENSE)

An **AI-managed story farm** — a growing library of short interactive **books** (genuine
fiction, fully pre-planned then written a chapter at a time) planted in living **universes**
and tended by AI. New books are sown regularly and the ones already growing keep getting
deeper, so the shelf widens *and* deepens over time.

Every book is real craft: a first-person main character who feels alive, a form chosen and
structured on purpose (short story · novelette · novella · rarely a novel), and a complete
public **blueprint** you can read before you start — no bait-and-switch.

**▶ Read them:** <https://fairyfox.io/fairyfox-stories/> — each book at
`…/stories/<book>/`, each chapter its own page.

Part of the [Fairy Fox](https://fairyfox.io) mesh, with the door open: **contributions
welcome** — see [CONTRIBUTING.md](CONTRIBUTING.md).

## What's here

A **Jekyll** site whose world lives as data — books, chapters, universes, characters, and
cities are collections that cross-link themselves.

```
fairyfox-stories/
├── _books/<slug>.md          # a book's cover/landing page (front-matter metadata)
├── _chapters/<slug>/NN.md     # its chapters — plain Markdown, one per page
├── _universes/<slug>.md       # the realms the books live in (codex)
├── _characters/<slug>.md      # first-class character pages (auto-linked to their books)
├── _cities/<slug>.md          # places, likewise
├── stories/<slug>/blueprint.md# the public, spoiler-forward plan for each book
├── _layouts/ _includes/       # the shared fairyfox.io chrome + the immersive reader
├── assets/                    # self-hosted fonts + theme + shelf/reader CSS
├── scripts/                   # generation tooling + the integrity check
└── notes/                     # living project notes (incl. the craft body of knowledge)
```

## Read locally

Ruby 3 + Jekyll (a `Gemfile` is provided):

```sh
bundle install
bundle exec jekyll serve      # http://localhost:4000/fairyfox-stories/
```

## Integrity checks

The prose isn't unit-tested, but its structure is — front-matter, chapter counts, and the
mesh's cross-references are validated on every push and PR (zero deps, Node's built-in runner):

```sh
npm test                      # runs scripts/check-stories.test.mjs
```

## How the farm runs

A new book is **planted** (as a complete blueprint) at most once every three days; existing
books are **grown** daily — up to five books advance by one whole chapter each. Sequels are
unplanned (a weekly roll); some books are marked complete with no sequel. The full model is in
[`notes/reference/operating-model.md`](notes/reference/operating-model.md); the craft it's held
to is in [`notes/reference/craft/`](notes/reference/craft/).

## License

[MIT](LICENSE) © Fairy Fox. Read, fork, learn from, and build on these freely.
