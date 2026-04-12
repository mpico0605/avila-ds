import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const COMMON = {
  brandTitle: 'AvilaDS',
  brandUrl: 'https://avilaDS-storybook-tokens.vercel.app',
  brandTarget: '_blank',
  colorPrimary:   '#e8195a',   // --avila-color-interactive-primary-bg (hot pink)
  colorSecondary: '#e8195a',
  fontBase: "'Oswald', sans-serif",
  fontCode: "'JetBrains Mono', 'Fira Code', monospace",
  appBorderRadius: 6,
  inputBorderRadius: 4,
};

const darkTheme = create({
  ...COMMON,
  base: 'dark',

  // Canvas / shell backgrounds
  appBg:        '#2e2416',   // --avila-primitive-color-ink-90 surface
  appContentBg: '#1a1208',   // --avila-primitive-color-ink-100 (page bg)
  appPreviewBg: '#1a1208',
  appBorderColor: '#4a3828', // --avila-primitive-color-ink-80

  // Text
  textColor:        '#fdfaf6', // --avila-primitive-color-off-white
  textInverseColor: '#1a1208',
  textMutedColor:   '#a09080', // --avila-primitive-color-ink-40 (dark-mode muted)

  // Toolbar
  barTextColor:     '#c8b89a', // --avila-primitive-color-ink-30 (dark)
  barHoverColor:    '#e8195a',
  barSelectedColor: '#e8195a',
  barBg:            '#2e2416',

  // Inputs
  inputBg:        '#2e2416',
  inputBorder:    '#4a3828',
  inputTextColor: '#fdfaf6',
});

const lightTheme = create({
  ...COMMON,
  base: 'light',

  appBg:        '#f5f0e8',   // --avila-primitive-color-parchment
  appContentBg: '#fdfaf6',   // --avila-primitive-color-off-white
  appPreviewBg: '#fdfaf6',
  appBorderColor: '#d8d2ca', // --avila-primitive-color-ink-20

  textColor:        '#1a1208', // --avila-primitive-color-ink-100
  textInverseColor: '#fdfaf6',
  textMutedColor:   '#7a6e65', // --avila-primitive-color-ink-50

  barTextColor:     '#4f3e2c', // --avila-primitive-color-ink-70
  barHoverColor:    '#e8195a',
  barSelectedColor: '#e8195a',
  barBg:            '#f5f0e8',

  inputBg:        '#fdfaf6',
  inputBorder:    '#c0b8ae',   // --avila-primitive-color-ink-30
  inputTextColor: '#1a1208',
});

// ── Manager shell is always light — the toolbar toggle only controls the
// preview/canvas area. Storybook does not support live shell theme switching
// via the toolbar global, so we hardcode light to match the default preview theme.
addons.setConfig({ theme: lightTheme });
