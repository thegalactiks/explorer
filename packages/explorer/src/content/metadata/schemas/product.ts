import type { Offer, Product, Review, WithContext } from 'schema-dts';
import type { ContentlayerProduct } from '../../../types/index.js';

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const getOffer = (
  offer: ArrayElement<Required<ContentlayerProduct>['offers']>
): WithContext<Offer> => ({
  '@context': 'https://schema.org',
  '@type': 'Offer',
  price: offer.price,
  priceCurrency: offer.priceCurrency,
  url: offer.url,
  priceValidUntil: offer.priceValidUntil,
  availability: offer.availability,
});

const getReview = (
  review: ArrayElement<Required<ContentlayerProduct>['review']>
): WithContext<Review> => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  reviewRating: {
    '@type': 'Rating',
    ratingValue: review.reviewRating.ratingValue,
    bestRating: review.reviewRating.bestRating,
    worstRating: review.reviewRating.worstRating,
  },
});

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
