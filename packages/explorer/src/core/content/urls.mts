import { StdUriTemplate } from '@std-uritemplate/std-uritemplate';
import { getConfig } from '@galactiks/config';
import { documentTypes } from '@galactiks/contentlayer';
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
import { homeIdentifier } from './consts.mjs';

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
type ContentlayerDocumentWithPath = WithRequired<
  ContentlayerWebPageDocument,
  'path'
>;
export type ContentlayerDocumentWithURL = WithRequired<
  ContentlayerDocumentWithPath,
  'url'
>;

const _getPathWithoutTemplate = (
  document: ContentlayerWebPageDocument
): string => {
  if (document.path) {
    return document.path;
  }

  return document.identifier;
};

const makePathRelative = (path: string) =>
  path.substring(0, 1) === '/' ? path.substring(1) : path;

export const computeDocumentsUrl =
  (websites: ContentlayerWebsite[]) =>
  async (documents: ContentlayerWebPageDocumentWithRender[]) => {
    const getDocumentByIdentifierAndLanguage =
      documentByIdentifierAndLanguageSelector(documents);
    const getWebsitesByLanguage = documentsByLanguageSelector(websites);

    const { locales, pages, webManifest } = getConfig();

    const _getPagePathTemplate = (
      type: ContentlayerWebPageDocument['type'],
      inLanguage?: string
    ) => {
      const page = pages[documentTypes[type]] || pages[documentTypes.Page];
      if (!page) {
        return undefined;
      }

      if (typeof page.path === 'string') {
        return page.path;
      }

      return page.path.find(
        ({ locale }) => locale === inLanguage || locale === locales?.default
      )?.path;
    };

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

    const _computePath = (
      document: ContentlayerWebPageDocument
    ): string | undefined => {
      if (document.path) {
        return join('/', document.path);
      }

      const pathTemplate = _getPagePathTemplate(
        document.type,
        document.inLanguage
      );
      if (!pathTemplate) {
        return undefined;
      }

      let isPartOfPath: string | undefined;
      if (pathTemplate.indexOf('isPartOf') && document.isPartOf) {
        // The page has been created if missing
        const isPartOf = getDocumentByIdentifierAndLanguage(
          document.isPartOf,
          document.inLanguage
        ) as ContentlayerDocumentWithPath;
        isPartOfPath =
          makePathRelative(_getPathWithoutTemplate(isPartOf)) || '';
      }

      const existingStringProperties: [string, string][] = Object.entries({
        ...document,
        identifier:
          document.identifier !== homeIdentifier ? document.identifier : '',
        isPartOf: isPartOfPath,
      }).filter(([, value]) => typeof value === 'string');
      return join(
        StdUriTemplate.expand(
          pathTemplate,
          Object.fromEntries(existingStringProperties)
        )
      );
    };

    const selectPageDepth = pageDepthSelector(documents);
    return documents
      .sort((_document) => selectPageDepth(_document))
      .map((_document) => {
        const path = _document.path || _computePath(_document);
        let url: string | undefined = undefined;
        if (path) {
          url = _getDocumentUrl(_document as ContentlayerDocumentWithPath);
        }

        return {
          ..._document,
          url,
          path,
        } as ContentlayerWebPageDocumentWithRender &
          ContentlayerDocumentWithURL;
      })
      .filter((_document) => _document.path);
  };
