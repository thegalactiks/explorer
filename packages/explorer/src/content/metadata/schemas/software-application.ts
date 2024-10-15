import type { SoftwareApplication, WithContext } from 'schema-dts';
import type { ContentlayerSoftwareApplication } from '../../../types/index.js';
import { getOffer } from './offer.js';

export const getSoftwareApplication = (
  document: ContentlayerSoftwareApplication
): WithContext<SoftwareApplication> => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: document.name,
  description: document.description,
  aggregateRating: document.aggregateRating && {
    '@type': 'AggregateRating',
    ratingValue: document.aggregateRating.ratingValue,
    reviewCount: document.aggregateRating.reviewCount,
  },
  image: document.image?.contentUrl && [document.image?.contentUrl],
  offers: Array.isArray(document.offers) ? document.offers.map(getOffer) : [],
});
