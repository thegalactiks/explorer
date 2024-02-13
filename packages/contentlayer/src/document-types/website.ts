import { defineDocumentType } from 'contentlayer/source-files';
import { ContentLayerWebsiteFields } from '../fields/website.js';

export const WebsiteDocumentType = defineDocumentType(() => ({
  ...ContentLayerWebsiteFields,
  filePathPattern: 'websites/**/*.md?(x)',
  contentType: 'mdx',
}));
