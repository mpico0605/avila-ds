const sources = {
  shared: [
    'tokens/primitives.json',
    'tokens/spacing.json',
    'tokens/border-radius.json',
    'tokens/sizing.json',
    'tokens/z-index.json',
    'tokens/typography.json',
    'tokens/opacity.json',
    'tokens/duration.json',
    'tokens/elevation.json',
    'tokens/breakpoints.json'
  ]
};

function platforms(mode) {
  return {
    // ── CSS custom properties ──────────────────────────────────────────────────
    css: {
      transformGroup: 'css',
      prefix: 'avila',
      buildPath: 'dist/css/',
      files: [
        {
          destination: `tokens.${mode}.css`,
          format: 'css/variables',
          options: {
            outputReferences: true,
            selector: mode === 'light' ? ':root, [data-theme="light"]' : '[data-theme="dark"]'
          }
        }
      ]
    },

    // ── JavaScript ES6 exports ─────────────────────────────────────────────────
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [
        {
          destination: `tokens.${mode}.js`,
          format: 'javascript/esm'
        }
      ]
    },

    // ── Flat JSON ─────────────────────────────────────────────────────────────
    json: {
      transformGroup: 'js',
      buildPath: 'dist/json/',
      files: [
        {
          destination: `tokens.${mode}.json`,
          format: 'json/flat'
        }
      ]
    }
  };
}

export default [
  // ─── Light mode ─────────────────────────────────────────────────────────────
  {
    source: [...sources.shared, 'tokens/color.light.json'],
    platforms: platforms('light')
  },

  // ─── Dark mode ──────────────────────────────────────────────────────────────
  {
    source: [...sources.shared, 'tokens/color.dark.json'],
    platforms: platforms('dark')
  }
];
