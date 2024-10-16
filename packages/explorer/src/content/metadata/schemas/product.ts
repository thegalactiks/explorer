import type { Product, WithContext } from 'schema-dts';
import type { ContentlayerProduct } from '../../../types/index.js';
import { getOffer } from './offer.js';
import { getReview } from './review.js';

export const getProduct = (
  document: ContentlayerProduct
): WithContext<Product> => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: document.name,
  description: document.description,
  aggregateRating: document.aggregateRating && {
    '@type': 'AggregateRating',
    ratingValue: document.aggregateRating.ratingValue,
    reviewCount: document.aggregateRating.reviewCount,
  },
  review: Array.isArray(document.review) ? document.review.map(getReview) : [],
  image: document.image?.contentUrl && [document.image?.contentUrl],
  offers: Array.isArray(document.offers) ? document.offers.map(getOffer) : [],
});
