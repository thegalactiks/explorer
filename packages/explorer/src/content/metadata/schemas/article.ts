import type { Article, WithContext } from 'schema-dts';
import type { Content } from '../../../types/index.js';

import { getPerson } from './person.js';

export const getArticle = (document: Content): WithContext<Article> => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: document.headline || document.name,
  description: document.description,
  image: document.image?.contentUrl && [document.image?.contentUrl],
  dateCreated: document.dateCreated.toISOString(),
  datePublished: document.datePublished && document.datePublished.toISOString(),
  dateModified: document.dateModified && document.dateModified.toISOString(),
  author: document.author && [getPerson(document.author)],
  inLanguage: document.inLanguage,
});
