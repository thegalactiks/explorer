import type { Content, MetadataHeaders } from '../../types/index.js';

export const getBasicHeaders = (entry: Content): MetadataHeaders => ({
  title: entry.name,
  description: entry.description,
  canonical: entry.url,
  robots: 'index,follow',
});
