import { defineDocumentType } from 'contentlayer/source-files';
import { ContentLayerArticleFields } from '../fields/article.js';

export const ArticleDocumentType = defineDocumentType(() => ({
  ...ContentLayerArticleFields,
  filePathPattern: 'articles/**/*.md?(x)',
  contentType: 'mdx',
}));
