import type { Content, MetadataHeaders } from '../index.mjs';

export const getTwitterCard = (
  document: Content
): MetadataHeaders['twitterCard'] => {
  const headers = [
    { name: 'twitter:title', content: document.name },
    { name: 'twitter:description', content: document.description },
  ];

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
