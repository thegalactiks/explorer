import { getMDXComponent } from 'mdx-bundler/client';
import * as React from 'react';
import type { ContentlayerDocumentTypes, Render } from '../../types';

export const emptyRender: Render = () => ({ Content: () => null });

export const addBodyRender = (body: ContentlayerDocumentTypes['body']) => ({
  ...body,
  render: () => {
    const Content: React.FC = () =>
      React.createElement(getMDXComponent(body.code));

    return { Content };
  },
});
