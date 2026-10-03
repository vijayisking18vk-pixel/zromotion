#!/usr/bin/env node
/**
 * Chennai Rents — Em Dash CI Guard
 * Scans user-facing source files for U+2014 (—) and &mdash; / &#8212;
 * Fails the build if any are found in non-comment lines.
 *
 * Run: node scripts/check-emdash.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Files/dirs to scan
const SCAN_DIRS = [
  path.join(ROOT, 'src'),
  path.join(ROOT, 'public', 'listings'),
];

const EXTENSIONS = new Set(['.jsx', '.js', '.ts', '.tsx', '.html', '.css', '.md', '.csv', '.json']);

// Lines that are pure code comments — skip them
const COMMENT_ONLY = /^\s*(\/\/|\/\*|\*|\*\/|<!--)/;

// The em dash character and HTML entities
const EM_DASH = '\u2014';
const EM_DASH_ENTITIES = /&mdash;|&#8212;/gi;

let violations = [];

function scanFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!EXTENSIONS.has(ext)) return;

  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  lines.forEach((line, i) => {
    // Skip pure comment lines
    if (COMMENT_ONLY.test(line)) return;
    // Skip JSX/HTML comments
    if (/^\s*\{?\/\*/.test(line)) return;

    const hasEmDash = line.includes(EM_DASH);
    const hasEntity = EM_DASH_ENTITIES.test(line);
    EM_DASH_ENTITIES.lastIndex = 0; // reset regex

    if (hasEmDash || hasEntity) {
      violations.push({
        file: path.relative(ROOT, filePath),
        line: i + 1,
        content: line.trim().slice(0, 120),
      });
    }
  });
}

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules, dist, .git, _archive
      if (['node_modules', 'dist', 'dist-ssr', '.git', '_archive'].includes(entry.name)) continue;
      scanDir(full);
    } else {
      scanFile(full);
    }
  }
}

console.log('🔍 Chennai Rents Em Dash Check...');
SCAN_DIRS.forEach(scanDir);

if (violations.length > 0) {
  console.error('\n❌ EM DASH VIOLATIONS FOUND — Fix before building:\n');
  violations.forEach(v => {
    console.error(`  ${v.file}:${v.line}`);
    console.error(`    ${v.content}\n`);
  });
  console.error(`Total: ${violations.length} violation(s)\n`);
  console.error('Replace em dashes (—) with commas, colons, or hyphens. See GEMINI.md.\n');
  process.exit(1);
} else {
  console.log('✅ No em dashes found in user-facing files. Build proceeding.\n');
}
