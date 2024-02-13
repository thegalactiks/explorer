import { defineDocumentType } from 'contentlayer/source-files';
import { ContentLayerProductFields } from '../fields/product.js';

export const ProductDocumentType = defineDocumentType(() => ({
  ...ContentLayerProductFields,
  filePathPattern: 'products/**/*.md?(x)',
  contentType: 'mdx',
}));
