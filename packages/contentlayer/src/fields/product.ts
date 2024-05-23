import { defineNestedType } from 'contentlayer/source-files';
import type { DocumentTypeDef } from '../consts.js';
import {
  energyConsumptionDetails,
  galactiksFields,
  idDocumentType,
  quantitativeValue,
} from './core.js';
import { thingsFields } from './things.js';
import { ContentLayerOfferFields } from './offer.js';

const aggregateRating = defineNestedType(() => ({
  name: 'AggregateRating',
  fields: {
    ratingValue: { type: 'number', required: true },
    reviewCount: { type: 'number', required: true },
  },
}));

const review = defineNestedType(() => ({
  name: 'Review',
  fields: {
    name: { type: 'string', required: false },
    author: { type: 'string', required: false },
    datePublished: { type: 'date', required: false },
    reviewBody: { type: 'string', required: true },
    reviewRating: {
      type: 'nested',
      of: defineNestedType(() => ({
        name: 'Rating',
        fields: {
          ratingValue: { type: 'number', required: true },
          bestRating: { type: 'number', required: true },
          worstRating: { type: 'number', required: true },
        },
      })),
      required: true,
    },
  },
}));

export const ContentLayerProductFields: DocumentTypeDef = {
  name: 'Product',
  fields: {
    ...galactiksFields,
    ...thingsFields,
    category: { type: 'string', required: false },
    brand: { type: 'nested', of: idDocumentType, required: false },
    aggregateRating: { type: 'nested', of: aggregateRating, required: false },
    review: { type: 'list', of: review, required: false },
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
