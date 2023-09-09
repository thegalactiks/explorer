import {
  defineNestedType,
  type DocumentTypeDef,
  type FieldDefs,
  type NestedType,
} from 'contentlayer/source-files';
import { collectionName } from './content/index.mjs';

const moonsFields: FieldDefs = {
  listingPage: { type: 'boolean', required: false, default: false },
  slug: { type: 'string', required: false },
  path: { type: 'string', required: false },
};

const idFields: FieldDefs = {
  '@id': { type: 'string', required: true },
};
const idDocumentType = defineNestedType(() => ({
  name: 'Id',
  fields: idFields,
}));

const itemListElementFields: NestedType = defineNestedType(() => ({
  name: 'ItemListElement',
  fields: {
    name: { type: 'string', required: true },
    path: { type: 'string', required: false },
    url: { type: 'string', required: false },
    itemListElement: {
      type: 'list',
      required: false,
      of: itemListElementFields,
    },
  },
}));

const itemListFields: FieldDefs = {
  name: { type: 'string', required: false },
  identifier: { type: 'string', required: true },
  itemListElement: { type: 'list', required: true, of: itemListElementFields },
};

const thingsFields: FieldDefs = {
  name: { type: 'string', required: true },
  description: { type: 'string', required: true },
  url: { type: 'string', required: false },
  identifier: { type: 'string', required: true },
  image: { type: 'json', required: false },
  sameAs: { type: 'string', required: false },
};

const creativeWorkFields: FieldDefs = {
  ...thingsFields,
  author: { type: 'string', required: false },
  headline: { type: 'string', required: false },
  dateCreated: { type: 'date', required: true },
  dateModified: { type: 'date', required: false },
  datePublished: { type: 'date', required: false },
  isPartOf: { type: 'string', required: false },
  inLanguage: { type: 'string', required: false },
  translationOfWork: { type: 'nested', of: idDocumentType, required: false },
  workTranslation: { type: 'nested', of: idDocumentType, required: false },
  keywords: { type: 'list', required: false, of: { type: 'string' } },
};

export const ContentLayerWebsiteFields: DocumentTypeDef = {
  name: 'Website',
  fields: {
    ...creativeWorkFields,
    issn: { type: 'string', required: false },
  },
};

export const ContentLayerWebPageElementFields: DocumentTypeDef = {
  name: 'WebPageElement',
  fields: {
    elementType: {
      type: 'enum',
      options: ['SiteNavigationElement'],
      required: false,
    }, // avoid collision with contentlayer type
    inLanguage: { type: 'string', required: false },
    ...itemListFields,
  },
};

export const ContentLayerArticleFields: DocumentTypeDef = {
  name: 'Article',
  fields: {
    ...moonsFields,
    ...creativeWorkFields,
  },
  computedFields: {
    collection: { type: 'string', resolve: () => collectionName.article },
  },
};

export const ContentLayerPageFields: DocumentTypeDef = {
  name: 'Page',
  fields: {
    ...moonsFields,
    ...creativeWorkFields,
  },
  computedFields: {
    collection: { type: 'string', resolve: () => collectionName.page },
  },
};

export const ContentLayerPersonFields: DocumentTypeDef = {
  name: 'Person',
  fields: {
    ...moonsFields,
    ...thingsFields,
    additionalName: { type: 'string', required: false },
    email: { type: 'string', required: false },
    familyName: { type: 'string', required: false },
    givenName: { type: 'string', required: false },
    jobTitle: { type: 'string', required: false },
    telephone: { type: 'string', required: false },
  },
  computedFields: {
    collection: { type: 'string', resolve: () => collectionName.person },
  },
};

export const ContentLayerOrganizationFields: DocumentTypeDef = {
  name: 'Organization',
  fields: {
    ...moonsFields,
    ...thingsFields,
    email: { type: 'string', required: false },
    keywords: { type: 'list', required: false, of: { type: 'string' } },
    legalName: { type: 'string', required: false },
    slogan: { type: 'string', required: false },
    taxID: { type: 'string', required: false },
    telephone: { type: 'string', required: false },
    vatID: { type: 'string', required: false },
  },
  computedFields: {
    collection: { type: 'string', resolve: () => collectionName.organization },
  },
};
