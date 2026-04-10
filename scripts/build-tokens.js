import StyleDictionary from 'style-dictionary';
import configs from '../config/style-dictionary.config.js';
import { watch } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const watchMode = process.argv.includes('--watch');

async function build() {
  console.log('\nBuilding design tokens...');
  try {
    const configArray = Array.isArray(configs) ? configs : [configs];
    for (const config of configArray) {
      const sd = new StyleDictionary(config);
      await sd.buildAllPlatforms();
    }
    console.log('Tokens built successfully.\n');
  } catch (err) {
    console.error('Build failed:', err.message);
    if (!watchMode) process.exit(1);
  }
}

build().then(() => {
  if (watchMode) {
    const tokenDir = resolve(__dirname, '../tokens');
    console.log(`Watching ${tokenDir} for changes...`);
    watch(tokenDir, { recursive: true }, (eventType, filename) => {
      if (filename && filename.endsWith('.json')) {
        console.log(`Change detected in ${filename}`);
        build();
      }
    });
  }
});
