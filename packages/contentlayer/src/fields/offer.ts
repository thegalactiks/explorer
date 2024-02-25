import type { DocumentTypeDef } from '../consts.js';
import { galactiksFields, idDocumentType } from './core.js';
import { thingsFields } from './things.js';

export const ContentLayerOfferFields: DocumentTypeDef = {
  name: 'Offer',
  fields: {
    ...galactiksFields,
    ...thingsFields,
    price: { type: 'number', required: true },
    priceCurrency: { type: 'string', required: true },
    seller: { type: 'nested', of: idDocumentType, required: false },
  },
};
