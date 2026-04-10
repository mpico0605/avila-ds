import React from 'react';
import changelog from '../changelog.json';

// ─── Design tokens (inline — matches the AvilaDS palette) ────────────────────
const T = {
  ink100:       '#1a1208',
  ink90:        '#2e2416',
  ink80:        '#3d3020',
  ink50:        '#7a6e65',
  ink30:        '#c0b8ae',
  ink10:        '#ece8e2',
  ink05:        '#f5f2ee',
  parchment:    '#f5f0e8',
  offWhite:     '#fdfaf6',
  hotPink:      '#e8195a',
  hotPinkSubtle:'#fce8ee',
  marigold:     '#f5a623',
  teal:         '#00c9a7',
  tealSubtle:   '#e5faf7',
  cobalt:       '#1b4fd8',
  errorBase:    '#c8282e',
  errorSubtle:  '#fdecea',
};

const BADGE = {
  modified: { bg: '#fdf3e0', color: '#b86a00',  label: 'Modified' },
  added:    { bg: '#e5faf7', color: '#009e84',   label: 'Added'    },
  removed:  { bg: '#fdecea', color: '#c8282e',   label: 'Removed'  },
};

const MODE_LABEL = {
  shared: { label: 'shared',  bg: T.ink10,       color: T.ink50  },
  both:   { label: 'both',    bg: '#fdf3e0',      color: '#b86a00'},
  light:  { label: 'light',   bg: '#fffbea',      color: '#b86a00'},
  dark:   { label: 'dark',    bg: T.ink90,        color: T.parchment},
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValidHex(v) {
  return typeof v === 'string' && /^#[0-9a-fA-F]{6,8}$/.test(v);
}

function hasAlpha(v) {
  return typeof v === 'string' && v.length === 9;
}

function luminance(hex) {
  if (!isValidHex(hex)) return 1;
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function fmtToken(key) {
  // "ColorBackgroundPage" → "color.background.page"
  return key
    .replace(/([A-Z0-9]+)([A-Z][a-z])/g, '$1.$2')
    .replace(/([a-z])([A-Z0-9])/g, '$1.$2')
    .replace(/\.+/g, '.')
    .toLowerCase();
}

// ─── Primitive components ─────────────────────────────────────────────────────

function Badge({ type }) {
  const s = BADGE[type] ?? BADGE.modified;
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
      background: s.bg, color: s.color,
      padding: '2px 7px', borderRadius: 999,
    }}>
      {s.label}
    </span>
  );
}

function ModeTag({ mode }) {
  const s = MODE_LABEL[mode] ?? MODE_LABEL.shared;
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, letterSpacing: '0.04em',
      background: s.bg, color: s.color,
      padding: '2px 7px', borderRadius: 4,
    }}>
      {s.label}
    </span>
  );
}

