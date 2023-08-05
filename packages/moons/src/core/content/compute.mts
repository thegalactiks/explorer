import type { Content, ContentlayerDocument } from './types.mjs'
import { getHeadersFromEntry, getOpenGraphFromEntry } from './metadata/index.mjs'
import { computeDocumentsUrl, type ContentlayerDocumentWithURL } from './urls.mjs'
import { addRender, emptyRender, type ContentlayerDocumentWithRender } from './render.mjs'

const createListingPage = (identifier: string, path: string, document: Partial<ContentlayerDocument> = {}) => ({
  _id: identifier,
  identifier,
  path,
  slug: identifier,
  listingPage: true,
  description: '',
  body: {
    raw: '',
    code: '',
    render: emptyRender
  },
  type: 'Page',
  collection: 'pages',
  name: identifier,
  ...document
} as ContentlayerDocumentWithRender)

const computeRemainingListingPages = async (documents: ContentlayerDocumentWithRender[]) => {
  return documents.reduce((acc, { keywords, dateCreated, datePublished, dateModified, isPartOf }) => {
    const templateDocument = { dateCreated, datePublished, dateModified }

    // If parent page does not exist, create it
    if (isPartOf && acc.some(_a => _a.identifier === isPartOf) === false) {
      acc = acc.concat(createListingPage(isPartOf, `/${isPartOf}`, templateDocument))
    }

    // Create all keywords pages not existing yet
    if (Array.isArray(keywords)) {
      acc = acc.concat(keywords
        .filter(_k => acc.some(_a => _a.identifier === `tags/${_k}`) === false)
        .map(_k => createListingPage(_k, `/tags/${_k}`, templateDocument))
      )
    }

    return acc
  }, documents)
}

const computeMissingFields = async (documents: Array<ContentlayerDocumentWithURL & ContentlayerDocumentWithRender>): Promise<Content[]> => {
  return documents.map(document => {
    const contentWithoutHeaders: Omit<Content, 'headers'> = {
      ...document,
      dateCreated: new Date(document.dateCreated),
      dateModified: new Date(document.dateModified || document.dateCreated),
      datePublished: document.datePublished ? new Date(document.datePublished) : undefined,
    }

    return {
      ...contentWithoutHeaders,
      headers: {
        ...getHeadersFromEntry(contentWithoutHeaders),
        openGraph: getOpenGraphFromEntry(contentWithoutHeaders),
      },
    }
  })
}

export const computeDocuments = async (documents: ContentlayerDocument[]): Promise<Content[]> =>
  Promise.resolve(documents)
    .then(addRender)
    .then(computeRemainingListingPages)
    .then(computeDocumentsUrl)
    .then(computeMissingFields)
