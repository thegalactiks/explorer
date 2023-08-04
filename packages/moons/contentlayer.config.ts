import {
  ComputedFields,
  FieldDefs,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files'

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: doc => doc._raw.flattenedPath
  }
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
  filePathPattern: `articles/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    ...creativeWorkFields
  },
  computedFields: {
    collection: { type: 'string', resolve: () => 'article' },
    ...computedFields,
  }
}))

const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: `pages/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    ...creativeWorkFields
  },
  computedFields: {
    collection: { type: 'string', resolve: () => 'pages' },
    ...computedFields
  }
}))

const contentLayerConfig = makeSource({
  contentDirPath: 'example/content',
  documentTypes: [Article, Page],
  mdx: {},
})

export default contentLayerConfig
