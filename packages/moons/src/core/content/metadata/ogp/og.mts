import { collectionName } from '../../consts.mjs'
import type { Content, MetadataHeaders } from '../../types/index.mjs'

import { getArticle } from './article.mjs'
import { getWebsite } from './website.mjs'

export const getOpenGraphObjects = (document: Content): MetadataHeaders['openGraph'] => {
  if (document.collection === collectionName.article) {
    return getArticle(document)
  }

  return getWebsite(document)
}
