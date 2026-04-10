import React from 'react';
import lightTokens from '../../dist/json/tokens.light.json';
import darkTokens from '../../dist/json/tokens.dark.json';

// ─── Utilities ────────────────────────────────────────────────────────────────

function relativeLuminance(hex) {
  if (!hex || !hex.startsWith('#') || hex.length < 7) return 1;
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function textOn(bg) {
  return relativeLuminance(bg) > 0.3 ? '#1a1208' : '#f5f0e8';
}

// ─── Components ───────────────────────────────────────────────────────────────

function Swatch({ path, value, description, size = 'md' }) {
  const h = { sm: 52, md: 76, lg: 108 }[size] ?? 76;
  const isValidColor = value && value.startsWith('#') && value.length >= 7;
  return (
    <div style={{
      borderRadius: 8,
      overflow: 'hidden',
      border: '1px solid #ece8e2',
      minWidth: 140,
      flex: '1 1 140px',
      maxWidth: 200,
    }}>
      <div style={{ height: h, background: isValidColor ? value : '#ece8e2', position: 'relative' }}>
        {!isValidColor && (
          <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#a09488' }}>
            alpha
          </span>
        )}
      </div>
      <div style={{ padding: '10px 12px', background: '#ffffff' }}>
        <code style={{ fontSize: 10, color: '#1a1208', display: 'block', fontWeight: 600, lineHeight: 1.5, wordBreak: 'break-all' }}>
          {path}
        </code>
        <code style={{ fontSize: 10, color: '#7a6e65', display: 'block', marginTop: 2 }}>
          {value}
        </code>
        {description && (
          <p style={{ fontSize: 10, color: '#a09488', margin: '5px 0 0', lineHeight: 1.45 }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function Group({ title, note, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
        <h3 style={{
          margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: '#7a6e65',
        }}>
          {title}
        </h3>
        {note && <span style={{ fontSize: 11, color: '#a09488' }}>{note}</span>}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {children}
      </div>
    </div>
  );
}

function Page({ bg = '#fdfaf6', children }) {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', background: bg, padding: 32, minHeight: '100vh' }}>
      {children}
    </div>
  );
}

function swatches(entries) {
  return entries.map(([path, value, desc, size]) => (
    <Swatch key={path} path={path} value={value} description={desc} size={size} />
  ));
}

// ─── Token data ───────────────────────────────────────────────────────────────

const BRAND = [
  ['primitive.color.hot-pink',  lightTokens.PrimitiveColorHotPink,  'Primary accent · section chips · CTAs',    'lg'],
  ['primitive.color.marigold',  lightTokens.PrimitiveColorMarigold, 'Metrics · highlights · Marigold tags',     'lg'],
  ['primitive.color.cobalt',    lightTokens.PrimitiveColorCobalt,   'Cobalt callout tags · links · info',       'lg'],
  ['primitive.color.teal',      lightTokens.PrimitiveColorTeal,     'Teal callout tags · success · scope',      'lg'],
  ['primitive.color.ink-100',   lightTokens.PrimitiveColorInk100,   'Primary text · dark backgrounds',          'lg'],
  ['primitive.color.parchment', lightTokens.PrimitiveColorParchment,'Light background · inverse text',          'lg'],
];

const BRAND_VARIANTS = [
  ['primitive.color.hot-pink-hover',   lightTokens.PrimitiveColorHotPinkHover,   'Hover on hot pink'],
  ['primitive.color.hot-pink-active',  lightTokens.PrimitiveColorHotPinkActive,  'Active / pressed hot pink'],
  ['primitive.color.hot-pink-subtle',  lightTokens.PrimitiveColorHotPinkSubtle,  'Hot pink surface tint'],
  ['primitive.color.marigold-hover',   lightTokens.PrimitiveColorMarigoldHover,  'Darker marigold hover'],
  ['primitive.color.marigold-subtle',  lightTokens.PrimitiveColorMarigoldSubtle, 'Marigold surface tint'],
  ['primitive.color.cobalt-hover',     lightTokens.PrimitiveColorCobaltHover,    'Darker cobalt hover'],
  ['primitive.color.cobalt-subtle',    lightTokens.PrimitiveColorCobaltSubtle,   'Cobalt surface tint'],
  ['primitive.color.teal-hover',       lightTokens.PrimitiveColorTealHover,      'Darker teal hover'],
  ['primitive.color.teal-subtle',      lightTokens.PrimitiveColorTealSubtle,     'Teal surface tint'],
];

const INK_SCALE = [
  ['primitive.color.ink-100', lightTokens.PrimitiveColorInk100, ''],
  ['primitive.color.ink-90',  lightTokens.PrimitiveColorInk90,  ''],
  ['primitive.color.ink-80',  lightTokens.PrimitiveColorInk80,  ''],
  ['primitive.color.ink-70',  lightTokens.PrimitiveColorInk70,  ''],
  ['primitive.color.ink-60',  lightTokens.PrimitiveColorInk60,  ''],
  ['primitive.color.ink-50',  lightTokens.PrimitiveColorInk50,  '55% ink — muted labels, sub-text'],
  ['primitive.color.ink-40',  lightTokens.PrimitiveColorInk40,  ''],
  ['primitive.color.ink-30',  lightTokens.PrimitiveColorInk30,  ''],
  ['primitive.color.ink-20',  lightTokens.PrimitiveColorInk20,  ''],
  ['primitive.color.ink-10',  lightTokens.PrimitiveColorInk10,  ''],
  ['primitive.color.ink-05',  lightTokens.PrimitiveColorInk05,  ''],
];

const PARCHMENT_SCALE = [
  ['primitive.color.parchment',      lightTokens.PrimitiveColorParchment,     'Light background · inverse text'],
  ['primitive.color.parchment-dark', lightTokens.PrimitiveColorParchmentDark, 'Parchment border / divider'],
  ['primitive.color.off-white',      lightTokens.PrimitiveColorOffWhite,      'Surface / page background'],
  ['primitive.color.white',          lightTokens.PrimitiveColorWhite,         ''],
];

const FEEDBACK_PRIMITIVES = [
  ['primitive.color.success-base',   lightTokens.PrimitiveColorSuccessBase,   ''],
  ['primitive.color.success-subtle', lightTokens.PrimitiveColorSuccessSubtle, ''],
  ['primitive.color.warning-base',   lightTokens.PrimitiveColorWarningBase,   ''],
  ['primitive.color.warning-subtle', lightTokens.PrimitiveColorWarningSubtle, ''],
  ['primitive.color.error-base',     lightTokens.PrimitiveColorErrorBase,     ''],
  ['primitive.color.error-subtle',   lightTokens.PrimitiveColorErrorSubtle,   ''],
  ['primitive.color.info-base',      lightTokens.PrimitiveColorInfoBase,      ''],
  ['primitive.color.info-subtle',    lightTokens.PrimitiveColorInfoSubtle,    ''],
];

function buildSemanticGroups(t) {
  return {
    Background: [
      ['color.background.page',           t.ColorBackgroundPage,          'Main page background'],
      ['color.background.surface',        t.ColorBackgroundSurface,       'Card / panel surface'],
      ['color.background.surface-raised', t.ColorBackgroundSurfaceRaised, 'Elevated modal / dropdown'],
      ['color.background.surface-sunken', t.ColorBackgroundSurfaceSunken, 'Inset / input background'],
      ['color.background.overlay',        t.ColorBackgroundOverlay,       'Modal scrim'],
    ],
    Text: [
      ['color.text.primary',    t.ColorTextPrimary,   'Primary body text'],
      ['color.text.secondary',  t.ColorTextSecondary, 'Secondary / caption text'],
      ['color.text.muted',      t.ColorTextMuted,     'Placeholder, disabled text'],
      ['color.text.inverse',    t.ColorTextInverse,   'Text on dark / colored surfaces'],
      ['color.text.accent',     t.ColorTextAccent,    'Highlighted / brand text'],
      ['color.text.link',       t.ColorTextLink,      'Hyperlinks'],
      ['color.text.link-hover', t.ColorTextLinkHover, 'Link hover'],
      ['color.text.on-accent',  t.ColorTextOnAccent,  'Text sitting on accent bg'],
    ],
    Border: [
      ['color.border.default', t.ColorBorderDefault, 'Default card / input border'],
      ['color.border.strong',  t.ColorBorderStrong,  'Strong border, separator'],
      ['color.border.focus',   t.ColorBorderFocus,   'Focus ring'],
      ['color.border.accent',  t.ColorBorderAccent,  'Accent / brand border'],
    ],
    Interactive: [
      ['color.interactive.primary-bg',        t.ColorInteractivePrimaryBg,       'Primary button bg'],
      ['color.interactive.primary-bg-hover',  t.ColorInteractivePrimaryBgHover,  'Primary button hover'],
      ['color.interactive.primary-bg-active', t.ColorInteractivePrimaryBgActive, 'Primary button active/pressed'],
      ['color.interactive.primary-text',      t.ColorInteractivePrimaryText,     'Primary button label'],
      ['color.interactive.secondary-bg',      t.ColorInteractiveSecondaryBg,     'Secondary button bg'],
      ['color.interactive.secondary-text',    t.ColorInteractiveSecondaryText,   'Secondary button label'],
      ['color.interactive.ghost-text',        t.ColorInteractiveGhostText,       'Ghost button label'],
      ['color.interactive.ghost-border',      t.ColorInteractiveGhostBorder,     'Ghost button border'],
    ],
    Accent: [
      ['color.accent.hot-pink',        t.ColorAccentHotPink,        'Hot Pink accent'],
      ['color.accent.hot-pink-subtle', t.ColorAccentHotPinkSubtle,  'Hot Pink tint bg'],
      ['color.accent.marigold',        t.ColorAccentMarigold,       'Marigold accent'],
      ['color.accent.marigold-subtle', t.ColorAccentMarigoldSubtle, 'Marigold tint bg'],
      ['color.accent.cobalt',          t.ColorAccentCobalt,         'Cobalt accent'],
      ['color.accent.cobalt-subtle',   t.ColorAccentCobaltSubtle,   'Cobalt tint bg'],
      ['color.accent.teal',            t.ColorAccentTeal,           'Teal accent'],
      ['color.accent.teal-subtle',     t.ColorAccentTealSubtle,     'Teal tint bg'],
    ],
    Feedback: [
      ['color.feedback.success-bg',   t.ColorFeedbackSuccessBg,   'Success background'],
      ['color.feedback.success-text', t.ColorFeedbackSuccessText, 'Success text/icon'],
      ['color.feedback.warning-bg',   t.ColorFeedbackWarningBg,   'Warning background'],
      ['color.feedback.warning-text', t.ColorFeedbackWarningText, 'Warning text/icon'],
      ['color.feedback.error-bg',     t.ColorFeedbackErrorBg,     'Error background'],
      ['color.feedback.error-text',   t.ColorFeedbackErrorText,   'Error text/icon'],
      ['color.feedback.info-bg',      t.ColorFeedbackInfoBg,      'Info background'],
      ['color.feedback.info-text',    t.ColorFeedbackInfoText,    'Info text/icon'],
    ],
    Nav: [
      ['color.nav.bg',         t.ColorNavBg,        'Nav background — always dark'],
      ['color.nav.text',       t.ColorNavText,      'Nav link text'],
      ['color.nav.text-muted', t.ColorNavTextMuted, 'Inactive nav links'],
      ['color.nav.border',     t.ColorNavBorder,    'Nav bottom border'],
      ['color.nav.cta-bg',     t.ColorNavCtaBg,     'Nav CTA button'],
      ['color.nav.cta-text',   t.ColorNavCtaText,   'Nav CTA label'],
    ],
    Card: [
      ['color.card.bg-light', t.ColorCardBgLight, 'Default card background'],
      ['color.card.bg-dark',  t.ColorCardBgDark,  'Dark card variant'],
      ['color.card.border',   t.ColorCardBorder,  'Card border'],
      ['color.card.shadow',   t.ColorCardShadow,  'Card shadow color'],
    ],
  };
}

// ─── Story config ─────────────────────────────────────────────────────────────

export default {
  title: 'Design Tokens/Color',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Color tokens from the AVILA UI Figma design system. Primitives are raw hex values. Semantic tokens resolve to primitives and change across light and dark mode.',
      },
    },
  },
};

// ─── Stories ──────────────────────────────────────────────────────────────────

export const BrandPalette = {
  name: 'Brand Palette',
  render: () => (
    <Page>
      <Group title="Brand" note="Core brand colors">{swatches(BRAND)}</Group>
      <Group title="Brand — Interactions &amp; Tints">{swatches(BRAND_VARIANTS)}</Group>
    </Page>
  ),
};

export const InkScale = {
  name: 'Ink Scale',
  render: () => (
    <Page>
      <Group title="Ink" note="Dark neutral scale — ink-100 is the deepest">{swatches(INK_SCALE)}</Group>
      <Group title="Parchment &amp; Whites">{swatches(PARCHMENT_SCALE)}</Group>
      <Group title="Feedback Primitives" note="Base + subtle pairs for success, warning, error, info">
        {swatches(FEEDBACK_PRIMITIVES)}
      </Group>
    </Page>
  ),
};

function SemanticPage({ tokens, bg }) {
  const groups = buildSemanticGroups(tokens);
  return (
    <Page bg={bg}>
      {Object.entries(groups).map(([name, entries]) => (
        <Group key={name} title={name}>{swatches(entries)}</Group>
      ))}
    </Page>
  );
}

export const SemanticLight = {
  name: 'Semantic — Light',
  render: () => <SemanticPage tokens={lightTokens} bg={lightTokens.ColorBackgroundPage} />,
};

export const SemanticDark = {
  name: 'Semantic — Dark',
  render: () => <SemanticPage tokens={darkTokens} bg={darkTokens.ColorBackgroundPage} />,
};
