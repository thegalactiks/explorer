import type { MDX } from '@galactiks/contentlayer';

export type Render = () => { Content: React.FC };
export type ContentlayerDocumentWithRender<T> = T & {
  body: MDX & { render: Render };
};
