import type { AstroIntegration } from 'astro';
import partytown from '@astrojs/partytown';
import prefetch from '@astrojs/prefetch';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { getConfig, getDefaultLanguage, getLanguages } from '@galactiks/config';
import { getPageByURL } from '@galactiks/explorer';
import critters from 'astro-critters';
import robotsTxt from 'astro-robots-txt';
import { isValid } from 'date-fns';

const defaultLocale = getDefaultLanguage();

export const integrationsPreset = (): AstroIntegration[] => [
  react(),
  partytown(),
  prefetch(),
  sitemap({
    i18n: defaultLocale
      ? {
          defaultLocale,
          locales: Object.fromEntries(
            getLanguages().map((lang) => [lang, lang])
          ),
        }
      : undefined,
    serialize: async (item) => {
      const page = await getPageByURL(item.url);
      if (!page) {
        return undefined;
      }

      return {
        url: page.url,
        lastmod: isValid(page.dateModified)
          ? page.dateModified.toISOString()
          : undefined,
        news: page.type === 'Article' && {
          publication: {
            name: getConfig().webManifest.name,
            language: (page.inLanguage && getDefaultLanguage())
              ?.substring(0, 2)
              .toLowerCase(),
          },

          publication_date: isValid(page.datePublished)
            ? page.datePublished.toISOString()
            : undefined,
          title: page.name,
          keywords: page.keywords?.join(', '),
        },
      };
    },
  }),
  robotsTxt(),
  critters(),
];
