/**
 * sync-tokens
 *
 * Orchestrates the full token sync pipeline:
 *   1. snapshot  — capture the current dist/ state (before rebuild)
 *   2. build     — rebuild dist/ from token source files
 *   3. diff      — compare snapshot vs new build, append changelog entry
 *
 * Usage:
 *   npm run sync:tokens
 */
import { execSync } from 'child_process';

function run(label, cmd) {
  console.log(`\n──────────────────────────────────`);
  console.log(`  ${label}`);
  console.log(`──────────────────────────────────`);
  execSync(cmd, { stdio: 'inherit' });
}

run('Step 1 / 3 — Snapshot current tokens', 'node scripts/snapshot.js');
run('Step 2 / 3 — Build tokens',            'node scripts/build-tokens.js');
run('Step 3 / 3 — Diff & update changelog', 'node scripts/diff.js');

console.log('\nSync complete.\n');
