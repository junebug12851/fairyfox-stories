#!/usr/bin/env node
// check-links.mjs — doc-drift gate (repo-hygiene standard). Zero dependencies.
//
// Walks every tracked *.md (minus generated/vendored trees) and fails on any RELATIVE
// link whose target file doesn't exist. Wire into the test gate + CI so a rename/move/
// removal that leaves a dangling link turns the build red. Adapt SKIP to your repo.
//
//   node scripts/check-links.mjs      → exit 1 (and a list) on any broken link
//
// NODE SCOPE (deliberate divergence): notes/reference/ is skipped. It is this node's
// verbatim mirror of the hub standards, which legitimately carry hub-relative links
// (docs-site/, ../templates/, ../../_data/…) that resolve at the hub, not here — we
// adopt standards by copy, not by rewriting every cross-link (see adopting-updates.md).
// The gate still covers the node's own living docs: CLAUDE.md, README, status.md,
// sessions/decisions/plans, and the craft references CLAUDE.md leans on.
//
// The Jekyll content collections (_books, _chapters, _authors, _characters, _cities,
// _universes) and stories/** are also skipped: their markdown links are site PERMALINKS
// (e.g. a book page linking to `blueprint/`), resolved by Jekyll at build — not
// filesystem-relative doc links, so a naive file-existence check false-positives on them.
import { execSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { dirname, resolve, join } from "node:path";

const SKIP = [
  /(^|\/)node_modules\//, /(^|\/)_site\//, /(^|\/)vendor\//,
  /(^|\/)assets\/references\//, /(^|\/)notes\/reference\//,
  /(^|\/)_(books|chapters|authors|characters|cities|universes)\//, /(^|\/)stories\//,
];
const files = execSync("git ls-files *.md **/*.md", { encoding: "utf8" })
  .split("\n").filter(Boolean).filter((f) => !SKIP.some((re) => re.test(f)));

const LINK = /\[[^\]]*\]\(([^)]+)\)/g;   // [text](target)
let broken = 0;

for (const file of files) {
  const raw = execSync(`git show HEAD:"${file}"`, { encoding: "utf8" });
  // Ignore code — fenced blocks and inline spans — so a doc that *quotes* a link
  // (e.g. a report showing `[…](blueprint/)` as an example) isn't a false positive.
  const text = raw.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
  for (const m of text.matchAll(LINK)) {
    let target = m[1].trim().split(/\s+/)[0];          // drop optional "title"
    if (/^(https?:|mailto:|tel:|#|data:)/i.test(target)) continue;  // external / same-page
    target = target.replace(/[#?].*$/, "");            // strip fragment/query
    if (!target) continue;
    let path = target.startsWith("/") ? join(".", target) : resolve(dirname(file), target);
    if (existsSync(path)) continue;
    if (existsSync(path + ".md") || (existsSync(path) && statSync(path).isDirectory())) continue;
    console.error(`BROKEN  ${file}  ->  ${m[1]}`);
    broken++;
  }
}

if (broken) { console.error(`\n${broken} broken link(s).`); process.exit(1); }
console.log(`check-links: ${files.length} files OK`);
