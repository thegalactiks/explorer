import type { Place, PostalAddress, WithContext } from 'schema-dts';
import type { Place as ContentPlace } from '../../../types/index.js';

const getPostalAddress = (address: NonNullable<ContentPlace['address']>): PostalAddress => ({
  '@type': 'PostalAddress',
  addressCountry: address.addressCountry,
  addressLocality: address.addressLocality,
  addressRegion: address.addressRegion,
  postOfficeBoxNumber: address.postOfficeBoxNumber,
  postalCode: address.postalCode,
  streetAddress: address.streetAddress,
});

export const getPlace = (document: ContentPlace): WithContext<Place> => ({
  '@context': 'https://schema.org',
  '@type': 'Place',
  name: document.name,
  description: document.description,
  telephone: document.telephone,
  latitude: document.latitude,
  longitude: document.longitude,
  address: (document.address ? getPostalAddress(document.address) : undefined),
  url: document.url,
});
