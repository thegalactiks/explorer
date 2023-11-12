import type { AstroIntegration } from 'astro';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { getDefaultLanguage, getLanguages } from '@galactiks/config';
import critters from 'astro-critters';
import robotsTxt from 'astro-robots-txt';

import { sitemapSerialize } from './sitemap.mjs';

export const integrationsPreset = (): AstroIntegration[] => {
  const defaultLanguage = getDefaultLanguage();

  return ([
    react(),
    partytown(),
    sitemap({
      i18n: defaultLanguage
        ? {
          defaultLocale: defaultLanguage,
          locales: Object.fromEntries(
            getLanguages().map((lang) => [lang, lang])
          ),
        }
        : undefined,
      serialize: sitemapSerialize(defaultLanguage),
    }),
    robotsTxt(),
    critters(),
  ]);
};
