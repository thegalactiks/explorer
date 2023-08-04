import type { Content, MetadataHeaders } from '../types';

export const getHeadersFromEntry = (entry: Content): MetadataHeaders => ({
  title: entry.name,
  description: entry.description,
  canonical: entry.url,
  alternates: [
    { href: entry.url!, hreflang: 'x-default' },
  ],
  robots: 'index,follow'
})
