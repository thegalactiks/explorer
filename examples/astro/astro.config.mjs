import galactiks, { integrationsPreset } from '@galactiks/astro-integration';

// https://astro.build/config
export default /** @type {import('astro').AstroUserConfig} */ {
  integrations: [integrationsPreset(), galactiks()],
};
