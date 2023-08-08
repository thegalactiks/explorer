import type { MDX } from 'contentlayer/core'
import { getMDXComponent } from 'mdx-bundler/client/index.js'
import * as React from 'react'
import type { ContentlayerDocumentTypes, ContentlayerWebPageDocument } from './types/index.mjs'

export type Render = () => { Content: React.FC }
export type ContentlayerDocumentWithRender<T> = T & { body: MDX & { render: Render } }
export type ContentlayerWebPageDocumentWithRender = ContentlayerDocumentWithRender<ContentlayerWebPageDocument>

export const emptyRender: Render = () => ({ Content: () => null })

export const addBodyRender = (body: ContentlayerDocumentTypes['body']) => ({
  ...body,
  render: () => {
    const Content: React.FC = () => React.createElement(getMDXComponent(body.code))

    return { Content }
  }
})
