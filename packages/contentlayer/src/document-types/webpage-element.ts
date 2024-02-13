import { defineDocumentType } from 'contentlayer/source-files';
import { ContentLayerWebPageElementFields } from '../fields/webpage-element.js';

export const WebpageElementDocumentType = defineDocumentType(() => ({
  ...ContentLayerWebPageElementFields,
  filePathPattern: 'elements/**/*.md?(x)',
  contentType: 'mdx',
}));
