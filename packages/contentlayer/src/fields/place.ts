import type { DocumentTypeDef } from '../consts.js';
import { galactiksFields, postalAddress } from './core.js';
import { creativeWorkFields } from './creative-work.js';

export const ContentLayerPlaceFields: DocumentTypeDef = {
  name: 'Place',
  fields: {
    ...galactiksFields,
    ...creativeWorkFields,
    address: { type: 'nested', of: postalAddress },
    latitude: { type: 'string', required: false },
    longitude: { type: 'string', required: false },
    containedInPlace: { type: 'string', required: false },
    keywords: { type: 'list', required: false, of: { type: 'string' } },
    telephone: { type: 'string', required: false },
  },
};
