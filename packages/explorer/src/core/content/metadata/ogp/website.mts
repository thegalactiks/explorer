import type { Content, MetadataHeaders } from '../../../types/index.mjs';

export const getWebsite = (document: Content): MetadataHeaders['openGraph'] => {
  const headers = [
    { property: 'og:url', content: document.url },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: document.name },
    { property: 'og:description', content: document.description },
  ];

  if (document.inLanguage) {
    headers.push({ property: 'og:locale', content: document.inLanguage });
  }

  if (document.image?.contentUrl) {
    headers.push(
      { property: 'og:image', content: document.image.contentUrl },
      {
        property: 'og:image:alt',
        content: document.image.description || document.description,
      }
    );
  }

  return headers;
};
