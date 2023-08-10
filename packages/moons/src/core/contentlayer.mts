import type { FieldDefs } from 'contentlayer/source-files'
import { collectionName } from './content/index.mjs'

const moonsFields: FieldDefs = {
  listingPage: { type: 'boolean', required: false, default: false },
  slug: { type: 'string', required: false },
  path: { type: 'string', required: false }
}

const thingsFields: FieldDefs = {
  name: { type: 'string', required: true },
  description: { type: 'string', required: true },
  url: { type: 'string', required: false },
  identifier: { type: 'string', required: true },
  image: { type: 'json', required: false },
  sameAs: { type: 'string', required: false }
}

const creativeWorkFields: FieldDefs = {
  ...thingsFields,
  author: { type: 'string', required: false, },
  headline: { type: 'string', required: false, },
  dateCreated: { type: 'date', required: true },
  dateModified: { type: 'date', required: false },
  datePublished: { type: 'date', required: false },
  isPartOf: { type: 'string', required: false },
  inLanguage: { type: 'string', required: false },
  keywords: { type: 'list', required: false, of: { type: 'string' } },
}

export const ContentLayerArticleFields = {
  name: 'Article',
  fields: {
    ...moonsFields,
    ...creativeWorkFields
  },
  computedFields: {
    collection: { type: 'string', resolve: () => collectionName.article },
  }
}

export const ContentLayerPageFields = {
  name: 'Page',
  fields: {
    ...moonsFields,
    ...creativeWorkFields
  },
  computedFields: {
    collection: { type: 'string', resolve: () => collectionName.page },
  }
}

export const ContentLayerPersonFields = {
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
  }
}

export const ContentLayerOrganizationFields = {
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
  }
}
