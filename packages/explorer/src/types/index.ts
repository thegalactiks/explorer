import type {
  MDX,
  Article as ContentlayerArticle,
  Organization as ContentlayerOrganization,
  Page as ContentlayerPage,
  Person as ContentlayerPerson,
  Place as ContentlayerPlace,
  Product as ContentlayerProduct,
} from '@galactiks/contentlayer';

import type { MetadataHeaders, Page } from './_schemas';
import type { ContentlayerDocumentWithRender, Render } from './render';

type ContentlayerTagPage = Omit<ContentlayerPage, 'type'> & { type: 'Tag' };
export type ContentlayerWebPageDocument =
  | ContentlayerArticle
  | ContentlayerOrganization
  | ContentlayerPage
  | ContentlayerPerson
  | ContentlayerPlace
  | ContentlayerProduct
  | ContentlayerTagPage;
export type CreativeWorkWebPageDocument =
  | ContentlayerArticle
  | ContentlayerPage;
export type ContentlayerWebPageDocumentWithRender =
  ContentlayerDocumentWithRender<ContentlayerWebPageDocument>;

export type Content = Page & {
  body: MDX & { render: Render };
} & MetadataHeaders;

export type {
  DocumentTypes as ContentlayerDocumentTypes,
  DataExports as ContentlayerDataExports,
  Organization as ContentlayerOrganization,
  Page as ContentlayerPage,
  Person as ContentlayerPerson,
  Place as ContentlayerPlace,
  Product as ContentlayerProduct,
  Website as ContentlayerWebsite,
  WebPageElement as ContentlayerWebPageElement,
} from '@galactiks/contentlayer';
export type * from './_schemas';
export type * from './render';

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
type ContentlayerDocumentWithPath = WithRequired<
  ContentlayerWebPageDocument,
  'path'
>;
export type ContentlayerDocumentWithURL = WithRequired<
  ContentlayerDocumentWithPath,
  'url'
>;
