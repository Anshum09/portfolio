import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const name = process.argv.slice(2).join(' ').trim();
if (!name) {
  console.error('Give the project a name. Example: npm run new "Pulley bracket"');
  process.exit(1);
}

const slug = name
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');
const dir = join('content', 'projects', slug);

if (existsSync(dir)) {
  console.error(`content/projects/${slug} already exists.`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 7);
mkdirSync(dir, { recursive: true });
writeFileSync(
  join(dir, 'index.md'),
  `---
title: ${name}
summary: One sentence on what this is and what you made.
category: CAD
status: In progress
date: ${today}
tools: [Fusion 360]
featured: false
draft: false
---

What the goal was, what you made, and what you learned. Plain paragraphs are fine.

## What I would change

- Add a list like this if it helps
- Put images in this folder, then show one here with: ![Caption](render.png)
`
);

console.log(`Created content/projects/${slug}/index.md`);
console.log('Drop your renders or photos into that folder. The first image becomes the cover.');
