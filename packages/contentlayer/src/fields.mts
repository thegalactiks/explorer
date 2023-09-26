import {
  defineNestedType,
  type DocumentTypeDef as ContentlayerDocumentTypeDef,
  type FieldDefs,
  type NestedType,
} from 'contentlayer/source-files';

export enum pageDocumentTypes {
  Article = 'articles',
  Organization = 'organizations',
  Page = 'pages',
  Person = 'people',
  Place = 'place',
  Tag = 'tags',
}

export enum documentTypes {
  Article = pageDocumentTypes.Article,
  Organization = pageDocumentTypes.Organization,
  Page = pageDocumentTypes.Page,
  Person = pageDocumentTypes.Person,
  Place = pageDocumentTypes.Place,
  Tag = pageDocumentTypes.Tag,
  WebPageElement = 'webPageElements',
  Website = 'websites',
}

type DocumentTypeDef = ContentlayerDocumentTypeDef & {
  name: keyof typeof documentTypes;
};

const galactiksFields: FieldDefs = {
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
    ...galactiksFields,
    ...creativeWorkFields,
  },
};

export const ContentLayerPageFields: DocumentTypeDef = {
  name: 'Page',
  fields: {
    ...galactiksFields,
    ...creativeWorkFields,
  },
};

export const ContentLayerPersonFields: DocumentTypeDef = {
  name: 'Person',
  fields: {
    ...galactiksFields,
    ...creativeWorkFields,
    dateCreated: { type: 'date', required: false },
    additionalName: { type: 'string', required: false },
    email: { type: 'string', required: false },
    familyName: { type: 'string', required: false },
    givenName: { type: 'string', required: false },
    jobTitle: { type: 'string', required: false },
    telephone: { type: 'string', required: false },
  },
};

const postalAddress = defineNestedType(() => ({
  name: 'PostalAddress',
  fields: {
    addressCountry: { type: 'string', required: true },
    addressLocality: { type: 'string', required: false },
    addressRegion: { type: 'string', required: false },
    postOfficeBoxNumber: { type: 'string', required: false },
    postalCode: { type: 'string', required: false },
    streetAddress: { type: 'string', required: false },
  },
}));

export const ContentLayerPlaceFields: DocumentTypeDef = {
  name: 'Place',
  fields: {
    ...galactiksFields,
    ...creativeWorkFields,
    address: { type: 'nested', of: postalAddress },
    latitude: { type: 'string', required: false },
    longitude: { type: 'string', required: false },
    keywords: { type: 'list', required: false, of: { type: 'string' } },
    telephone: { type: 'string', required: false },
  },
};

export const ContentLayerOrganizationFields: DocumentTypeDef = {
  name: 'Organization',
  fields: {
    ...galactiksFields,
    ...thingsFields,
    email: { type: 'string', required: false },
    keywords: { type: 'list', required: false, of: { type: 'string' } },
    legalName: { type: 'string', required: false },
    slogan: { type: 'string', required: false },
    taxID: { type: 'string', required: false },
    telephone: { type: 'string', required: false },
    vatID: { type: 'string', required: false },
  },
};
