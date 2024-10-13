import galactiks, { integrationsPreset } from '@galactiks/astro-integration';
import path from 'path';

process.env.CONTENT_PATH = path.join(process.cwd(), '../contentlayer');

// https://astro.build/config
export default /** @type {import('astro').AstroUserConfig} */ {
  integrations: [integrationsPreset(), galactiks()],
};
