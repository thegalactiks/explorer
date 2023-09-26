import type {
  MDX,
  Article as ContentlayerArticle,
  Page as ContentlayerPage,
  Person as ContentlayerPerson,
  Place as ContentlayerPlace,
} from '@galactiks/contentlayer';

import type { MetadataHeaders, Page } from './_schemas.mjs';
import type { Render } from '../render.mjs';

export type Content = Page & {
  body: MDX & { render: Render };
} & MetadataHeaders;

export type {
  DocumentTypes as ContentlayerDocumentTypes,
  DataExports as ContentlayerDataExports,
  Person as ContentlayerPerson,
  Place as ContentlayerPlace,
  Website as ContentlayerWebsite,
  WebPageElement as ContentlayerWebPageElement,
} from '@galactiks/contentlayer';
export type * from './_schemas.mjs';
type ContentlayerTagPage = Omit<ContentlayerPage, 'type'> & { type: 'Tag' };
export type ContentlayerWebPageDocument =
  | ContentlayerArticle
  | ContentlayerPage
  | ContentlayerPerson
  | ContentlayerPlace
  | ContentlayerTagPage;
