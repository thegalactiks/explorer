import { MaxDepthLimitReachedError } from '../exceptions/index.mjs'
import { pageDepthLimit } from './consts.mjs'
import type { ContentlayerDocumentTypes, ContentlayerWebPageDocument } from './types/index.mjs'

export const isInLanguage = (d: Pick<ContentlayerWebPageDocument, 'inLanguage'>, inLanguage?: string) => !inLanguage || !d.inLanguage || d.inLanguage === inLanguage

export const documentByIdentifierSelector = <T extends Pick<ContentlayerDocumentTypes, 'identifier'>>(documents: T[]) => (identifier: string) => documents.find(_d => _d.identifier === identifier)
export const documentByIdentifierAndLanguageSelector = <T extends Pick<ContentlayerWebPageDocument, 'identifier' | 'inLanguage'>>(documents: T[]) => (identifier: string, inLanguage?: string) => documents.find(_d => _d.identifier === identifier && isInLanguage(_d, inLanguage))
export const documentsByLanguagesSelector = <T extends Pick<ContentlayerWebPageDocument, 'inLanguage'>>(documents: T[]) => (inLanguages: string[]) =>
  documents.filter(_d => !_d.inLanguage || inLanguages.indexOf(_d.inLanguage) !== -1)
export const documentsByLanguageSelector = <T extends Pick<ContentlayerWebPageDocument, 'inLanguage'>>(documents: T[]) => (inLanguage: string) => documents.filter(_d => isInLanguage(_d, inLanguage))
export const documentsByAuthorSelector = <T extends Pick<ContentlayerWebPageDocument, 'author'>>(documents: T[]) => (author: string) => documents.filter(_d => _d.author === author)
export const usedLanguagesInDocumentsSelector = <T extends Pick<ContentlayerWebPageDocument, 'inLanguage'>>() => (documents: T[]) =>
  documents.reduce<string[]>((acc, _d) => (_d.inLanguage && acc.indexOf(_d.inLanguage) !== -1) ? acc.concat(_d.inLanguage) : acc, [])

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
