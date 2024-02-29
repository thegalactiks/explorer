import type { Content } from '@galactiks/explorer';
import { isValid } from 'date-fns';
import type { SitemapItem } from 'sitemap';

export type SerializeOptions = {
  defaultLanguage?: string;
  publication: {
    name: string;
  };
};

export function sitemapSerialize(config: SerializeOptions) {
  return (page: Content): SitemapItem => {
    const isArticle = page.type === 'Article';
    const news: SitemapItem['news'] = isArticle ? {
      publication: {
        name: config.publication.name,
        language: (page.inLanguage || config.defaultLanguage || '')
          ?.substring(0, 2)
          .toLowerCase(),
      },

      publication_date: isValid(page.datePublished)
        ? page.datePublished.toISOString()
        : new Date().toISOString(),
      title: page.name,
      keywords: page.keywords?.join(', '),
    } : undefined;

    return {
      url: page.url,
      img: [],
      video: [],
      lastmod: isValid(page.dateModified)
        ? page.dateModified.toISOString()
        : undefined,
      links: [], // TODO: add alternates links
      news,
    };
  };
};
