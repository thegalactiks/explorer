import type { DocumentTypeDef as ContentlayerDocumentTypeDef } from 'contentlayer/source-files';

export enum pageDocumentTypes {
  Article = 'articles',
  Organization = 'organizations',
  Page = 'pages',
  Person = 'people',
  Place = 'places',
  Product = 'products',
  Tag = 'tags',
}

export enum documentTypes {
  Article = pageDocumentTypes.Article,
  Offer = 'offer',
  Organization = pageDocumentTypes.Organization,
  Page = pageDocumentTypes.Page,
  Person = pageDocumentTypes.Person,
  Place = pageDocumentTypes.Place,
  Product = pageDocumentTypes.Product,
  Tag = pageDocumentTypes.Tag,
  WebPageElement = 'webPageElements',
  Website = 'websites',
}

export type DocumentTypeDef = ContentlayerDocumentTypeDef & {
  name: keyof typeof documentTypes;
};
