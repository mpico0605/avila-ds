import React from 'react';
import lightTokens from '../../dist/json/tokens.light.json';

// ─── Token data (sorted by numeric value) ─────────────────────────────────────

const SPACING = [
  { name: 'space/0',    key: 'Space0',   desc: '' },
  { name: 'space/1px',  key: 'Space1px', desc: '1px hairline' },
  { name: 'space/0-5',  key: 'Space05',  desc: '' },
  { name: 'space/1',    key: 'Space1',   desc: '' },
  { name: 'space/1-5',  key: 'Space15',  desc: '' },
  { name: 'space/2',    key: 'Space2',   desc: '' },
  { name: 'space/2-5',  key: 'Space25',  desc: '' },
  { name: 'space/3',    key: 'Space3',   desc: '' },
  { name: 'space/3-5',  key: 'Space35',  desc: '' },
  { name: 'space/4',    key: 'Space4',   desc: '' },
  { name: 'space/5',    key: 'Space5',   desc: '' },
  { name: 'space/6',    key: 'Space6',   desc: '' },
  { name: 'space/7',    key: 'Space7',   desc: '' },
  { name: 'space/8',    key: 'Space8',   desc: '' },
  { name: 'space/9',    key: 'Space9',   desc: '' },
  { name: 'space/10',   key: 'Space10',  desc: '' },
  { name: 'space/11',   key: 'Space11',  desc: '' },
  { name: 'space/12',   key: 'Space12',  desc: '' },
  { name: 'space/14',   key: 'Space14',  desc: '' },
  { name: 'space/16',   key: 'Space16',  desc: '' },
  { name: 'space/20',   key: 'Space20',  desc: '' },
  { name: 'space/24',   key: 'Space24',  desc: '' },
  { name: 'space/28',   key: 'Space28',  desc: '' },
  { name: 'space/32',   key: 'Space32',  desc: '' },
  { name: 'space/36',   key: 'Space36',  desc: '' },
  { name: 'space/40',   key: 'Space40',  desc: '' },
  { name: 'space/48',   key: 'Space48',  desc: '' },
  { name: 'space/56',   key: 'Space56',  desc: '' },
  { name: 'space/64',   key: 'Space64',  desc: '' },
  { name: 'space/80',   key: 'Space80',  desc: '' },
];

const MAX_PX = 320;

// ─── Component ────────────────────────────────────────────────────────────────

function SpacingRow({ name, value }) {
  const px = parseInt(value) || 0;
  const pct = Math.max((px / MAX_PX) * 100, px > 0 ? 0.5 : 0);
  const isZero = px === 0;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '120px 56px 1fr',
      alignItems: 'center',
      gap: 16,
      padding: '7px 0',
      borderBottom: '1px solid #f5f2ee',
    }}>
      {/* Token name */}
      <code style={{ fontSize: 12, color: '#1a1208', fontWeight: 500 }}>{name}</code>

      {/* Pixel value */}
      <span style={{ fontSize: 12, color: '#7a6e65', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </span>

      {/* Bar */}
      <div style={{
        height: 20,
        background: '#f5f2ee',
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {!isZero && (
          <div style={{
            width: `${pct}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #e8195a, #f5a623)',
            borderRadius: 4,
            minWidth: 3,
          }} />
        )}
        {isZero && (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 8,
            fontSize: 10,
            color: '#c0b8ae',
          }}>
            0
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Story config ─────────────────────────────────────────────────────────────

export default {
  title: 'Design Tokens/Spacing',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '4px base-unit spacing scale. Step names loosely map to multipliers — `space/4` = 16px (4 × 4px). Bars are proportional to the maximum value (320px).',
      },
    },
  },
};

// ─── Story ────────────────────────────────────────────────────────────────────

export const Scale = {
  render: () => (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: '#fdfaf6', padding: 32, maxWidth: 800 }}>
      {/* Header row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '120px 56px 1fr',
        gap: 16,
        paddingBottom: 10,
        marginBottom: 4,
        borderBottom: '2px solid #ece8e2',
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#a09488' }}>Token</span>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#a09488', textAlign: 'right' }}>Value</span>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#a09488' }}>Scale</span>
      </div>

      {SPACING.map(({ name, key }) => (
        <SpacingRow key={name} name={name} value={lightTokens[key]} />
      ))}
    </div>
  ),
};
