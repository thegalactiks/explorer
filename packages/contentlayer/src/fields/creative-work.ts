import type { FieldDefs } from 'contentlayer/source-files';
import { idDocumentType } from './core.js';
import { thingsFields } from './things.js';

export const creativeWorkFields: FieldDefs = {
  ...thingsFields,
  author: { type: 'string', required: false },
  headline: { type: 'string', required: false },
  dateCreated: { type: 'date', required: true },
  dateModified: { type: 'date', required: false },
  datePublished: { type: 'date', required: false },
  isPartOf: { type: 'string', required: false },
  inLanguage: { type: 'string', required: false },
  translationOfWork: { type: 'nested', of: idDocumentType, required: false },
  workTranslation: { type: 'nested', of: idDocumentType, required: false },
  keywords: { type: 'list', required: false, of: { type: 'string' } },
};
