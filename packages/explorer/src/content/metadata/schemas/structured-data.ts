import type { Thing, WithContext } from 'schema-dts';

import type { Content } from '../../../types';
import { getArticle } from './article';
import { getBreadcrumb } from './breadcrumb';

export const getStructuredDataSchemas = (document: Content) => {
  let schemas: WithContext<Thing>[] = [getBreadcrumb(document)];

  if (document.type === 'Article') {
    schemas = schemas.concat(getArticle(document));
  }

  return schemas;
};
