import type { Content, ContentlayerDocument } from './types.mjs'
import { getHeadersFromEntry, getOpenGraphFromEntry } from './metadata/index.mjs'
import { computeDocumentsUrl, type ContentlayerDocumentWithURL } from './urls.mjs'
import { addRender, emptyRender, type ContentlayerDocumentWithRender } from './render.mjs'

const computeRemainingListingPages = async (documents: ContentlayerDocumentWithRender[]) => {
  return documents.reduce((acc, { dateCreated, datePublished, dateModified, isPartOf }) => {
    if (!isPartOf || acc.some(_a => _a.identifier === isPartOf)) {
      return acc
    }

    return acc.concat({
      _id: isPartOf,
      identifier: isPartOf,
      path: `/${isPartOf}`,
      slug: isPartOf,
      listingPage: true,
      description: '',
      body: {
        raw: '',
        code: '',
        render: emptyRender
      },
      type: 'Page',
      collection: 'pages',
      name: isPartOf,
      dateCreated,
      dateModified,
      datePublished
    })
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
