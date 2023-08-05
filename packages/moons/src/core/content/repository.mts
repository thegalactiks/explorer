import { getConfig } from '@withmoons/config'

import type { Content, ContentlayerDocument } from './types.mjs'
import { computeDocuments } from './compute.mjs'

let _documents: Content[]

const getAllDocuments = async (): Promise<Content[]> => {
  if (Array.isArray(_documents)) {
    return _documents
  }

  const { content } = getConfig()

  const documents = (await import(content.generated)).allDocuments as ContentlayerDocument[]
  return computeDocuments(documents)
}

export const getPages = async (): Promise<Content[]> => getAllDocuments()

export const getRootPages = async (): Promise<Content[]> => (await getAllDocuments()).filter(doc => !doc.isPartOf)

export const getPagesPartOf = async (slug: string): Promise<Content[]> => (await getAllDocuments()).filter(doc => doc.isPartOf === slug)

export const getPageByIdentifier = async (identifier: string) =>
  (await getAllDocuments()).find(doc => doc.identifier === identifier)

export const getPageBySlug = async (slug: string) =>
  (await getAllDocuments()).find(doc => doc.slug === slug)

export const getAllPagesExceptHome = async (): Promise<Content[]> =>
  (await getPages()).filter(({ identifier }) => identifier !== 'index')

export const getHomePage = async (): Promise<Content> => {
  const homepageContent = await getPageByIdentifier('index')
  if (!homepageContent) {
    throw new Error('no content for homepage')
  }

  return homepageContent
}
