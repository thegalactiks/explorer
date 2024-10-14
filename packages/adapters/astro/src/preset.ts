import type { AstroUserConfig } from 'astro';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import robotsTxt from 'astro-robots-txt';

import sitemap from './plugins/sitemap.js';

export const integrationsPreset = (): AstroUserConfig['integrations'] => {
  return [
    react(),
    partytown(),
    robotsTxt({
      sitemapBaseFileName: 'sitemap-index',
    }),
    sitemap(),
  ];
};
