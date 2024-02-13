import rss, { type RSSFeedItem } from '@astrojs/rss';
import { getConfig } from '@galactiks/config';
import { getWebPageDocumentsByType } from '@galactiks/explorer';
import type { APIContext } from 'astro';
import Debug from 'debug';

const debug = Debug('@galactiks/astro-integration:rss');

export async function getRSS(context: APIContext) {
  const config = getConfig();
  const articles = await getWebPageDocumentsByType('Article');

  const items: RSSFeedItem[] = articles.map((item) => {
    debug('generating rss item', item);

    return {
      title: item.name,
      description: item.description,
      link: item.url,
      pubDate: item.datePublished,
    };
  });

  return rss({
    title: config.webManifest.name,
    description: config.webManifest.description,
    site: context.site ? context.site.toString() : '',
    items,
  });
}
