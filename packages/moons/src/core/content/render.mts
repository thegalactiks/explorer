import type { MDX } from 'contentlayer/core'
import { getMDXComponent } from 'mdx-bundler/client/index.js'
import * as React from 'react'
import type { ContentlayerDocument } from './types.mjs'

export type Render = () => { Content: React.FC }
export type ContentlayerDocumentWithRender = ContentlayerDocument & { body: MDX & { render: Render } }

export const emptyRender: Render = () => ({ Content: () => null })

export const addRender = (documents: ContentlayerDocument[]) => documents.map(_d => ({
  ..._d,
  body: {
    ..._d.body,
    render: () => {
      const Content: React.FC = () => React.createElement(getMDXComponent(_d.body.code))

      return { Content }
    }
  }
}) as ContentlayerDocumentWithRender)