function ColorSwatch({ value, label }) {
  const valid = isValidHex(value);
  const alpha = hasAlpha(value);
  return (
    <div style={{ textAlign: 'center', minWidth: 80 }}>
      <div style={{
        width: 80, height: 56,
        borderRadius: 6,
        border: `1px solid ${T.ink10}`,
        background: valid ? value : `repeating-linear-gradient(45deg,${T.ink10},${T.ink10} 4px,#fff 4px,#fff 8px)`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {alpha && (
          <span style={{
            position: 'absolute', bottom: 4, right: 4,
            fontSize: 8, fontWeight: 700, letterSpacing: '0.04em',
            background: 'rgba(0,0,0,0.4)', color: '#fff',
            padding: '1px 4px', borderRadius: 3,
          }}>α</span>
        )}
      </div>
      <code style={{ fontSize: 9, color: T.ink50, display: 'block', marginTop: 4, letterSpacing: '0.01em' }}>
        {label ?? value}
      </code>
    </div>
  );
}

function Arrow() {
  return (
    <span style={{ fontSize: 16, color: T.ink30, alignSelf: 'flex-start', marginTop: 20, flexShrink: 0 }}>
      →
    </span>
  );
}

function NullSwatch({ label }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 80 }}>
      <div style={{
        width: 80, height: 56, borderRadius: 6,
        border: `1.5px dashed ${T.ink30}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: 9, color: T.ink50 }}>—</span>
      </div>
      <code style={{ fontSize: 9, color: T.ink50, display: 'block', marginTop: 4 }}>{label}</code>
    </div>
  );
}

// ─── Change row renderers ─────────────────────────────────────────────────────

function ColorChangeRow({ change }) {
  if (change.mode === 'both') {
    return (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 8 }}>
        {/* Light */}
        <div>
          <span style={{ fontSize: 10, color: T.ink50, display: 'block', marginBottom: 6, fontWeight: 600 }}>LIGHT</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {change.light.before ? <ColorSwatch value={change.light.before} label={change.light.before} /> : <NullSwatch label="new" />}
            <Arrow />
            {change.light.after  ? <ColorSwatch value={change.light.after}  label={change.light.after}  /> : <NullSwatch label="removed" />}
          </div>
        </div>
        {/* Dark */}
        <div>
          <span style={{ fontSize: 10, color: T.ink50, display: 'block', marginBottom: 6, fontWeight: 600 }}>DARK</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {change.dark.before ? <ColorSwatch value={change.dark.before} label={change.dark.before} /> : <NullSwatch label="new" />}
            <Arrow />
            {change.dark.after  ? <ColorSwatch value={change.dark.after}  label={change.dark.after}  /> : <NullSwatch label="removed" />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
      {change.before ? <ColorSwatch value={change.before} label={change.before} /> : <NullSwatch label="new" />}
      {change.before && change.after && <Arrow />}
      {change.after  ? <ColorSwatch value={change.after}  label={change.after}  /> : <NullSwatch label="removed" />}
    </div>
  );
}

function ValueChangeRow({ change }) {
  const before = change.mode === 'both' ? change.light?.before : change.before;
  const after  = change.mode === 'both' ? change.light?.after  : change.after;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
      <code style={{
        fontSize: 12, background: change.changeType !== 'added' ? T.errorSubtle : T.ink05,
        color: change.changeType !== 'added' ? T.errorBase : T.ink50,
        padding: '3px 8px', borderRadius: 4,
        textDecoration: change.changeType === 'removed' ? 'line-through' : 'none',
      }}>
        {before ?? '—'}
      </code>
      {before && after && <Arrow />}
      <code style={{
        fontSize: 12, background: change.changeType !== 'removed' ? T.tealSubtle : T.ink05,
        color: change.changeType !== 'removed' ? '#009e84' : T.ink50,
        padding: '3px 8px', borderRadius: 4,
      }}>
        {after ?? '—'}
      </code>
    </div>
  );
}

function ChangeRow({ change }) {
  return (
    <div style={{
      padding: '14px 0',
      borderBottom: `1px solid ${T.ink05}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        <Badge type={change.changeType} />
        <ModeTag mode={change.mode} />
        <code style={{ fontSize: 12, color: T.ink100, fontWeight: 600 }}>
          {fmtToken(change.token)}
        </code>
        <span style={{ fontSize: 10, color: T.ink30 }}>({change.tokenType})</span>
      </div>

      {change.tokenType === 'color'
        ? <ColorChangeRow change={change} />
        : <ValueChangeRow change={change} />
      }
    </div>
  );
}

// ─── Entry card ───────────────────────────────────────────────────────────────

function EntryCard({ entry }) {
  const { summary, date, changes } = entry;
  const total = summary.added + summary.removed + summary.modified;

  const pills = [
    summary.modified > 0 && { label: `${summary.modified} modified`, bg: BADGE.modified.bg, color: BADGE.modified.color },
    summary.added    > 0 && { label: `${summary.added} added`,       bg: BADGE.added.bg,    color: BADGE.added.color    },
    summary.removed  > 0 && { label: `${summary.removed} removed`,   bg: BADGE.removed.bg,  color: BADGE.removed.color  },
  ].filter(Boolean);

  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${T.ink10}`,
      borderRadius: 12,
      marginBottom: 24,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        padding: '16px 24px',
        background: T.parchment,
        borderBottom: `1px solid ${T.ink10}`,
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: T.ink100 }}>{date}</span>
        <span style={{ fontSize: 12, color: T.ink50 }}>{total} token{total !== 1 ? 's' : ''} changed</span>
        <div style={{ display: 'flex', gap: 6, marginLeft: 'auto', flexWrap: 'wrap' }}>
          {pills.map(p => (
            <span key={p.label} style={{
              fontSize: 11, fontWeight: 600,
              background: p.bg, color: p.color,
              padding: '3px 10px', borderRadius: 999,
            }}>
              {p.label}
            </span>
          ))}
        </div>
      </div>

      {/* Changes */}
      <div style={{ padding: '4px 24px 8px' }}>
        {changes.map((c, i) => <ChangeRow key={`${c.token}-${i}`} change={c} />)}
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div style={{
      textAlign: 'center', padding: '80px 32px',
      background: T.offWhite, borderRadius: 12,
      border: `1px dashed ${T.ink30}`,
    }}>
      <div style={{ fontSize: 32, marginBottom: 16 }}>🪴</div>
      <p style={{ fontSize: 15, fontWeight: 600, color: T.ink100, margin: '0 0 8px' }}>
        No changes recorded yet
      </p>
      <p style={{ fontSize: 13, color: T.ink50, margin: 0, lineHeight: 1.6 }}>
        Run <code style={{ background: T.ink05, padding: '2px 6px', borderRadius: 4 }}>npm run sync:tokens</code> after
        editing your token source files to capture a diff and populate this page.
      </p>
    </div>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────

function ChangelogPage() {
  const entries = [...(changelog.entries ?? [])].reverse();

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, sans-serif',
      background: T.offWhite,
      minHeight: '100vh',
      padding: 32,
    }}>
      {/* Page header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: T.ink100, margin: '0 0 6px' }}>
          Token Changelog
        </h1>
        <p style={{ fontSize: 13, color: T.ink50, margin: 0 }}>
          {entries.length > 0
            ? `${entries.length} entr${entries.length !== 1 ? 'ies' : 'y'} · ${entries.reduce((n, e) => n + e.summary.added + e.summary.removed + e.summary.modified, 0)} total changes`
            : 'Tracks every token value change across syncs from Figma.'}
        </p>
      </div>

      {entries.length === 0
        ? <EmptyState />
        : entries.map(entry => <EntryCard key={entry.id} entry={entry} />)
      }
    </div>
  );
}

export default {
  title: 'Design Tokens/Changelog',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Auto-generated diff of every token sync. Run `npm run sync:tokens` to capture changes from your source token files.',
      },
    },
  },
};

export const Log = {
  name: 'Changelog',
  render: () => <ChangelogPage />,
};
