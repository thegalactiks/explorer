import type { DocumentTypeDef } from '../consts.js';
import { galactiksFields, idDocumentType, propertyValue } from './core.js';
import { thingsFields } from './things.js';

export const ContentLayerOfferFields: DocumentTypeDef = {
  name: 'Offer',
  fields: {
    ...galactiksFields,
    ...thingsFields,
    additionalProperty: { type: 'nested', of: propertyValue },
    price: { type: 'number', required: true },
    priceCurrency: { type: 'string', required: true },
    seller: { type: 'nested', of: idDocumentType, required: false },
  },
};
