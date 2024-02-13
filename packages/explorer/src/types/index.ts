import type {
  MDX,
  Article as ContentlayerArticle,
  Page as ContentlayerPage,
  Person as ContentlayerPerson,
  Place as ContentlayerPlace,
} from '@galactiks/contentlayer';

import type { MetadataHeaders, Page } from './_schemas';
import type { ContentlayerDocumentWithRender, Render } from './render';

export type Content = Page & {
  body: MDX & { render: Render };
} & MetadataHeaders;

export type {
  DocumentTypes as ContentlayerDocumentTypes,
  DataExports as ContentlayerDataExports,
  Organization as ContentlayerOrganization,
  Person as ContentlayerPerson,
  Place as ContentlayerPlace,
  Website as ContentlayerWebsite,
  WebPageElement as ContentlayerWebPageElement,
} from '@galactiks/contentlayer';
export type * from './_schemas';
export type * from './render';

type ContentlayerTagPage = Omit<ContentlayerPage, 'type'> & { type: 'Tag' };
export type ContentlayerWebPageDocument =
  | ContentlayerArticle
  | ContentlayerPage
  | ContentlayerPerson
  | ContentlayerPlace
  | ContentlayerTagPage;
export type ContentlayerWebPageDocumentWithRender =
  ContentlayerDocumentWithRender<ContentlayerWebPageDocument>;

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
type ContentlayerDocumentWithPath = WithRequired<
  ContentlayerWebPageDocument,
  'path'
>;
export type ContentlayerDocumentWithURL = WithRequired<
  ContentlayerDocumentWithPath,
  'url'
>;
