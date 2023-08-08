import { getConfig } from '@withmoons/config'

import type { Content, ContentlayerDataExports, ContentlayerWebPageDocument } from './types/index.mjs'
import { computeDocuments } from './compute.mjs'

let _generated: ContentlayerDataExports
let _documents: Content[]

const getGenerated = async (): Promise<ContentlayerDataExports> => {
  if (!_generated) {
    const { content } = getConfig()
    _generated = await import(content.generated)
  }

  return _generated
}

const getWebPageDocuments = async (): Promise<Content[]> => {
  if (!Array.isArray(_documents)) {
    const generated = await getGenerated()
    _documents = await computeDocuments({
      documents: new Array<ContentlayerWebPageDocument>()
        .concat(generated.allPages)
        .concat(generated.allArticles),
      persons: await getPersons(),
    })
  }

  return _documents
}

export const getPages = async (): Promise<Content[]> => getWebPageDocuments()

export const getRootPages = async (): Promise<Content[]> => (await getPages()).filter(doc => !doc.isPartOf)

export const getPagesPartOf = async (slug: string): Promise<Content[]> => (await getPages()).filter(doc => doc.isPartOf === slug)

export const getPageByIdentifier = async (identifier: string) =>
  (await getPages()).find(doc => doc.identifier === identifier)

export const getPageBySlug = async (slug: string) =>
  (await getPages()).find(doc => doc.slug === slug)

export const getPersons = async () => (await getGenerated()).allPeople
export const getPersonByIdentifier = async (identifier: string) => (await getPersons()).find(doc => doc.identifier === identifier)

export const getAllPagesExceptHome = async (): Promise<Content[]> =>
  (await getPages()).filter(({ identifier }) => identifier !== 'index')

export const getHomePage = async (): Promise<Content> => {
  const homepageContent = await getPageByIdentifier('index')
  if (!homepageContent) {
    throw new Error('no content for homepage')
  }

  return homepageContent
}
