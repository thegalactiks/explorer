import type { FieldDefs } from 'contentlayer/source-files';
import { translationFields } from './core.js';

export const thingsFields: FieldDefs = {
  ...translationFields,
  name: { type: 'string', required: true },
  description: { type: 'string', required: true },
  url: { type: 'string', required: false },
  identifier: { type: 'string', required: true },
  image: { type: 'json', required: false },
  sameAs: { type: 'string', required: false },
};
