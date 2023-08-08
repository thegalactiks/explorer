import type { ContentlayerWebPageDocument } from './types/index.mjs'

export const computePageDepth = (documents: ContentlayerWebPageDocument[], document: ContentlayerWebPageDocument, depth = 0): number => {
  if (!document.isPartOf) {
    return depth
  }

  const parent = documents.find(_d => _d.identifier === document.isPartOf)
  if (!parent) {
    throw new Error(`Error during page depth computation. The parent ${document.isPartOf} is missing`)
  }

  return computePageDepth(documents, parent, depth + 1)
}
