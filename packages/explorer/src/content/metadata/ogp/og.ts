import { getConfig } from '@galactiks/config';
import type { Content, MetadataHeaders } from '../../../types/index.js';

import { getArticle } from './article.js';
import { getWebsite } from './website.js';

const getOpenGraphByType = (document: Content): MetadataHeaders['openGraph'] => {
  if (document.type === 'Article') {
    return getArticle(document);
  }

  return getWebsite(document);
}

export const getOpenGraphObjects = (
  document: Content
): MetadataHeaders['openGraph'] => {
  const headers = getOpenGraphByType(document) || [];

  const { webManifest, openGraph } = getConfig();
  const siteName = openGraph?.siteName || webManifest?.name;
  if (siteName) {
    headers.push({ property: 'og:siteName', content: siteName });
  }

  return headers;
};
