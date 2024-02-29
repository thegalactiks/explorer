import type { AstroIntegration } from 'astro';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import robotsTxt from 'astro-robots-txt';

import sitemap from './plugins/sitemap.js';

export const integrationsPreset = (): AstroIntegration[] => {
  return [
    react(),
    partytown(),
    sitemap(),
    robotsTxt(),
  ];
};
