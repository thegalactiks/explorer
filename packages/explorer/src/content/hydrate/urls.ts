import { StdUriTemplate } from '@std-uritemplate/std-uritemplate';
import { getConfig } from '@galactiks/config';
import { documentTypes } from '@galactiks/contentlayer';
import { join } from 'path';
import Debug from 'debug';
import type {
  ContentlayerDocumentWithURL,
  ContentlayerWebPageDocument,
  ContentlayerWebPageDocumentWithRender,
  ContentlayerWebsite,
} from '../../types/index.js';

import { homeIdentifier } from '../consts.js';
import {
  documentByIdentifierAndLanguageSelector,
  documentsByLanguageSelector,
  pageDepthSelector,
} from '../selectors.js';

const debug = Debug('@galactiks/explorer:urls');

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

const addMissingTrailingSlash = (path: string) =>
  path.endsWith('/') ? path : `${path}/`;

const removeTrailingSlash = (path: string) =>
  path.endsWith('/') ? path.substring(0, path.length - 1) : path;

export const computeDocumentsUrl =
  (websites: ContentlayerWebsite[]) =>
  async (documents: ContentlayerWebPageDocumentWithRender[]) => {
    const getDocumentByIdentifierAndLanguage =
      documentByIdentifierAndLanguageSelector(documents);
    const getWebsitesByLanguage = documentsByLanguageSelector(websites);

    const { trailingSlash, locales, pages, webManifest } = getConfig();

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
      document: ContentlayerWebPageDocument,
      path: string
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

      return new URL(path, baseUrl).toString();
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
      if ('category' in document && document.category) {
        const category = getDocumentByIdentifierAndLanguage(
          document.category,
          document.inLanguage
        );
        isPartOfPath =
          (category && makePathRelative(_getPathWithoutTemplate(category))) ||
          '';
      } else if (
        'isPartOf' in document &&
        document.isPartOf &&
        pathTemplate.indexOf('isPartOf')
      ) {
        // The page has been created if missing
        const isPartOf = getDocumentByIdentifierAndLanguage(
          document.isPartOf,
          document.inLanguage
        );
        isPartOfPath =
          (isPartOf && makePathRelative(_getPathWithoutTemplate(isPartOf))) ||
          '';
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
      .reduce((acc, _document) => {
        let path = _computePath(_document);
        if (!path) {
          return acc;
        }

        if (trailingSlash === 'always') {
          path = addMissingTrailingSlash(path);
        } else if (trailingSlash === 'never') {
          path = removeTrailingSlash(path);
        }

        const _computed = {
          ..._document,
          url: _getDocumentUrl(_document, path),
          path,
        } as ContentlayerWebPageDocumentWithRender &
          ContentlayerDocumentWithURL;

        debug('computing document url', _computed);

        return [...acc, _computed];
      }, [] as Array<ContentlayerDocumentWithURL & ContentlayerWebPageDocumentWithRender>);
  };
