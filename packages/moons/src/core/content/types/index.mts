import type { MDX } from 'contentlayer/core'

import type {
  Article as ContentlayerArticle,
  Page as ContentlayerPage,
} from './contentlayer.mjs'
import type { Article, MetadataHeaders, Page } from './_schemas.mjs'
import type { Render } from '../render.mjs'

export type Content = (Article | Page) & {
  body: MDX & { render: Render }
} & MetadataHeaders

export type {
  DocumentTypes as ContentlayerDocumentTypes,
  DataExports as ContentlayerDataExports,
  Person as ContentlayerPerson
} from './contentlayer.mjs'
export type * from './_schemas.mjs'
export type ContentlayerWebPageDocument = ContentlayerArticle | ContentlayerPage
