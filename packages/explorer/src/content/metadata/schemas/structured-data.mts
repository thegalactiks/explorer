import type { Thing, WithContext } from 'schema-dts';

import type { Content } from '../../../types/index.mjs';
import { getArticle } from './article.mjs';
import { getBreadcrumb } from './breadcrumb.mjs';

export const getStructuredDataSchemas = (document: Content) => {
  let schemas: WithContext<Thing>[] = [getBreadcrumb(document)];

  if (document.type === 'Article') {
    schemas = schemas.concat(getArticle(document));
  }

  return schemas;
};
