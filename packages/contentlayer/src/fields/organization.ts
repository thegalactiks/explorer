import type { DocumentTypeDef } from '../consts.js';
import { galactiksFields } from './core.js';
import { thingsFields } from './things.js';

export const ContentLayerOrganizationFields: DocumentTypeDef = {
  name: 'Organization',
  fields: {
    ...galactiksFields,
    ...thingsFields,
    email: { type: 'string', required: false },
    keywords: { type: 'list', required: false, of: { type: 'string' } },
    legalName: { type: 'string', required: false },
    slogan: { type: 'string', required: false },
    taxID: { type: 'string', required: false },
    telephone: { type: 'string', required: false },
    vatID: { type: 'string', required: false },
  },
};
