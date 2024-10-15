import type { DocumentTypeDef } from '../consts.js';
import { aggregateRating, galactiksFields } from './core.js';
import { creativeWorkFields } from './creative-work.js';
import { ContentLayerOfferFields } from './offer.js';

export const ContentLayerSoftwareApplicationFields: DocumentTypeDef = {
  name: 'SoftwareApplication',
  fields: {
    ...galactiksFields,
    ...creativeWorkFields,
    applicationCategory: { type: 'string', required: false },
    applicationSubCategory: { type: 'string', required: false },
    downloadUrl: { type: 'string', required: false },
    featureList: { type: 'list', required: false, of: { type: 'string' } },
    installUrl: { type: 'string', required: false },
    releaseNotes: { type: 'list', required: false, of: { type: 'string' } },
    screenshot: { type: 'image', required: false },
    aggregateRating: { type: 'nested', of: aggregateRating, required: false },
    offers: {
      type: 'list',
      of: { type: 'nested', def: () => ContentLayerOfferFields },
    },
  },
};
