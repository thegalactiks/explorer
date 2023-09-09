import { getConfig } from '@withmoons/config';
import { join } from 'path';
import type {
  ContentlayerWebPageDocument,
  ContentlayerWebsite,
} from './types/index.mjs';
import {
  documentByIdentifierAndLanguageSelector,
  documentsByLanguageSelector,
  pageDepthSelector,
} from './selectors.mjs';
import type { ContentlayerWebPageDocumentWithRender } from './render.mjs';

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
type ContentlayerDocumentWithPath = WithRequired<
  ContentlayerWebPageDocument,
  'path'
>;
export type ContentlayerDocumentWithURL = WithRequired<
  ContentlayerDocumentWithPath,
  'url'
>;

const _getPath = (document: ContentlayerWebPageDocument): string => {
  if (document.path) {
    return join('/', document.path);
  }

  return document.identifier === 'index' ? '/' : `/${document.identifier}`;
};

export const computeDocumentsUrl =
  (websites: ContentlayerWebsite[]) =>
  async (documents: ContentlayerWebPageDocumentWithRender[]) => {
    const getDocumentByIdentifierAndLanguage =
      documentByIdentifierAndLanguageSelector(documents);
    const getWebsitesByLanguage = documentsByLanguageSelector(websites);

    const { webManifest } = getConfig();

    const _getDocumentUrl = (
      document: ContentlayerDocumentWithPath
    ): string => {
      if (document.url) {
        return document.url;
      }

      let baseUrl = webManifest.start_url;
      if (websites.length === 1 && websites[0].url) {
        baseUrl = websites[0].url;
      } else if (websites.length > 1 && document.inLanguage) {
        const websitesByLanguage = getWebsitesByLanguage(document.inLanguage);
        if (websitesByLanguage.length === 1 && websitesByLanguage[0].url) {
          baseUrl = websitesByLanguage[0].url;
        }
      }

      return new URL(document.path, baseUrl).toString();
    };

    const _computePath = (document: ContentlayerWebPageDocument): string => {
      const path = _getPath(document);
      if (!document.isPartOf) {
        return path;
      }

      // The page has been created if missing
      const parent = getDocumentByIdentifierAndLanguage(
        document.isPartOf,
        document.inLanguage
      ) as ContentlayerDocumentWithPath;
      return join(_getPath(parent), path);
    };

    const selectPageDepth = pageDepthSelector(documents);
    return documents
      .sort((_d) => selectPageDepth(_d))
      .map((document) => {
        document.path = _computePath(document);
        document.url = _getDocumentUrl(
          document as ContentlayerDocumentWithPath
        );

        return document as ContentlayerWebPageDocumentWithRender &
          ContentlayerDocumentWithURL;
      });
  };
