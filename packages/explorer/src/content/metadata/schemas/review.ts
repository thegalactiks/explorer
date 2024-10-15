import type { Review, WithContext } from 'schema-dts';
import type { ContentlayerReview } from '../../../types/index.js';

export const getReview = (review: ContentlayerReview): WithContext<Review> => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  reviewRating: {
    '@type': 'Rating',
    ratingValue: review.reviewRating.ratingValue,
    bestRating: review.reviewRating.bestRating,
    worstRating: review.reviewRating.worstRating,
  },
});
