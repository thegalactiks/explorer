import { defineDocumentType } from 'contentlayer/source-files';
import {
  ContentLayerArticleFields,
  ContentLayerWebsiteFields,
  ContentLayerWebPageElementFields,
  ContentLayerOrganizationFields,
  ContentLayerPageFields,
  ContentLayerPersonFields,
  ContentLayerPlaceFields,
} from '../fields.mjs';

export const ArticleDocumentType = defineDocumentType(() => ({
  ...ContentLayerArticleFields,
  filePathPattern: 'articles/**/*.mdx',
  contentType: 'mdx',
}));

export const PageDocumentType = defineDocumentType(() => ({
  ...ContentLayerPageFields,
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
}));

export const PersonDocumentType = defineDocumentType(() => ({
  ...ContentLayerPersonFields,
  filePathPattern: 'persons/**/*.mdx',
  contentType: 'mdx',
}));

export const PlaceDocumentType = defineDocumentType(() => ({
  ...ContentLayerPlaceFields,
  filePathPattern: 'places/**/*.mdx',
  contentType: 'mdx',
}));

export const OrganizationDocumentType = defineDocumentType(() => ({
  ...ContentLayerOrganizationFields,
  filePathPattern: 'organizations/**/*.mdx',
  contentType: 'mdx',
}));

export const WebsiteDocumentType = defineDocumentType(() => ({
  ...ContentLayerWebsiteFields,
  filePathPattern: 'websites/*.mdx',
  contentType: 'mdx',
}));

export const WebpageElementDocumentType = defineDocumentType(() => ({
  ...ContentLayerWebPageElementFields,
  filePathPattern: 'elements/*.mdx',
  contentType: 'mdx',
}));
