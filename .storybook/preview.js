import '../dist/css/tokens.light.css';
import '../dist/css/tokens.dark.css';
import '../stories/button.css';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;