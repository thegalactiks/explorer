import { getConfig } from '@withmoons/config'
import { getMDXComponent } from 'mdx-bundler/client'
import * as React from 'react'

import type { Content, ContentlayerDocument } from './types'

export const getAllDocuments = async (): Promise<Content[]> => {
  const { content } = getConfig()

  const documents = (await import(content.generated)).allDocuments as ContentlayerDocument[]
  return documents.map(d => ({
    ...d,
    body: {
      ...d.body,
      render: () => {
        const Content: React.FC = () => {
          const Component = React.useMemo(() => getMDXComponent(d.body.code), [d.body.code])

          return React.createElement(Component)
        }

        return { Content }
      }
    },
    dateCreated: new Date(d.dateCreated),
    dateModified: d.dateModified ? new Date(d.dateModified) : undefined,
    datePublished: d.datePublished ? new Date(d.datePublished) : undefined,
  }))
}

export const getDocumentsPartOf = async (isPartOf: string) =>
  (await getAllDocuments()).filter(doc => doc.isPartOf === isPartOf);

export const getDocumentWithoutPartOf = async () =>
  (await getAllDocuments()).filter(doc => !doc.isPartOf)

export const getDocumentBySlug = async (slug: string) =>
  (await getAllDocuments()).find(doc => doc.slug === slug)

export const getDocumentByIdentifier = async (identifier: string) =>
  (await getAllDocuments()).find(doc => doc.identifier === identifier)
