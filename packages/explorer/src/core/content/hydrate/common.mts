import type { ContentlayerWebPageDocument } from '../../types/index.mjs'
import { createIdentifierFromString } from '../utils.mjs';
import { addBodyRender, emptyRender } from './render.mjs';

export function createPage<T>(
  identifier: string,
  document: Partial<ContentlayerWebPageDocument>
) {
  const id = createIdentifierFromString(identifier);

  return {
    _id: id,
    identifier: id,
    slug: id,
    description: '',
    type: 'Page',
    name: identifier,
    ...document,
    body: document.body?.raw
      ? addBodyRender(document.body)
      : {
          raw: '',
          code: '',
          render: emptyRender,
        },
  } as T;
}
