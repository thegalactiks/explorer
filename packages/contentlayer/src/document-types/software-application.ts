import { defineDocumentType } from 'contentlayer/source-files';
import { ContentLayerSoftwareApplicationFields } from '../fields/software-application.js';

export const SoftwareApplicationDocumentType = defineDocumentType(() => ({
  ...ContentLayerSoftwareApplicationFields,
  filePathPattern: 'software-applications/**/!(index).md?(x)',
  contentType: 'mdx',
}));
