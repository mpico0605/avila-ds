import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SNAPSHOTS_DIR = resolve(ROOT, 'snapshots');
const DIST = resolve(ROOT, 'dist/json');

const timestamp = new Date().toISOString();
const filename = timestamp.replace(/[:.]/g, '').replace('Z', 'Z') + '.json';

mkdirSync(SNAPSHOTS_DIR, { recursive: true });

let light, dark;
try {
  light = JSON.parse(readFileSync(resolve(DIST, 'tokens.light.json'), 'utf8'));
  dark  = JSON.parse(readFileSync(resolve(DIST, 'tokens.dark.json'),  'utf8'));
} catch {
  console.error('Could not read dist/json/tokens.*.json — run npm run build:tokens first.');
  process.exit(1);
}

writeFileSync(
  resolve(SNAPSHOTS_DIR, filename),
  JSON.stringify({ timestamp, light, dark }, null, 2)
);

console.log(`Snapshot saved → snapshots/${filename}`);
console.log(`  ${Object.keys(light).length} light tokens, ${Object.keys(dark).length} dark tokens`);
