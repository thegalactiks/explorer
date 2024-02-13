import { defineDocumentType } from 'contentlayer/source-files';
import {
  ContentLayerArticleFields,
  ContentLayerWebsiteFields,
  ContentLayerWebPageElementFields,
  ContentLayerOrganizationFields,
  ContentLayerPageFields,
  ContentLayerPersonFields,
  ContentLayerPlaceFields,
} from '../fields';

export const ArticleDocumentType = defineDocumentType(() => ({
  ...ContentLayerArticleFields,
  filePathPattern: 'articles/**/*.md?(x)',
  contentType: 'mdx',
}));

export const PageDocumentType = defineDocumentType(() => ({
  ...ContentLayerPageFields,
  filePathPattern: 'pages/**/*.md?(x)',
  contentType: 'mdx',
}));

export const PersonDocumentType = defineDocumentType(() => ({
  ...ContentLayerPersonFields,
  filePathPattern: 'persons/**/*.md?(x)',
  contentType: 'mdx',
}));

export const PlaceDocumentType = defineDocumentType(() => ({
  ...ContentLayerPlaceFields,
  filePathPattern: 'places/**/*.md?(x)',
  contentType: 'mdx',
}));

export const OrganizationDocumentType = defineDocumentType(() => ({
  ...ContentLayerOrganizationFields,
  filePathPattern: 'organizations/**/*.md?(x)',
  contentType: 'mdx',
}));

export const WebsiteDocumentType = defineDocumentType(() => ({
  ...ContentLayerWebsiteFields,
  filePathPattern: 'websites/**/*.md?(x)',
  contentType: 'mdx',
}));

export const WebpageElementDocumentType = defineDocumentType(() => ({
  ...ContentLayerWebPageElementFields,
  filePathPattern: 'elements/**/*.md?(x)',
  contentType: 'mdx',
}));
