import { getMDXComponent } from 'mdx-bundler/client/index.js';
import * as React from 'react';
import type { ContentlayerDocumentTypes, Render } from '../../types/index.js';

export const emptyRender: Render = () => ({ Content: () => null });

export const addBodyRender = (body: ContentlayerDocumentTypes['body']) => ({
  ...body,
  render: () => {
    const Content: React.FC = () =>
      React.createElement(getMDXComponent(body.code));

    return { Content };
  },
});
