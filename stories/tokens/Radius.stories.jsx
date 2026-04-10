import React from 'react';
import lightTokens from '../../dist/json/tokens.light.json';

// ─── Token data ───────────────────────────────────────────────────────────────

const RADIUS = [
  { name: 'radius/none', key: 'RadiusNone', desc: 'Sharp corners' },
  { name: 'radius/xs',   key: 'RadiusXs',   desc: 'Subtle rounding' },
  { name: 'radius/sm',   key: 'RadiusSm',   desc: 'Tags, chips' },
  { name: 'radius/md',   key: 'RadiusMd',   desc: 'Inputs, small cards' },
  { name: 'radius/lg',   key: 'RadiusLg',   desc: 'Cards, panels' },
  { name: 'radius/xl',   key: 'RadiusXl',   desc: 'Modals, dialogs' },
  { name: 'radius/2xl',  key: 'Radius2xl',  desc: 'Large surfaces' },
  { name: 'radius/3xl',  key: 'Radius3xl',  desc: 'Feature cards' },
  { name: 'radius/full', key: 'RadiusFull', desc: 'Pill — buttons, badges' },
];

// ─── Component ────────────────────────────────────────────────────────────────

function RadiusBox({ name, value, desc }) {
  // Clamp the preview box size so radius/full looks correct
  const numericVal = parseInt(value) || 0;
  const boxSize = 96;
  const effectiveRadius = Math.min(numericVal, boxSize / 2);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 14,
      padding: '24px 16px',
      background: '#ffffff',
      border: '1px solid #ece8e2',
      borderRadius: 8,
      minWidth: 120,
      flex: '1 1 120px',
      maxWidth: 156,
    }}>
      {/* Shape preview */}
      <div style={{
        width: boxSize,
        height: boxSize,
        borderRadius: value === '9999px' ? '9999px' : `${effectiveRadius}px`,
        background: 'linear-gradient(135deg, #e8195a 0%, #f5a623 100%)',
        flexShrink: 0,
      }} />

      {/* Labels */}
      <div style={{ textAlign: 'center', width: '100%' }}>
        <code style={{ fontSize: 11, color: '#1a1208', display: 'block', fontWeight: 600 }}>
          {name}
        </code>
        <code style={{ fontSize: 11, color: '#7a6e65', display: 'block', marginTop: 3 }}>
          {value}
        </code>
        {desc && (
          <p style={{ fontSize: 10, color: '#a09488', margin: '6px 0 0', lineHeight: 1.4 }}>
            {desc}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Story config ─────────────────────────────────────────────────────────────

export default {
  title: 'Design Tokens/Radius',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Border radius scale used across all interactive and surface components. Each box previews the same 96×96px shape with its respective radius applied.',
      },
    },
  },
};

// ─── Story ────────────────────────────────────────────────────────────────────

export const Scale = {
  render: () => (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#fdfaf6', padding: 32 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        {RADIUS.map(({ name, key, desc }) => (
          <RadiusBox key={name} name={name} value={lightTokens[key]} desc={desc} />
        ))}
      </div>

      {/* Usage note */}
      <div style={{
        marginTop: 40,
        padding: '16px 20px',
        background: '#fce8ee',
        borderRadius: 8,
        borderLeft: '3px solid #e8195a',
      }}>
        <p style={{ margin: 0, fontSize: 12, color: '#1a1208', lineHeight: 1.6 }}>
          <strong>Usage:</strong> Use <code style={{ background: '#f5f0e8', padding: '1px 5px', borderRadius: 3 }}>radius/md</code> for inputs and small interactive elements,{' '}
          <code style={{ background: '#f5f0e8', padding: '1px 5px', borderRadius: 3 }}>radius/lg</code> for cards and panels,{' '}
          <code style={{ background: '#f5f0e8', padding: '1px 5px', borderRadius: 3 }}>radius/full</code> for pills, badges, and avatar shapes.
        </p>
      </div>
    </div>
  ),
};
