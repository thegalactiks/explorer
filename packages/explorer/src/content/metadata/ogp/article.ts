import type { Content, MetadataHeaders } from '../../../types/index.js';

export const getArticle = (document: Content): MetadataHeaders['openGraph'] => {
  const headers = [
    { property: 'og:url', content: document.url },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: document.name },
    { property: 'og:description', content: document.description },
    {
      property: 'article:published_time',
      content: (document.datePublished || document.dateCreated).toISOString(),
    },
    {
      property: 'article:modified_time',
      content: (document.dateModified || document.dateCreated).toISOString(),
    },
  ];

  if (document.inLanguage) {
    headers.push({ property: 'og:locale', content: document.inLanguage });
  }

  if (document.author?.name) {
    headers.push({ property: 'article:author', content: document.author.name });
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

  if (document.isPartOf) {
    headers.push({ property: 'article:section', content: document.isPartOf });
  }

  if (Array.isArray(document.keywords) && document.keywords.length > 0) {
    headers.push(
      ...document.keywords.map((keyword) => ({
        property: 'article:tag',
        content: keyword,
      }))
    );
  }

  return headers;
};
