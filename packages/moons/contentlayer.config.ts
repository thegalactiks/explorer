import {
  FieldDefs,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files'

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

const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: 'articles/**/*.mdx',
  contentType: 'mdx',
  fields: {
    ...moonsFields,
    ...creativeWorkFields
  },
  computedFields: {
    collection: { type: 'string', resolve: () => 'articles' },
  }
}))

const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
  fields: {
    ...moonsFields,
    ...creativeWorkFields
  },
  computedFields: {
    collection: { type: 'string', resolve: () => 'pages' },
  }
}))

const Person = defineDocumentType(() => ({
  name: 'Person',
  filePathPattern: 'persons/**/*.mdx',
  contentType: 'mdx',
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
    collection: { type: 'string', resolve: () => 'persons' },
  }
}))

const contentLayerConfig = makeSource({
  contentDirPath: 'example/content',
  documentTypes: [Article, Page, Person],
  mdx: {},
  disableImportAliasWarning: true,
})

export default contentLayerConfig
