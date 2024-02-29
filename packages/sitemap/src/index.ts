import type { Content } from '@galactiks/explorer';
import { type SitemapItem, SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { join } from 'path';

import { type SerializeOptions, sitemapSerialize } from './serialize.js';

function createSitemap(hostname: string, type: string, items: SitemapItem[]) {
  const stream = new SitemapStream({
    hostname,
    xmlns: {
      news: type === 'Article' ? true : false,
      xhtml: true,
      image: false,
      video: false,
    },
  });
  items.forEach(item => stream.write(item));
  stream.end();

  return stream;
}

type GenerateSitemapsOptions = SerializeOptions & {
  destinationDir: string;
  pages: Content[];
  hostname: string;
};

export async function generateSitemaps({ destinationDir, hostname, pages, defaultLanguage, publication }: GenerateSitemapsOptions) {
  const serialize = sitemapSerialize({ defaultLanguage, publication });

  const sitemapsItems = pages.reduce((acc, page) => {
    const { type } = page;
    if (!acc[type]) {
      acc[type] = [];
    }

    acc[type].push(serialize(page));
    return acc;
  }, {} as Record<string, SitemapItem[]>);

  const sitemaps = Object.entries(sitemapsItems).reduce((acc, [type, items]) => {
    acc[type] = createSitemap(hostname, type, items);
    return acc;
  }, {} as Record<string, SitemapStream>);

  // Generate index sitemap
  const indexSitemap = new SitemapStream({
    hostname,
    xmlns: {
      news: true,
      xhtml: true,
      image: false,
      video: false,
    },
  });
  Object.entries(sitemaps).forEach(([type, stream]) => {
    const sitemapPath = `/sitemap-${type.toLowerCase()}.xml`;

    indexSitemap.write({ url: sitemapPath });
    stream.pipe(createWriteStream(join(destinationDir, sitemapPath)));
  });
  indexSitemap.pipe(createWriteStream(join(destinationDir, `sitemap-index.xml`)));
  return streamToPromise(indexSitemap).then(data => data.toString());
}
