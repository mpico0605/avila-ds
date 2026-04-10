import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SNAPSHOTS_DIR = resolve(ROOT, 'snapshots');
const DIST = resolve(ROOT, 'dist/json');
const CHANGELOG_PATH = resolve(ROOT, 'changelog.json');

// ─── Token type detection ─────────────────────────────────────────────────────

function detectTokenType(value) {
  if (!value) return 'unknown';
  const v = String(value).trim();
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v)) return 'color';
  if (/^\d+(\.\d+)?ms$/.test(v))                                       return 'duration';
  if (/^\d+(\.\d+)?(px|rem|em|%)$/.test(v))                            return 'dimension';
  if (/^(0(\.\d+)?|1(\.0*)?)$/.test(v))                                return 'opacity';
  if (/^-?\d+$/.test(v))                                                return 'number';
  if (/^\d+\.\d+$/.test(v))                                             return 'number';
  return 'unknown';
}

// ─── Diff algorithm ───────────────────────────────────────────────────────────

function buildDiff(prev, curr) {
  const allKeys = new Set([...Object.keys(prev.light), ...Object.keys(curr.light)]);
  const changes = [];

  for (const key of [...allKeys].sort()) {
    const prevLight = prev.light[key];
    const prevDark  = prev.dark[key];
    const currLight = curr.light[key];
    const currDark  = curr.dark[key];

    let changeType;
    if (prevLight === undefined)                              changeType = 'added';
    else if (currLight === undefined)                         changeType = 'removed';
    else if (prevLight === currLight && prevDark === currDark) continue; // no change
    else                                                      changeType = 'modified';

    const tokenType = detectTokenType(currLight ?? prevLight ?? currDark ?? prevDark);

    if (changeType === 'added' || changeType === 'removed') {
      changes.push({
        token: key, changeType, tokenType,
        mode: 'shared',
        before: prevLight ?? null,
        after:  currLight ?? null,
      });
      continue;
    }

    const lightDiff = prevLight !== currLight;
    const darkDiff  = prevDark  !== currDark;

    if (lightDiff && darkDiff && currLight !== currDark) {
      // Both modes changed, to different values
      changes.push({
        token: key, changeType, tokenType,
        mode: 'both',
        light: { before: prevLight, after: currLight },
        dark:  { before: prevDark,  after: currDark  },
      });
    } else if (lightDiff && darkDiff) {
      // Both modes changed to the same value
      changes.push({
        token: key, changeType, tokenType,
        mode: 'shared',
        before: prevLight,
        after:  currLight,
      });
    } else if (lightDiff) {
      changes.push({ token: key, changeType, tokenType, mode: 'light', before: prevLight, after: currLight });
    } else {
      changes.push({ token: key, changeType, tokenType, mode: 'dark', before: prevDark, after: currDark });
    }
  }

  return changes;
}

// ─── Human-readable summary ───────────────────────────────────────────────────

function summarise(changes) {
  const counts = { added: 0, removed: 0, modified: 0 };
  for (const c of changes) counts[c.changeType]++;
  const parts = Object.entries(counts)
    .filter(([, n]) => n > 0)
    .map(([k, n]) => `${n} ${k}`);
  return parts.join(', ') || 'no changes';
}

// ─── Main ─────────────────────────────────────────────────────────────────────

mkdirSync(SNAPSHOTS_DIR, { recursive: true });

const snapFiles = readdirSync(SNAPSHOTS_DIR)
  .filter(f => f.endsWith('.json'))
  .sort();

// First-ever run — create baseline and exit
if (snapFiles.length === 0) {
  console.log('No previous snapshot found. Creating baseline…');
  const light = JSON.parse(readFileSync(resolve(DIST, 'tokens.light.json'), 'utf8'));
  const dark  = JSON.parse(readFileSync(resolve(DIST, 'tokens.dark.json'),  'utf8'));
  const ts    = new Date().toISOString();
  const fname = ts.replace(/[:.]/g, '') + '.json';
  writeFileSync(resolve(SNAPSHOTS_DIR, fname), JSON.stringify({ timestamp: ts, light, dark }, null, 2));
  console.log(`Baseline saved → snapshots/${fname}`);
  console.log('No changelog entry written. Run sync:tokens again after your next token edit.');
  process.exit(0);
}

// Load previous snapshot
const prevFile = snapFiles[snapFiles.length - 1];
const prev = JSON.parse(readFileSync(resolve(SNAPSHOTS_DIR, prevFile), 'utf8'));

// Load current dist tokens
let currLight, currDark;
try {
  currLight = JSON.parse(readFileSync(resolve(DIST, 'tokens.light.json'), 'utf8'));
  currDark  = JSON.parse(readFileSync(resolve(DIST, 'tokens.dark.json'),  'utf8'));
} catch {
  console.error('Could not read dist/json tokens — run npm run build:tokens first.');
  process.exit(1);
}

const curr = { light: currLight, dark: currDark };
const changes = buildDiff(prev, curr);

if (changes.length === 0) {
  console.log(`No token changes detected since ${prevFile}.`);
  process.exit(0);
}

// Load or init changelog
const changelog = existsSync(CHANGELOG_PATH)
  ? JSON.parse(readFileSync(CHANGELOG_PATH, 'utf8'))
  : { version: '1.0.0', entries: [] };

const id = new Date().toISOString().replace(/[:.]/g, '');
const entry = {
  id,
  date: new Date().toISOString().split('T')[0],
  snapshotRef: prevFile,
  summary: {
    added:    changes.filter(c => c.changeType === 'added').length,
    removed:  changes.filter(c => c.changeType === 'removed').length,
    modified: changes.filter(c => c.changeType === 'modified').length,
  },
  changes,
};

changelog.entries.push(entry);
writeFileSync(CHANGELOG_PATH, JSON.stringify(changelog, null, 2));

console.log(`\nChangelog updated — ${summarise(changes)}`);
console.log(`  Entry ID : ${id}`);
console.log(`  Compared : snapshots/${prevFile} → current dist`);
console.log(`  Total entries: ${changelog.entries.length}`);
