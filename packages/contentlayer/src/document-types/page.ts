import { defineDocumentType } from 'contentlayer/source-files';
import { ContentLayerPageFields } from '../fields/page.js';

export const PageDocumentType = defineDocumentType(() => ({
  ...ContentLayerPageFields,
  filePathPattern: 'pages/**/*.md?(x)',
  contentType: 'mdx',
}));
