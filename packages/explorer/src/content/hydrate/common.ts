import type { ContentlayerWebPageDocument } from '../../types';
import { addBodyRender, emptyRender } from './render';

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
    body: document.body?.raw
      ? addBodyRender(document.body)
      : {
          raw: '',
          code: '',
          render: emptyRender,
        },
  } as T;
}
