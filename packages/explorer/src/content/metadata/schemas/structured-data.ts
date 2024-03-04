import type { Thing, WithContext } from 'schema-dts';

import type { Content, ContentlayerProduct } from '../../../types/index.js';
import { getArticle } from './article.js';
import { getProduct } from './product.js';
import { getBreadcrumb } from './breadcrumb.js';

export const getStructuredDataSchemas = (document: Content) => {
  let schemas: WithContext<Thing>[] = [getBreadcrumb(document)];

  switch (document.type) {
    case 'Article':
      schemas = schemas.concat(getArticle(document));
      break;

    case 'Product':
      schemas = schemas.concat(
        getProduct(document as unknown as ContentlayerProduct)
      );
      break;
  }

  return schemas;
};
