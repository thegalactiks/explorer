import { defineDocumentType } from 'contentlayer/source-files';
import { ContentLayerOrganizationFields } from '../fields/organization.js';

export const OrganizationDocumentType = defineDocumentType(() => ({
  ...ContentLayerOrganizationFields,
  filePathPattern: 'organizations/**/*.md?(x)',
  contentType: 'mdx',
}));
