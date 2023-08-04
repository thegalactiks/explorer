import type { IsoDateTimeString, MDX } from 'contentlayer/core'
import type *  as React from 'react'
import type { MDXContentProps } from 'mdx-bundler/client'

import type { Article, MetadataHeaders, Page } from './_schemas'
export type { MetadataHeaders }

type Render = () => { Content: React.FunctionComponent<MDXContentProps> }
export type Content = (Article | Page) & {
  body: MDX & { render: Render }
} & MetadataHeaders

export type ContentlayerArticle = {
  _id: string
  type: 'Article'
  name: string
  description: string
  url?: string | undefined
  identifier: string
  image?: any | undefined
  sameAs?: string | undefined
  author?: string | undefined
  headline?: string | undefined
  dateCreated: IsoDateTimeString
  dateModified?: IsoDateTimeString | undefined
  datePublished?: IsoDateTimeString | undefined
  isPartOf?: string | undefined
  inLanguage?: string | undefined
  keywords?: string[] | undefined
  body: MDX
  collection: string
  slug: string
}

export type ContentlayerPage = {
  _id: string
  type: 'Page'
  name: string
  description: string
  url?: string | undefined
  identifier: string
  image?: any | undefined
  sameAs?: string | undefined
  author?: string | undefined
  headline?: string | undefined
  dateCreated: IsoDateTimeString
  dateModified?: IsoDateTimeString | undefined
  datePublished?: IsoDateTimeString | undefined
  isPartOf?: string | undefined
  inLanguage?: string | undefined
  keywords?: string[] | undefined
  body: MDX
  collection: string
  slug: string
}
export type ContentlayerDocument = ContentlayerArticle | ContentlayerPage
