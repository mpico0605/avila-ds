import { defineConfig } from 'vite';

// @vitejs/plugin-react is omitted here — @storybook/react-vite adds it automatically.
// Adding it twice breaks Storybook's virtual module setup (__STORYBOOK_MODULE_PREVIEW_API__).
export default defineConfig({
  plugins: [],
});
