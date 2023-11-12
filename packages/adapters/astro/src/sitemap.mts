import type { SitemapItem } from '@astrojs/sitemap';
import { getConfig } from '@galactiks/config';
import { getPageByURL } from '@galactiks/explorer';
import { isValid } from 'date-fns';
import Debug from 'debug';

const debug = Debug('@galactiks/astro-integration:sitemap');

export const sitemapSerialize =
  (defaultLanguage?: string) => async (item: SitemapItem) => {
    debug('serializing item', item);

    const page = await getPageByURL(item.url);
    if (!page) {
      debug('page not found for the item', item);

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
          language: (page.inLanguage || defaultLanguage)
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
  };
