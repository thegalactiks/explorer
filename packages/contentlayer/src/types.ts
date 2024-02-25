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
  inLanguage?: string | undefined;
  translationOfWork?: Id | undefined;
  workTranslation?: Id | undefined;
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
  keywords?: string[] | undefined;
  position?: number | undefined;
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
  inLanguage?: string | undefined;
  translationOfWork?: Id | undefined;
  workTranslation?: Id | undefined;
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
  inLanguage?: string | undefined;
  translationOfWork?: Id | undefined;
  workTranslation?: Id | undefined;
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
  keywords?: string[] | undefined;
  position?: number | undefined;
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
  inLanguage?: string | undefined;
  translationOfWork?: Id | undefined;
  workTranslation?: Id | undefined;
  name: string;
  description: string;
  url?: string | undefined;
  identifier: string;
  image?: any | undefined;
  sameAs?: string | undefined;
  author?: string | undefined;
  headline?: string | undefined;
  dateCreated?: IsoDateTimeString | undefined;
  dateModified?: IsoDateTimeString | undefined;
  datePublished?: IsoDateTimeString | undefined;
  isPartOf?: string | undefined;
  keywords?: string[] | undefined;
  position?: number | undefined;
  additionalName?: string | undefined;
  email?: string | undefined;
  familyName?: string | undefined;
  givenName?: string | undefined;
  jobTitle?: string | undefined;
  telephone?: string | undefined;
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
  inLanguage?: string | undefined;
  translationOfWork?: Id | undefined;
  workTranslation?: Id | undefined;
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
  keywords?: string[] | undefined;
  position?: number | undefined;
  address?: PostalAddress | undefined;
  latitude?: string | undefined;
  longitude?: string | undefined;
  telephone?: string | undefined;
  /** MDX file body */
  body: MDX;
};

export type Product = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: 'Product';
  listingPage: boolean;
  slug?: string | undefined;
  path?: string | undefined;
  inLanguage?: string | undefined;
  translationOfWork?: Id | undefined;
  workTranslation?: Id | undefined;
  name: string;
  description: string;
  url?: string | undefined;
  identifier: string;
  image?: any | undefined;
  sameAs?: string | undefined;
  category?: string | undefined;
  brand?: Id | undefined;
  color?: string | undefined;
  depth?: QuantitativeValue | undefined;
  gtin?: string | undefined;
  hasEnergyConsumptionDetails?: EnergyConsumptionDetails | undefined;
  hasMeasurement?: QuantitativeValue | undefined;
  height?: QuantitativeValue | undefined;
  keywords?: string[] | undefined;
  manufacturer?: Id | undefined;
  model?: Id | undefined;
  offers?: Offer[] | undefined;
  sku?: string | undefined;
  weight?: QuantitativeValue | undefined;
  width?: QuantitativeValue | undefined;
  /** MDX file body */
  body: MDX;
};

export type WebPageElement = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: 'WebPageElement';
  elementType?:
    | 'SiteNavigationElement'
    | 'WPFooter'
    | 'WPHeader'
    | 'WPSideBar'
    | undefined;
  inLanguage?: string | undefined;
  translationOfWork?: Id | undefined;
  workTranslation?: Id | undefined;
  name?: string | undefined;
  identifier: string;
  itemListElement: ItemListElement[];
  /** MDX file body */
  body: MDX;
};

export type Website = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: 'Website';
  inLanguage?: string | undefined;
  translationOfWork?: Id | undefined;
  workTranslation?: Id | undefined;
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
  keywords?: string[] | undefined;
  position?: number | undefined;
  issn?: string | undefined;
  /** MDX file body */
  body: MDX;
};

/** Nested types */
export type EnergyConsumptionDetails = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: 'EnergyConsumptionDetails';
  energyEfficiencyScaleMax?:
    | 'EUEnergyEfficiencyCategoryA'
    | 'EUEnergyEfficiencyCategoryA1Plus'
    | 'EUEnergyEfficiencyCategoryA2Plus'
    | 'EUEnergyEfficiencyCategoryA3Plus'
    | 'EUEnergyEfficiencyCategoryB'
    | 'EUEnergyEfficiencyCategoryC'
    | 'EUEnergyEfficiencyCategoryD'
    | 'EUEnergyEfficiencyCategoryE'
    | 'EUEnergyEfficiencyCategoryF'
    | 'EUEnergyEfficiencyCategoryG'
    | undefined;
  energyEfficiencyScaleMin?:
    | 'EUEnergyEfficiencyCategoryA'
    | 'EUEnergyEfficiencyCategoryA1Plus'
    | 'EUEnergyEfficiencyCategoryA2Plus'
    | 'EUEnergyEfficiencyCategoryA3Plus'
    | 'EUEnergyEfficiencyCategoryB'
    | 'EUEnergyEfficiencyCategoryC'
    | 'EUEnergyEfficiencyCategoryD'
    | 'EUEnergyEfficiencyCategoryE'
    | 'EUEnergyEfficiencyCategoryF'
    | 'EUEnergyEfficiencyCategoryG'
    | undefined;
};

export type Id = {
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

export type Offer = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: 'Offer';
  listingPage: boolean;
  slug?: string | undefined;
  path?: string | undefined;
  inLanguage?: string | undefined;
  translationOfWork?: Id | undefined;
  workTranslation?: Id | undefined;
  name: string;
  description: string;
  url?: string | undefined;
  identifier: string;
  image?: any | undefined;
  sameAs?: string | undefined;
  price: number;
  priceCurrency: string;
  seller?: Id | undefined;
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

export type QuantitativeValue = {
  /** File path relative to `contentDirPath` */
  _id: string;
  _raw: Local.RawDocumentData;
  type: 'QuantitativeValue';
  maxValue?: number | undefined;
  minValue?: number | undefined;
  value: number;
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
  | Product
  | WebPageElement
  | Website;
export type DocumentTypeNames =
  | 'Article'
  | 'Organization'
  | 'Page'
  | 'Person'
  | 'Place'
  | 'Product'
  | 'WebPageElement'
  | 'Website';

export type NestedTypes =
  | EnergyConsumptionDetails
  | Id
  | ItemListElement
  | Offer
  | PostalAddress
  | QuantitativeValue;
export type NestedTypeNames =
  | 'EnergyConsumptionDetails'
  | 'Id'
  | 'ItemListElement'
  | 'Offer'
  | 'PostalAddress'
  | 'QuantitativeValue';

export type DataExports = {
  allDocuments: DocumentTypes[];
  allArticles: Article[];
  allOrganizations: Organization[];
  allPages: Page[];
  allPeople: Person[];
  allPlaces: Place[];
  allProducts: Product[];
  allWebsites: Website[];
  allWebPageElements: WebPageElement[];
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
  Product: Product;
  WebPageElement: WebPageElement;
  Website: Website;
};

export type NestedTypeMap = {
  EnergyConsumptionDetails: EnergyConsumptionDetails;
  Id: Id;
  ItemListElement: ItemListElement;
  Offer: Offer;
  PostalAddress: PostalAddress;
  QuantitativeValue: QuantitativeValue;
};
