import type { Offer, Product, WithContext } from 'schema-dts';
import type { ContentlayerProduct } from '../../../types/index.js';

const getOffers = (
  offers: ContentlayerProduct['offers']
): WithContext<Offer>[] =>
  Array.isArray(offers)
    ? offers.map((offer) => ({
        '@context': 'https://schema.org',
        '@type': 'Offer',
        price: offer.price,
        priceCurrency: offer.priceCurrency,
        url: offer.url,
      }))
    : [];

export const getProduct = (
  document: ContentlayerProduct
): WithContext<Product> => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: document.name,
  description: document.description,
  image: document.image?.contentUrl && [document.image?.contentUrl],
  offers: document.offers && getOffers(document.offers),
});
