import { alternatesHeaderBuilder, breadcrumbBuilder, getBasicHeaders, getOpenGraphObjects, getStructuredDataSchemas, getTwitterCard } from './metadata/index.mjs'
import { addBodyRender, emptyRender, type ContentlayerDocumentWithRender, type ContentlayerWebPageDocumentWithRender } from './render.mjs'
import { computeDocumentsUrl, type ContentlayerDocumentWithURL } from './urls.mjs'
import { documentByIdentifierAndLanguageSelector, documentsByAuthorSelector, isInLanguage, usedLanguagesInDocumentsSelector } from './selectors.mjs'
import type { Content, ContentlayerPerson, ContentlayerWebPageDocument, ContentlayerWebsite, Person } from './types/index.mjs'

export type ComputeDTO<T> = {
  documents: T[]
  websites: ContentlayerWebsite[]
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
  documents.reduce((acc, { keywords, dateCreated, datePublished, dateModified, isPartOf, inLanguage }) => {
    const templateDocument = {
      dateCreated,
      datePublished,
      dateModified,
      inLanguage,
    }

    // If parent page does not exist, create it
    if (isPartOf && acc.some(_a => _a.identifier === isPartOf && isInLanguage(_a, inLanguage)) === false) {
      acc = acc.concat(createListingPage(isPartOf, `/${isPartOf}`, templateDocument))
    }

    // Create all keywords pages not existing yet
    if (Array.isArray(keywords)) {
      if (acc.some(_a => _a.identifier === 'tags' && isInLanguage(_a, inLanguage)) === false) {
        acc = acc.concat(createListingPage('tags', '/tags', { inLanguage }))
      }

      acc = acc.concat(keywords
        .filter(_k => acc.some(_a => _a.identifier === _k && isInLanguage(_a, inLanguage)) === false)
        .map(_k => createListingPage(_k, `/${_k}`, { inLanguage, isPartOf: 'tags' }))
      )
    }

    return acc
  }, documents)

const computePersonPages = (persons: ContentlayerPerson[]) => async (documents: ContentlayerWebPageDocumentWithRender[]) => {
  const selectUsedLanguages = usedLanguagesInDocumentsSelector()
  const selectDocumentByAuthor = documentsByAuthorSelector(documents)

  if (Array.isArray(persons) && persons.length > 0) {
    const usedLanguages = selectUsedLanguages(documents)
    documents = documents.concat(
      ...usedLanguages.map(language => createListingPage('author', '/author', { inLanguage: language }))
    )
  }

  return persons.reduce((acc, person) => {
    if (!person.body) {
      return acc
    }

    const usedLanguages = selectUsedLanguages(selectDocumentByAuthor(person.identifier))
    return acc.concat(
      ...usedLanguages.map<ContentlayerWebPageDocumentWithRender>(language => createPage(person.identifier, person.identifier, { body: person.body, isPartOf: 'author', inLanguage: language }))
    )
  }, documents)
}

const computeMissingFields = (persons: ContentlayerPerson[]) => async (documents: Array<ContentlayerDocumentWithURL & ContentlayerWebPageDocumentWithRender>): Promise<Content[]> => {
  const buildBreadcrumb = breadcrumbBuilder(documents)
  const buildAlternates = alternatesHeaderBuilder(documents)
  const selectPersonByIdentifierAndLanguage = documentByIdentifierAndLanguageSelector(persons)

  const getAuthor = (identifier?: string, inLanguage?: string): Person | undefined => {
    let author
    if (identifier) {
      author = selectPersonByIdentifierAndLanguage(identifier, inLanguage)
    } else if (persons.length === 1) {
      author = persons[0]
    }

    return author && {
      identifier: author.identifier,
      name: author.name,
      description: author.description,
      url: author.url
    }
  }

  return documents.map(document => {
    const contentWithoutHeaders: Omit<Content, 'headers'> = {
      ...document,
      author: getAuthor(document.author, document.inLanguage),
      breadcrumb: buildBreadcrumb(document),
      dateCreated: new Date(document.dateCreated),
      dateModified: new Date(document.dateModified || document.dateCreated),
      datePublished: document.datePublished ? new Date(document.datePublished) : undefined,
    }

    return {
      ...contentWithoutHeaders,
      headers: {
        ...getBasicHeaders(contentWithoutHeaders),
        alternates: buildAlternates(contentWithoutHeaders),
        structuredDataSchemas: getStructuredDataSchemas(contentWithoutHeaders),
        openGraph: getOpenGraphObjects(contentWithoutHeaders),
        twitterCard: getTwitterCard(contentWithoutHeaders),
      },
    }
  })
}

export const computeDocuments = async ({ documents, persons, websites }: ComputeDTO<ContentlayerWebPageDocument>): Promise<Content[]> =>
  Promise.resolve(documents)
    .then(hydratePagesWithRender)
    .then(computePersonPages(persons))
    .then(computeRemainingListingPages)
    .then(computeDocumentsUrl(websites))
    .then(computeMissingFields(persons))
