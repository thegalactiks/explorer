import type { ContentlayerWebPageDocument } from '../../types/index.js';
import { addBodyRender, emptyRender } from './render.js';

export function createPage<T>(
  identifier: string,
  document: Partial<ContentlayerWebPageDocument>
) {
  return {
    _id: identifier,
    identifier,
    slug: identifier,
    description: '',
    type: 'Page',
    name: identifier,
    ...document,
    body: document.body?.code
      ? addBodyRender(document.body)
      : {
          raw: '',
          code: '',
          render: emptyRender,
        },
  } as T;
}
