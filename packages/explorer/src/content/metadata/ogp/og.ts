import type { Content, MetadataHeaders } from '../../../types/index.js';

import { getArticle } from './article.js';
import { getWebsite } from './website.js';

export const getOpenGraphObjects = (
  document: Content
): MetadataHeaders['openGraph'] => {
  if (document.type === 'Article') {
    return getArticle(document);
  }

  return getWebsite(document);
};
