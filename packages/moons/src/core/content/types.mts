import type { IsoDateTimeString, MDX } from 'contentlayer/core'
import type { Article, MetadataHeaders, Page } from './_schemas.mjs'
import type { Render } from './render.mjs'
export type { MetadataHeaders } from './_schemas.mjs'

export type Content = (Article | Page) & {
  body: MDX & { render: Render }
} & MetadataHeaders

export type ContentlayerArticle = {
  _id: string
  type: 'Article'
  listingPage: boolean
  slug?: string | undefined
  path?: string | undefined
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
  /** MDX file body */
  body: MDX
  collection: string
}

export type ContentlayerPage = {
  _id: string
  type: 'Page'
  listingPage: boolean
  slug?: string | undefined
  path?: string | undefined
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
  /** MDX file body */
  body: MDX
  collection: string
}
export type ContentlayerDocument = ContentlayerArticle | ContentlayerPage
