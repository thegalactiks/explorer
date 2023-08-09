import { getConfig } from '@withmoons/config'
import { join } from 'path'
import type { ContentlayerWebPageDocument } from './types/index.mjs'
import { pageDepthSelector } from './selectors.mjs'
import type { ContentlayerWebPageDocumentWithRender } from './render.mjs'
import { pageByIdentifierSelector } from './selectors.mjs'

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
type ContentlayerDocumentWithPath = WithRequired<ContentlayerWebPageDocument, 'path'>
export type ContentlayerDocumentWithURL = WithRequired<ContentlayerDocumentWithPath, 'url'>

const _getPath = (document: ContentlayerWebPageDocument): string => {
  if (document.path) {
    return join('/', document.path)
  }

  return document.identifier === 'index' ? '/' : `/${document.identifier}`
}

const _getDocumentUrl = (document: ContentlayerDocumentWithPath): string => {
  if (document.url) {
    return document.url
  }

  const { webManifest: { start_url: url } } = getConfig()

  return new URL(_getPath(document), url).toString()
}

export const computeDocumentsUrl = async (documents: ContentlayerWebPageDocumentWithRender[]) => {
  const getDocumentByIdentifier = pageByIdentifierSelector(documents)

  const computePath = (document: ContentlayerWebPageDocument): string => {
    const path = _getPath(document);
    if (!document.isPartOf) {
      return path
    }

    // The page has been created if missing
    const parent = getDocumentByIdentifier(document.isPartOf) as ContentlayerDocumentWithPath
    return join(_getPath(parent), path)
  }

  const selectPageDepth = pageDepthSelector(documents)
  return documents
    .sort(_d => selectPageDepth(_d))
    .map(document => {
      // TODO: take language into account with a path pattern in the moons config
      // if (entry.inLanguage) {
      // }

      document.path = computePath(document)
      document.url = _getDocumentUrl(document as ContentlayerDocumentWithPath)

      return document as ContentlayerWebPageDocumentWithRender & ContentlayerDocumentWithURL
    })
}
