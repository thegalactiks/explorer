import { getConfig } from '@galactiks/config';
import type { Content, MetadataHeaders } from '../../types/index.js';

export const getTwitterCard = (
  document: Content
): MetadataHeaders['twitterCard'] => {
  const { twitter } = getConfig();

  const headers = [
    { name: 'twitter:title', content: document.name },
    { name: 'twitter:description', content: document.description },
  ];

  if (twitter?.site) {
    headers.push({ name: 'twitter:site', content: twitter.site });
  }
  if (twitter?.creator) {
    headers.push({ name: 'twitter:creator', content: twitter.creator });
  }

  if (document.image) {
    headers.push(
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: document.image.contentUrl },
      {
        name: 'twitter:image:alt',
        content: document.image.name || document.name,
      }
    );
  } else {
    headers.push({ name: 'twitter:card', content: 'summary' });
  }

  return headers;
};
