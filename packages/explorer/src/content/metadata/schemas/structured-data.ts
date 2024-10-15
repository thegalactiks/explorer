import type { Thing, WithContext } from 'schema-dts';

import type { Content, ContentlayerProduct, ContentlayerSoftwareApplication } from '../../../types/index.js';
import { getArticle } from './article.js';
import { getPlace } from './place.js';
import { getProduct } from './product.js';
import { getBreadcrumb } from './breadcrumb.js';
import { getSoftwareApplication } from './software-application.js';

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

    case 'SoftwareApplication':
      schemas = schemas.concat(
        getSoftwareApplication(document as unknown as ContentlayerSoftwareApplication)
      );
      break;

    case 'Place':
      schemas = schemas.concat(getPlace(document));
      break;
  }

  return schemas;
};
