import type { DocumentTypeDef as ContentlayerDocumentTypeDef } from 'contentlayer/source-files';

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

export type DocumentTypeDef = ContentlayerDocumentTypeDef & {
  name: keyof typeof documentTypes;
};
