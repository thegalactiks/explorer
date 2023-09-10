import type { Content, MetadataHeaders } from '../../types/index.mjs';

import { getArticle } from './article.mjs';
import { getWebsite } from './website.mjs';

export const getOpenGraphObjects = (
  document: Content
): MetadataHeaders['openGraph'] => {
  if (document.type === 'Article') {
    return getArticle(document);
  }

  return getWebsite(document);
};
