#!/usr/bin/env node
// Budget-aware art generation for Fairy Fox Stories (cover + chapter headers) via the
// OpenAI Images API. Local tooling only — never runs at read time. Reads OPENAI_API_KEY
// from .env (git-ignored). Careful by default: it will NOT overwrite existing art (no
// re-rolls / repeat spend) unless --force, and --dry-run spends nothing.
//
// Usage:
//   node scripts/generate-art.mjs --book <slug> --kind cover  --prompt "…" [--size 1024x1024]
//   node scripts/generate-art.mjs --book <slug> --kind header --chapter 01 --prompt "…" [--size 1792x1024]
//   add --dry-run to preview (no API call, no spend), or --force to overwrite existing art.
//
// Output paths (relative to repo root):
//   cover  -> stories/<book>/art/cover.png       (then set `cover:` in _books/<book>.md)
//   header -> stories/<book>/art/<chapter>-header.png  (then set `header_image:` in the chapter)
//
// Rough cost (dall-e-3, standard): 1024x1024 ≈ $0.04, 1792x1024 / 1024x1792 ≈ $0.08.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));

function arg(name, def = null) {
  const i = process.argv.indexOf('--' + name);
  if (i === -1) return def;
  const v = process.argv[i + 1];
  return (v && !v.startsWith('--')) ? v : true;
}
const flag = (n) => process.argv.includes('--' + n);

function loadEnv() {
  const p = join(ROOT, '.env');
  if (!existsSync(p)) return {};
  const env = {};
  for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return env;
}

const COST = { '1024x1024': 0.04, '1792x1024': 0.08, '1024x1792': 0.08 };

async function main() {
  const book = arg('book');
  const kind = arg('kind');
  const prompt = arg('prompt');
  const chapter = arg('chapter');
  const dryRun = flag('dry-run');
  const force = flag('force');

  if (!book || !kind || !prompt) {
    console.error('Missing --book, --kind, or --prompt. See the header of this file for usage.');
    process.exit(2);
  }
  if (kind === 'header' && !chapter) {
    console.error('--kind header requires --chapter <NN>.');
    process.exit(2);
  }

  const size = arg('size', kind === 'cover' ? '1024x1024' : '1792x1024');
  const out = kind === 'cover'
    ? join(ROOT, 'stories', book, 'art', 'cover.png')
    : join(ROOT, 'stories', book, 'art', `${chapter}-header.png`);
  const rel = out.replace(ROOT, '').replace(/\\/g, '/');

  console.log(`• ${kind} for "${book}"${chapter ? ' ch.' + chapter : ''}  →  ${rel}`);
  console.log(`  size ${size}  ·  est. cost ~$${(COST[size] ?? 0.08).toFixed(2)}`);

  if (existsSync(out) && !force) {
    console.log('  already exists — skipping (use --force to overwrite / re-spend).');
    return;
  }
  if (dryRun) {
    console.log('  --dry-run: no API call made, nothing spent.');
    return;
  }

  const key = loadEnv().OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (!key) { console.error('  No OPENAI_API_KEY in .env — cannot generate.'); process.exit(1); }

  const env = loadEnv();
  const model = env.IMAGE_MODEL || 'gpt-image-1';
  // Params differ by model: gpt-image-1 uses quality low|medium|high (no response_format,
  // always returns b64_json); dall-e-3 uses quality standard|hd and can return a URL.
  const body = { model, prompt, size, n: 1 };
  if (model === 'gpt-image-1') body.quality = env.IMAGE_QUALITY || 'medium';
  else { body.response_format = 'b64_json'; body.quality = env.IMAGE_QUALITY || 'standard'; }

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.error(`  OpenAI error ${res.status}: ${(await res.text()).slice(0, 500)}`);
    process.exitCode = 1; return;
  }
  const d0 = (await res.json())?.data?.[0];
  let buf;
  if (d0?.b64_json) buf = Buffer.from(d0.b64_json, 'base64');
  else if (d0?.url) buf = Buffer.from(await (await fetch(d0.url)).arrayBuffer());
  else { console.error('  No image returned.'); process.exitCode = 1; return; }

  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, buf);
  console.log(`  ✓ saved ${rel}`);
  console.log(`  Next: set ${kind === 'cover' ? '`cover:`' : '`header_image:`'} in the ${kind === 'cover' ? 'book manifest' : 'chapter'} to /${rel.replace(/^\//, '')}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
