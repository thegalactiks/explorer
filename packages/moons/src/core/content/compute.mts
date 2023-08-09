import type { Content, ContentlayerPerson, ContentlayerWebPageDocument } from './types/index.mjs'
import { breadcrumbBuilder, getHeadersFromEntry, getOpenGraphFromEntry } from './metadata/index.mjs'
import { computeDocumentsUrl, type ContentlayerDocumentWithURL } from './urls.mjs'
import { addBodyRender, emptyRender, type ContentlayerDocumentWithRender, type ContentlayerWebPageDocumentWithRender } from './render.mjs'

export type ComputeDTO<T> = {
  documents: T[]
  persons: ContentlayerPerson[]
}

function createPage<T>(identifier: string, path: string, document: Partial<ContentlayerWebPageDocument>) {
  return {
    _id: identifier,
    identifier,
    path,
    slug: identifier,
    description: '',
    type: 'Page',
    collection: 'pages',
    name: identifier,
    ...document,
    body: document.body?.raw ? addBodyRender(document.body) : ({
      raw: '',
      code: '',
      render: emptyRender
    })
  } as T
}

const createListingPage = (identifier: string, path: string, document: Partial<ContentlayerWebPageDocument> = {}) => createPage<ContentlayerDocumentWithRender<ContentlayerWebPageDocument>>(identifier, path, {
  listingPage: true,
  ...document
})

const hydratePagesWithRender = async (documents: ContentlayerWebPageDocument[]) => documents.map(d => ({
  ...d,
  body: addBodyRender(d.body)
}))

const computeRemainingListingPages = async (documents: ContentlayerWebPageDocumentWithRender[]) =>
  documents.reduce((acc, { keywords, dateCreated, datePublished, dateModified, isPartOf }) => {
    const templateDocument = { dateCreated, datePublished, dateModified, isPartOf: 'tags' }

    // If parent page does not exist, create it
    if (isPartOf && acc.some(_a => _a.identifier === isPartOf) === false) {
      acc = acc.concat(createListingPage(isPartOf, `/${isPartOf}`, templateDocument))
    }

    // Create all keywords pages not existing yet
    if (Array.isArray(keywords)) {
      if (acc.some(_a => _a.identifier === 'tags') === false) {
        acc = acc.concat(createListingPage('tags', '/tags'))
      }

      acc = acc.concat(keywords
        .filter(_k => acc.some(_a => _a.identifier === _k) === false)
        .map(_k => createListingPage(_k, `/${_k}`, templateDocument))
      )
    }

    return acc
  }, documents)

const computePersonPages = (persons: ContentlayerPerson[]) => async (documents: ContentlayerWebPageDocumentWithRender[]) => {
  if (Array.isArray(persons) && persons.length > 0) {
    documents = documents.concat(createListingPage('author', '/author'))
  }

  return persons.reduce((acc, person) => {
    if (!person.body) {
      return acc
    }

    return acc.concat(createPage(person.identifier, person.identifier, { body: person.body, isPartOf: 'author' }))
  }, documents)
}

const computeMissingFields = async (documents: Array<ContentlayerDocumentWithURL & ContentlayerWebPageDocumentWithRender>): Promise<Content[]> => {
  const buildBreadcrumb = breadcrumbBuilder(documents)

  return documents.map(document => {
    const contentWithoutHeaders: Omit<Content, 'headers'> = {
      ...document,
      dateCreated: new Date(document.dateCreated),
      dateModified: new Date(document.dateModified || document.dateCreated),
      datePublished: document.datePublished ? new Date(document.datePublished) : undefined,
    }

    return {
      ...contentWithoutHeaders,
      breadcrumb: buildBreadcrumb(contentWithoutHeaders),
      headers: {
        ...getHeadersFromEntry(contentWithoutHeaders),
        openGraph: getOpenGraphFromEntry(contentWithoutHeaders),
      },
    }
  })
}

export const computeDocuments = async ({ documents, persons }: ComputeDTO<ContentlayerWebPageDocument>): Promise<Content[]> =>
  Promise.resolve(documents)
    .then(hydratePagesWithRender)
    .then(computePersonPages(persons))
    .then(computeRemainingListingPages)
    .then(computeDocumentsUrl)
    .then(computeMissingFields)