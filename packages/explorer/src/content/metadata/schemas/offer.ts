import type { Offer, WithContext } from 'schema-dts';
import type { ContentlayerOffer } from '../../../types/index.js';

export const getOffer = (offer: ContentlayerOffer): WithContext<Offer> => ({
  '@context': 'https://schema.org',
  '@type': 'Offer',
  price: offer.price,
  priceCurrency: offer.priceCurrency,
  url: offer.url,
  priceValidUntil: offer.priceValidUntil,
  availability: offer.availability,
});
