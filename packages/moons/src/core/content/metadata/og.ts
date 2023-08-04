import type { Content, MetadataHeaders } from '../types';

export const getOpenGraphFromEntry = (entry: Content): MetadataHeaders['openGraph'] => ({
  title: entry.name,
  description: entry.description,
  url: entry.url,
});
