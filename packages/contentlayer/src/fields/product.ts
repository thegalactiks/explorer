import type { DocumentTypeDef } from '../consts.js';
import {
  energyConsumptionDetails,
  galactiksFields,
  idDocumentType,
  quantitativeValue,
} from './core.js';
import { thingsFields } from './things.js';
import { ContentLayerOfferFields } from './offer.js';

export const ContentLayerProductFields: DocumentTypeDef = {
  name: 'Product',
  fields: {
    ...galactiksFields,
    ...thingsFields,
    brand: { type: 'nested', of: idDocumentType, required: false },
    color: { type: 'string', required: false },
    depth: { type: 'nested', of: quantitativeValue, required: false },
    gtin: { type: 'string', required: false },
    hasEnergyConsumptionDetails: {
      type: 'nested',
      of: energyConsumptionDetails,
      required: false,
    },
    hasMeasurement: { type: 'nested', of: quantitativeValue, required: false },
    height: { type: 'nested', of: quantitativeValue, required: false },
    keywords: { type: 'list', required: false, of: { type: 'string' } },
    manufacturer: { type: 'nested', of: idDocumentType, required: false },
    model: { type: 'nested', of: idDocumentType, required: false },
    offers: {
      type: 'list',
      of: { type: 'nested', def: () => ContentLayerOfferFields },
    },
    sku: { type: 'string', required: false },
    weight: { type: 'nested', of: quantitativeValue, required: false },
    width: { type: 'nested', of: quantitativeValue, required: false },
  },
};
