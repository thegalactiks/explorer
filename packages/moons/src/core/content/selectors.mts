import { MaxDepthLimitReachedError } from '../exceptions/index.mjs'
import { pageDepthLimit } from './consts.mjs'
import type { ContentlayerDocumentTypes, ContentlayerWebPageDocument } from './types/index.mjs'

export const documentByIdentifierSelector = <T extends Pick<ContentlayerDocumentTypes, 'identifier'>>(documents: T[]) => (identifier: string) => documents.find(_d => _d.identifier === identifier)

export const pageDepthSelector = <T extends Pick<ContentlayerWebPageDocument, 'identifier' | 'isPartOf'>>(documents: T[]) => (document: T): number => { 
  const selectPageByIdentifier = documentByIdentifierSelector(documents)
  const computePageDepth = (document: T, depth = 0): number => {
    if (depth > pageDepthLimit) {
      throw new MaxDepthLimitReachedError()
    }

    if (!document.isPartOf) {
      return depth
    }
  
    const parent = selectPageByIdentifier(document.isPartOf)
    if (!parent) {
      throw new Error(`Error during page depth computation. The parent ${document.isPartOf} is missing`)
    }
  
    return computePageDepth(parent, depth + 1)
  }

  return computePageDepth(document)
}
