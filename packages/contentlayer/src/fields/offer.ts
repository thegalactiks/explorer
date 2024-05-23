import type { DocumentTypeDef } from '../consts.js';
import { galactiksFields, idDocumentType } from './core.js';
import { thingsFields } from './things.js';

const availabilityEnumeration = [
  'https://schema.org/BackOrder',
  'https://schema.org/Discontinued',
  'https://schema.org/InStock',
  'https://schema.org/InStoreOnly',
  'https://schema.org/LimitedAvailability',
  'https://schema.org/OnlineOnly',
  'https://schema.org/OutOfStock',
  'https://schema.org/PreOrder',
  'https://schema.org/PreSale',
  'https://schema.org/SoldOut',
];

export const ContentLayerOfferFields: DocumentTypeDef = {
  name: 'Offer',
  fields: {
    ...galactiksFields,
    ...thingsFields,
    price: { type: 'number', required: true },
    priceCurrency: { type: 'string', required: true },
    seller: { type: 'nested', of: idDocumentType, required: false },
    priceValidUntil: { type: 'date', required: false },
    availability: {
      type: 'enum',
      options: availabilityEnumeration,
      required: false,
    },
  },
};
