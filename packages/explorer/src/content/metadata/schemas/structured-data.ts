import type { Thing, WithContext } from 'schema-dts';

import type { Content } from '../../../types/index.js';
import { getArticle } from './article.js';
import { getBreadcrumb } from './breadcrumb.js';

export const getStructuredDataSchemas = (document: Content) => {
  let schemas: WithContext<Thing>[] = [getBreadcrumb(document)];

  if (document.type === 'Article') {
    schemas = schemas.concat(getArticle(document));
  }

  return schemas;
};
