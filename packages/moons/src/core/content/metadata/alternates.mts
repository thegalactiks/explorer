import type { Content, MetadataHeaders } from '../index.mjs'
import type { ContentlayerDocumentWithURL } from '../urls.mjs'

export const alternatesHeaderBuilder = (documents: ContentlayerDocumentWithURL[]) => (document: Content): MetadataHeaders['alternates'] => {
  const alternates: MetadataHeaders['alternates'] = [
    { href: document.url, hreflang: 'x-default' },
  ]

  return alternates
}
