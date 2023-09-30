/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  Markdown,
  MDX,
  ImageFieldData,
  IsoDateTimeString,
} from 'contentlayer/core';
import * as Local from 'contentlayer/source-files';

export type { Markdown, MDX, ImageFieldData, IsoDateTimeString };

/** Document types */
export type Article = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: 'Article';
  listingPage: boolean;
  slug?: string | undefined;
  path?: string | undefined;
  name: string;
  description: string;
  url?: string | undefined;
  identifier: string;
  image?: any | undefined;
  sameAs?: string | undefined;
  author?: string | undefined;
  headline?: string | undefined;
  dateCreated: IsoDateTimeString;
  dateModified?: IsoDateTimeString | undefined;
  datePublished?: IsoDateTimeString | undefined;
  isPartOf?: string | undefined;
  inLanguage?: string | undefined;
  translationOfWork?: Id | undefined;
  workTranslation?: Id | undefined;
  keywords?: string[] | undefined;
  /** MDX file body */
  body: MDX;
};

export type Organization = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: 'Organization';
  listingPage: boolean;
  slug?: string | undefined;
  path?: string | undefined;
  name: string;
  description: string;
  url?: string | undefined;
  identifier: string;
  image?: any | undefined;
  sameAs?: string | undefined;
  email?: string | undefined;
  keywords?: string[] | undefined;
  legalName?: string | undefined;
  slogan?: string | undefined;
  taxID?: string | undefined;
  telephone?: string | undefined;
  vatID?: string | undefined;
  /** MDX file body */
  body: MDX;
};

export type Page = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: 'Page';
  listingPage: boolean;
  slug?: string | undefined;
  path?: string | undefined;
  name: string;
  description: string;
  url?: string | undefined;
  identifier: string;
  image?: any | undefined;
  sameAs?: string | undefined;
  author?: string | undefined;
  headline?: string | undefined;
  dateCreated: IsoDateTimeString;
  dateModified?: IsoDateTimeString | undefined;
  datePublished?: IsoDateTimeString | undefined;
  isPartOf?: string | undefined;
  inLanguage?: string | undefined;
  translationOfWork?: Id | undefined;
  workTranslation?: Id | undefined;
  keywords?: string[] | undefined;
  /** MDX file body */
  body: MDX;
};

export type Person = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: 'Person';
  listingPage: boolean;
  slug?: string | undefined;
  path?: string | undefined;
  name: string;
  description: string;
  url?: string | undefined;
  identifier: string;
  image?: any | undefined;
  sameAs?: string | undefined;
  additionalName?: string | undefined;
  email?: string | undefined;
  familyName?: string | undefined;
  givenName?: string | undefined;
  jobTitle?: string | undefined;
  telephone?: string | undefined;
  isPartOf?: string | undefined;
  inLanguage?: string | undefined;
  dateCreated: IsoDateTimeString;
  dateModified?: IsoDateTimeString | undefined;
  datePublished?: IsoDateTimeString | undefined;
  translationOfWork?: Id | undefined;
  workTranslation?: Id | undefined;
  keywords?: string[] | undefined;
  author?: string | undefined;
  /** MDX file body */
  body: MDX;
};

export type Place = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: 'Place';
  listingPage: boolean;
  slug?: string | undefined;
  path?: string | undefined;
  name: string;
  description: string;
  url?: string | undefined;
  identifier: string;
  image?: any | undefined;
  sameAs?: string | undefined;
  author?: string | undefined;
  headline?: string | undefined;
  dateCreated: IsoDateTimeString;
  dateModified?: IsoDateTimeString | undefined;
  datePublished?: IsoDateTimeString | undefined;
  isPartOf?: string | undefined;
  inLanguage?: string | undefined;
  translationOfWork?: Id | undefined;
  workTranslation?: Id | undefined;
  keywords?: string[] | undefined;
  address?: PostalAddress | undefined;
  latitude?: string | undefined;
  longitude?: string | undefined;
  telephone?: string | undefined;
  /** MDX file body */
  body: MDX;
};

export type WebPageElement = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: 'WebPageElement';
  elementType?: 'SiteNavigationElement' | undefined;
  identifier: string;
  inLanguage?: string | undefined;
  name?: string | undefined;
  itemListElement: ItemListElement[];
  /** MDX file body */
  body: MDX;
};

export type Website = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: 'Website';
  name: string;
  description: string;
  url?: string | undefined;
  identifier: string;
  image?: any | undefined;
  sameAs?: string | undefined;
  author?: string | undefined;
  headline?: string | undefined;
  dateCreated: IsoDateTimeString;
  dateModified?: IsoDateTimeString | undefined;
  datePublished?: IsoDateTimeString | undefined;
  isPartOf?: string | undefined;
  inLanguage?: string | undefined;
  translationOfWork?: Id | undefined;
  workTranslation?: Id | undefined;
  keywords?: string[] | undefined;
  issn?: string | undefined;
  /** MDX file body */
  body: MDX;
};

/** Nested types */

export type Id = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: 'Id';
  '@id': string;
};

export type ItemListElement = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: 'ItemListElement';
  name: string;
  path?: string | undefined;
  url?: string | undefined;
  itemListElement?: ItemListElement[] | undefined;
};

export type PostalAddress = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: 'PostalAddress';
  addressCountry: string;
  addressLocality?: string | undefined;
  addressRegion?: string | undefined;
  postOfficeBoxNumber?: string | undefined;
  postalCode?: string | undefined;
  streetAddress?: string | undefined;
};

/** Helper types */

export type AllTypes = DocumentTypes | NestedTypes;
export type AllTypeNames = DocumentTypeNames | NestedTypeNames;

export type DocumentTypes =
  | Article
  | Organization
  | Page
  | Person
  | Place
  | WebPageElement
  | Website;
export type DocumentTypeNames =
  | 'Article'
  | 'Organization'
  | 'Page'
  | 'Person'
  | 'Place'
  | 'WebPageElement'
  | 'Website';

export type NestedTypes = Id | ItemListElement | PostalAddress;
export type NestedTypeNames = 'Id' | 'ItemListElement' | 'PostalAddress';

export type DataExports = {
  allDocuments: DocumentTypes[];
  allArticles?: Article[];
  allOrganizations?: Organization[];
  allPages?: Page[];
  allPeople?: Person[];
  allPlaces?: Place[];
  allWebsites?: Website[];
  allWebPageElements?: WebPageElement[];
};

export interface ContentlayerGenTypes {
  documentTypes: DocumentTypes;
  documentTypeMap: DocumentTypeMap;
  documentTypeNames: DocumentTypeNames;
  nestedTypes: NestedTypes;
  nestedTypeMap: NestedTypeMap;
  nestedTypeNames: NestedTypeNames;
  allTypeNames: AllTypeNames;
  dataExports: DataExports;
}

declare global {
  interface ContentlayerGen extends ContentlayerGenTypes {}
}

export type DocumentTypeMap = {
  Article: Article;
  Organization: Organization;
  Page: Page;
  Person: Person;
  Place: Place;
  WebPageElement: WebPageElement;
  Website: Website;
};

export type NestedTypeMap = {
  Id: Id;
  ItemListElement: ItemListElement;
  PostalAddress: PostalAddress;
};
