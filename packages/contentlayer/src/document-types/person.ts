import { defineDocumentType } from 'contentlayer/source-files';
import { ContentLayerPersonFields } from '../fields/person.js';

export const PersonDocumentType = defineDocumentType(() => ({
  ...ContentLayerPersonFields,
  filePathPattern: 'persons/**/*.md?(x)',
  contentType: 'mdx',
}));
