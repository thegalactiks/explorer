import type { Content } from '@galactiks/explorer';
import { type SitemapItem, SitemapStream, SitemapIndexStream } from 'sitemap';
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
  items.forEach((item) => stream.write(item));
  stream.end();

  return stream;
}

type GenerateSitemapsOptions = SerializeOptions & {
  destinationDir: string;
  pages: Content[];
  hostname: string;
};

export async function generateSitemaps({
  destinationDir,
  hostname,
  pages,
  defaultLanguage,
  publication,
}: GenerateSitemapsOptions) {
  const serialize = sitemapSerialize({ defaultLanguage, publication });

  const sitemapsItems = pages.reduce(
    (acc, page) => {
      const { type } = page;
      if (!acc[type]) {
        acc[type] = [];
      }

      acc[type].push(serialize(page));
      return acc;
    },
    {} as Record<string, SitemapItem[]>
  );

  const sitemaps = Object.entries(sitemapsItems).reduce(
    (acc, [type, items]) => {
      acc[type] = createSitemap(hostname, type, items);
      return acc;
    },
    {} as Record<string, SitemapStream>
  );

  // Generate index sitemap
  const indexStream = new SitemapIndexStream();
  const streams = Object.entries(sitemaps).map(([type, stream]) => {
    const sitemapPath = `/sitemap-${type.toLowerCase()}.xml`;

    indexStream.write({ url: new URL(sitemapPath, hostname).toString() });
    return stream.pipe(createWriteStream(join(destinationDir, sitemapPath)));
  });
  indexStream.end();

  streams.push(
    indexStream.pipe(
      createWriteStream(join(destinationDir, `sitemap-index.xml`))
    )
  );

  await Promise.all(
    streams.map(
      (stream) =>
        new Promise((resolve, reject) => {
          stream.on('finish', resolve);
          stream.on('error', reject);
        })
    )
  );
}
