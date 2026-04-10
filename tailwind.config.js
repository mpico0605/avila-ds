/**
 * tailwind.config.js — AvilaDS Design System
 *
 * Generated from dist/json/tokens.light.json + dist/css/tokens.light.css
 *
 * Colors reference CSS custom properties (var(--avila-...)) so that
 * switching data-theme="dark" on any ancestor automatically updates every
 * Tailwind color utility without a config change or rebuild.
 *
 * Spacing and borderRadius use direct px values because Tailwind resolves
 * those at build time; CSS variable spacing is supported but requires
 * careful handling of Tailwind's calc() internals.
 *
 * Re-run `npm run build:tokens` whenever Figma tokens change — the CSS
 * variables used here are updated automatically in dist/css/.
 */

// ─── Helper ───────────────────────────────────────────────────────────────────
// Wraps any --avila-* variable name in a CSS var() reference.
const v = (name) => `var(--avila-${name})`;

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './stories/**/*.{js,jsx,ts,tsx,mdx}',
    './src/**/*.{js,jsx,ts,tsx,mdx}',
  ],

  darkMode: ['selector', '[data-theme="dark"]'],

  theme: {
    extend: {

      // ─────────────────────────────────────────────────────────────────────
      // COLORS
      //
      // Usage examples:
      //   bg-hot-pink            text-ink-50           border-border
      //   bg-background-page     text-text-muted       bg-feedback-success-bg
      //   bg-interactive-primary-bg                    bg-accent-cobalt-subtle
      // ─────────────────────────────────────────────────────────────────────
      colors: {

        // ── Brand primitives ───────────────────────────────────────────────
        // bg-hot-pink  bg-hot-pink-hover  bg-hot-pink-active  bg-hot-pink-subtle
        'hot-pink': {
          DEFAULT: v('primitive-color-hot-pink'),
          hover:   v('primitive-color-hot-pink-hover'),
          active:  v('primitive-color-hot-pink-active'),
          subtle:  v('primitive-color-hot-pink-subtle'),
        },
        // bg-marigold  bg-marigold-hover  bg-marigold-subtle
        marigold: {
          DEFAULT: v('primitive-color-marigold'),
          hover:   v('primitive-color-marigold-hover'),
          subtle:  v('primitive-color-marigold-subtle'),
        },
        // bg-cobalt  bg-cobalt-hover  bg-cobalt-subtle
        cobalt: {
          DEFAULT: v('primitive-color-cobalt'),
          hover:   v('primitive-color-cobalt-hover'),
          subtle:  v('primitive-color-cobalt-subtle'),
        },
        // bg-teal  bg-teal-hover  bg-teal-subtle
        teal: {
          DEFAULT: v('primitive-color-teal'),
          hover:   v('primitive-color-teal-hover'),
          subtle:  v('primitive-color-teal-subtle'),
        },

        // ── Ink neutral scale ──────────────────────────────────────────────
        // bg-ink-100 … bg-ink-5   /   text-ink-50   border-ink-10
        ink: {
          100: v('primitive-color-ink-100'),
          90:  v('primitive-color-ink-90'),
          80:  v('primitive-color-ink-80'),
          70:  v('primitive-color-ink-70'),
          60:  v('primitive-color-ink-60'),
          50:  v('primitive-color-ink-50'),
          40:  v('primitive-color-ink-40'),
          30:  v('primitive-color-ink-30'),
          20:  v('primitive-color-ink-20'),
          10:  v('primitive-color-ink-10'),
          5:   v('primitive-color-ink-05'),
        },

        // ── Parchment + whites ─────────────────────────────────────────────
        // bg-parchment   bg-parchment-dark   bg-off-white
        parchment: {
          DEFAULT: v('primitive-color-parchment'),
          dark:    v('primitive-color-parchment-dark'),
        },
        'off-white': v('primitive-color-off-white'),

        // ── Feedback primitives ────────────────────────────────────────────
        // bg-success   bg-success-subtle   text-warning   bg-error-subtle
        success: {
          DEFAULT: v('primitive-color-success-base'),
          subtle:  v('primitive-color-success-subtle'),
        },
        warning: {
          DEFAULT: v('primitive-color-warning-base'),
          subtle:  v('primitive-color-warning-subtle'),
        },
        error: {
          DEFAULT: v('primitive-color-error-base'),
          subtle:  v('primitive-color-error-subtle'),
        },
        info: {
          DEFAULT: v('primitive-color-info-base'),
          subtle:  v('primitive-color-info-subtle'),
        },

        // ── Semantic — background (light/dark aware) ───────────────────────
        // bg-background-page   bg-background-surface   bg-background-overlay
        background: {
          page:              v('color-background-page'),
          surface:           v('color-background-surface'),
          'surface-raised':  v('color-background-surface-raised'),
          'surface-sunken':  v('color-background-surface-sunken'),
          overlay:           v('color-background-overlay'),
        },

        // ── Semantic — text ────────────────────────────────────────────────
        // text-text-primary   text-text-muted   text-text-accent
        text: {
          primary:      v('color-text-primary'),
          secondary:    v('color-text-secondary'),
          muted:        v('color-text-muted'),
          inverse:      v('color-text-inverse'),
          accent:       v('color-text-accent'),
          link:         v('color-text-link'),
          'link-hover': v('color-text-link-hover'),
          'on-accent':  v('color-text-on-accent'),
        },

        // ── Semantic — border ──────────────────────────────────────────────
        // border-border   border-border-strong   ring-border-focus
        border: {
          DEFAULT: v('color-border-default'),
          strong:  v('color-border-strong'),
          focus:   v('color-border-focus'),
          accent:  v('color-border-accent'),
        },

        // ── Semantic — interactive ─────────────────────────────────────────
        // bg-interactive-primary-bg   hover:bg-interactive-primary-bg-hover
        interactive: {
          'primary-bg':        v('color-interactive-primary-bg'),
          'primary-bg-hover':  v('color-interactive-primary-bg-hover'),
          'primary-bg-active': v('color-interactive-primary-bg-active'),
          'primary-text':      v('color-interactive-primary-text'),
          'secondary-bg':      v('color-interactive-secondary-bg'),
          'secondary-text':    v('color-interactive-secondary-text'),
          'ghost-text':        v('color-interactive-ghost-text'),
          'ghost-border':      v('color-interactive-ghost-border'),
        },

        // ── Semantic — accent ──────────────────────────────────────────────
        // bg-accent-hot-pink   bg-accent-cobalt-subtle   text-accent-marigold
        accent: {
          'hot-pink':        v('color-accent-hot-pink'),
          'hot-pink-subtle': v('color-accent-hot-pink-subtle'),
          marigold:          v('color-accent-marigold'),
          'marigold-subtle': v('color-accent-marigold-subtle'),
          cobalt:            v('color-accent-cobalt'),
          'cobalt-subtle':   v('color-accent-cobalt-subtle'),
          teal:              v('color-accent-teal'),
          'teal-subtle':     v('color-accent-teal-subtle'),
        },

        // ── Semantic — feedback ────────────────────────────────────────────
        // bg-feedback-success-bg   text-feedback-error-text
        feedback: {
          'success-bg':   v('color-feedback-success-bg'),
          'success-text': v('color-feedback-success-text'),
          'warning-bg':   v('color-feedback-warning-bg'),
          'warning-text': v('color-feedback-warning-text'),
          'error-bg':     v('color-feedback-error-bg'),
          'error-text':   v('color-feedback-error-text'),
          'info-bg':      v('color-feedback-info-bg'),
          'info-text':    v('color-feedback-info-text'),
        },

        // ── Semantic — nav ─────────────────────────────────────────────────
        // bg-nav-bg   text-nav-text   bg-nav-cta-bg
        nav: {
          bg:           v('color-nav-bg'),
          text:         v('color-nav-text'),
          'text-muted': v('color-nav-text-muted'),
          border:       v('color-nav-border'),
          'cta-bg':     v('color-nav-cta-bg'),
          'cta-text':   v('color-nav-cta-text'),
        },

        // ── Semantic — card ────────────────────────────────────────────────
        // bg-card-bg-light   border-card-border
        card: {
          'bg-light': v('color-card-bg-light'),
          'bg-dark':  v('color-card-bg-dark'),
          border:     v('color-card-border'),
          shadow:     v('color-card-shadow'),
        },

        // ── Semantic — misc ────────────────────────────────────────────────
        metric:  { value: v('color-metric-value') },
        chip:    { text:  v('color-chip-text')    },
        rainbow: {
          'hot-pink': v('color-rainbow-hot-pink'),
          marigold:   v('color-rainbow-marigold'),
          cobalt:     v('color-rainbow-cobalt'),
          teal:       v('color-rainbow-teal'),
        },
      },

      // ─────────────────────────────────────────────────────────────────────
      // SPACING
      //
      // 4px base-unit scale. Matches Tailwind's default step names so
      // existing classes (p-4, gap-6, mt-8 …) keep working unchanged.
      //
      // Usage:  p-4 → 16px   gap-6 → 24px   mt-0.5 → 2px   mb-px → 1px
      // ─────────────────────────────────────────────────────────────────────
      spacing: {
        'px':   '1px',
        '0':    '0px',
        '0.5':  '2px',
        '1':    '4px',
        '1.5':  '6px',
        '2':    '8px',
        '2.5':  '10px',
        '3':    '12px',
        '3.5':  '14px',
        '4':    '16px',
        '5':    '20px',
        '6':    '24px',
        '7':    '28px',
        '8':    '32px',
        '9':    '36px',
        '10':   '40px',
        '11':   '44px',
        '12':   '48px',
        '14':   '56px',
        '16':   '64px',
        '20':   '80px',
        '24':   '96px',
        '28':   '112px',
        '32':   '128px',
        '36':   '144px',
        '40':   '160px',
        '48':   '192px',
        '56':   '224px',
        '64':   '256px',
        '80':   '320px',
      },

      // ─────────────────────────────────────────────────────────────────────
      // BORDER RADIUS
      //
      // Usage:  rounded        → 6px (md, the DEFAULT)
      //         rounded-sm     → 4px   rounded-lg  → 8px
      //         rounded-xl     → 12px  rounded-2xl → 16px
      //         rounded-full   → 9999px (pill)
      // ─────────────────────────────────────────────────────────────────────
      borderRadius: {
        none:    '0px',
        xs:      '2px',
        sm:      '4px',
        md:      '6px',
        DEFAULT: '6px',
        lg:      '8px',
        xl:      '12px',
        '2xl':   '16px',
        '3xl':   '24px',
        full:    '9999px',
      },

      // ─────────────────────────────────────────────────────────────────────
      // TYPOGRAPHY  (bonus — sourced from the same token pipeline)
      // ─────────────────────────────────────────────────────────────────────
      fontSize: {
        '2xs':  ['10px', { lineHeight: '1.5' }],
        'xs':   ['11px', { lineHeight: '1.5' }],
        'sm':   ['12px', { lineHeight: '1.5' }],
        'base': ['14px', { lineHeight: '1.5' }],
        'md':   ['16px', { lineHeight: '1.5' }],
        'lg':   ['18px', { lineHeight: '1.5' }],
        'xl':   ['20px', { lineHeight: '1.25' }],
        '2xl':  ['24px', { lineHeight: '1.25' }],
        '3xl':  ['28px', { lineHeight: '1.1' }],
        '4xl':  ['32px', { lineHeight: '1.1' }],
        '5xl':  ['40px', { lineHeight: '1.1' }],
        '6xl':  ['48px', { lineHeight: '1' }],
        '7xl':  ['56px', { lineHeight: '1' }],
        '8xl':  ['72px', { lineHeight: '1' }],
        '9xl':  ['96px', { lineHeight: '1' }],
        '10xl': ['112px',{ lineHeight: '1' }],
      },

      lineHeight: {
        none:    '1',
        tight:   '1.1',
        snug:    '1.25',
        normal:  '1.5',
        relaxed: '1.625',
        loose:   '2',
      },

      letterSpacing: {
        tighter: '-1.5px',
        tight:   '-0.5px',
        snug:    '-0.25px',
        normal:  '0px',
        wide:    '0.3px',
        wider:   '1px',
        widest:  '1.5px',
        ultra:   '2px',
        tracking:'3px',
      },

      fontWeight: {
        thin:       '100',
        extralight: '200',
        light:      '300',
        normal:     '400',
        medium:     '500',
        semibold:   '600',
        bold:       '700',
        extrabold:  '800',
        black:      '900',
      },

      // ─────────────────────────────────────────────────────────────────────
      // Z-INDEX
      // Usage:  z-dropdown → 100   z-modal → 400   z-tooltip → 600
      // ─────────────────────────────────────────────────────────────────────
      zIndex: {
        hide:     '-1',
        auto:     'auto',
        base:     '0',
        raised:   '10',
        dropdown: '100',
        sticky:   '200',
        overlay:  '300',
        modal:    '400',
        toast:    '500',
        tooltip:  '600',
      },

      // ─────────────────────────────────────────────────────────────────────
      // TRANSITION DURATION
      // Usage:  duration-base → 150ms   duration-slow → 300ms
      // ─────────────────────────────────────────────────────────────────────
      transitionDuration: {
        instant:  '0ms',
        fast:     '75ms',
        snappy:   '100ms',
        base:     '150ms',
        moderate: '200ms',
        slow:     '300ms',
        slower:   '400ms',
        sluggish: '500ms',
      },

      // ─────────────────────────────────────────────────────────────────────
      // SCREENS (breakpoints)
      // Usage:  sm:flex   md:grid   lg:hidden   bp-3xl:text-9xl
      // ─────────────────────────────────────────────────────────────────────
      screens: {
        'bp-xs':  '320px',
        'bp-sm':  '480px',
        'sm':     '480px',
        'md':     '768px',
        'lg':     '1024px',
        'xl':     '1280px',
        '2xl':    '1440px',
        'bp-3xl': '1920px',
      },
    },
  },

  plugins: [],
};
