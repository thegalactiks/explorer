import type { FieldDefs } from 'contentlayer/source-files';
import { translationFields } from './core.js';

export const actionFields: FieldDefs = {
  ...translationFields,
  name: { type: 'string', required: false },
  description: { type: 'string', required: false },
  url: { type: 'string', required: false },
  identifier: { type: 'string', required: true },
  '@type': { type: 'string', required: true },
};
