import '../dist/css/tokens.light.css';
import '../dist/css/tokens.dark.css';
import '../stories/global.css';
import { withThemeByClassName } from '@storybook/addon-themes';

/** @type { import('@storybook/react').Preview } */
const preview = {
  // ── Expose a theme global so the manager can listen via GLOBALS_UPDATED ────
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Switch between light and dark token sets',
      defaultValue: 'light',
      toolbar: {
        icon: 'sun',
        items: [
          { value: 'light', icon: 'sun',  title: 'Light' },
          { value: 'dark',  icon: 'moon', title: 'Dark'  },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    // Apply canvas background to match the active theme
    (StoryFn, context) => {
      const theme = context.globals?.theme ?? 'light';
      const bg = theme === 'dark' ? '#1a1208' : '#fdfaf6';
      document.documentElement.style.background = bg;
      document.body.style.background = bg;
      return StoryFn();
    },
    withThemeByClassName({
      themes: {
        light: 'light',
        dark:  'dark',
      },
      defaultTheme: 'light',
      parentSelector: 'html',
    }),
  ],

  parameters: {
    // ── Canvas background is controlled by the theme decorator, not the
    // backgrounds addon. The backgrounds addon has its own static toolbar that
    // doesn't sync with the theme global, so disabling it prevents it from
    // overriding the decorator's inline style on every render.
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
