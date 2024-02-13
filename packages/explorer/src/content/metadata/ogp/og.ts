import type { Content, MetadataHeaders } from '../../../types';

import { getArticle } from './article';
import { getWebsite } from './website';

export const getOpenGraphObjects = (
  document: Content
): MetadataHeaders['openGraph'] => {
  if (document.type === 'Article') {
    return getArticle(document);
  }

  return getWebsite(document);
};
