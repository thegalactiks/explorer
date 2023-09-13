import type { MDX } from 'contentlayer/core';

import type {
  Article as ContentlayerArticle,
  Page as ContentlayerPage,
  Person as ContentlayerPerson,
} from './contentlayer.mjs';
import type { MetadataHeaders, Page } from './_schemas.mjs';
import type { Render } from '../render.mjs';

export type Content = Page & {
  body: MDX & { render: Render };
} & MetadataHeaders;

export type {
  DocumentTypes as ContentlayerDocumentTypes,
  DataExports as ContentlayerDataExports,
  Person as ContentlayerPerson,
  Website as ContentlayerWebsite,
  WebPageElement as ContentlayerWebPageElement,
} from './contentlayer.mjs';
export type * from './_schemas.mjs';
type ContentlayerTagPage = Omit<ContentlayerPage, 'type'> & { type: 'Tag' };
export type ContentlayerWebPageDocument =
  | ContentlayerArticle
  | ContentlayerPage
  | ContentlayerPerson
  | ContentlayerTagPage;
