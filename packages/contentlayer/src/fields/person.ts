import type { DocumentTypeDef } from '../consts.js';
import { galactiksFields } from './core.js';
import { creativeWorkFields } from './creative-work.js';

export const ContentLayerPersonFields: DocumentTypeDef = {
  name: 'Person',
  fields: {
    ...galactiksFields,
    ...creativeWorkFields,
    dateCreated: { type: 'date', required: false },
    additionalName: { type: 'string', required: false },
    email: { type: 'string', required: false },
    familyName: { type: 'string', required: false },
    givenName: { type: 'string', required: false },
    jobTitle: { type: 'string', required: false },
    telephone: { type: 'string', required: false },
  },
};
