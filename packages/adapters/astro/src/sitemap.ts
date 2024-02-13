import type { SitemapItem } from '@astrojs/sitemap';
import { getPageByURL } from '@galactiks/explorer';
import { isValid } from 'date-fns';
import Debug from 'debug';

const debug = Debug('@galactiks/astro-integration:sitemap');

export const sitemapSerialize =
  () =>
  async (item: SitemapItem): Promise<SitemapItem | undefined> => {
    debug('serializing item', item);

    const page = await getPageByURL(item.url);
    if (!page) {
      debug('page not found for the item', item);

      return undefined;
    }

    // TODO: move to new sitemap package
    // Currently astro sitemap does not support more than some properties
    // Create a deadly simple sitemap package (not only astro) which get galactiks content and create a sitemap from it
    return {
      url: page.url,
      lastmod: isValid(page.dateModified)
        ? page.dateModified.toISOString()
        : undefined,
      changefreq: undefined,
      priority: undefined,
      links: [], // TODO: add alternates links
      // news: page.type === 'Article' ? {
      //   publication: {
      //     name: getConfig().webManifest.name,
      //     language: (page.inLanguage || defaultLanguage)
      //       ?.substring(0, 2)
      //       .toLowerCase(),
      //   },

      //   publication_date: isValid(page.datePublished)
      //     ? page.datePublished.toISOString()
      //     : undefined,
      //   title: page.name,
      //   keywords: page.keywords?.join(', '),
      // } : undefined,
    };
  };
