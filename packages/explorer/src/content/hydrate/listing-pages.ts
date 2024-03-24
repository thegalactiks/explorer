import { isPageEnabled } from '@galactiks/config';
import type { Id } from '@galactiks/contentlayer';
import Debug from 'debug';

import { documentByIdentifierSelector, isInLanguage } from '../selectors.js';
import { createIdentifierFromString } from '../utils.js';
import type {
  ContentlayerWebPageDocument,
  ContentlayerDocumentWithRender,
  ContentlayerWebPageDocumentWithRender,
} from '../../types/index.js';

import { createPage } from './common.js';

const debug = Debug('@galactiks/explorer:listing-pages');

const getParentByType = (
  document: ContentlayerWebPageDocumentWithRender
): string | undefined => {
  switch (document.type) {
    case 'Product':
      return document.category;
    case 'Place':
      return document.containedInPlace;
    case 'Article':
    case 'Page':
      return document.isPartOf;
    default:
      return undefined;
  }
};

const createListingPage = (
  identifier: string,
  document: Partial<ContentlayerWebPageDocument> = {}
) =>
  createPage<ContentlayerDocumentWithRender<ContentlayerWebPageDocument>>(
    identifier,
    {
      listingPage: true,
      ...document,
    }
  );

const isPageExists = (
  identifier: string,
  inLanguage: string | undefined,
  documents: ContentlayerWebPageDocumentWithRender[]
) =>
  documents.some(
    (_d) =>
      _d.type === 'Page' &&
      _d.identifier === identifier &&
      isInLanguage(_d, inLanguage)
  );

export const computeRemainingListingPages =
  () => async (documents: ContentlayerWebPageDocumentWithRender[]) => {
    const getDocumentByIdentifier = documentByIdentifierSelector(documents);

    return documents.reduce((acc, _d) => {
      const templateDocument: Partial<ContentlayerWebPageDocument> = {
        dateCreated: 'dateCreated' in _d ? _d.dateCreated : undefined,
        datePublished: 'datePublished' in _d ? _d.datePublished : undefined,
        dateModified: 'dateModified' in _d ? _d.dateModified : undefined,
        inLanguage: _d.inLanguage,
      };

      const parent = getParentByType(_d);
      if (parent) {
        const parentIdentifier = createIdentifierFromString(parent);

        // If parent page does not exist, create it
        if (!isPageExists(parentIdentifier, _d.inLanguage, acc)) {
          debug('Creating parent page', parent);
          let translationOfWork: Id | undefined = undefined;
          if (_d.translationOfWork && _d.translationOfWork['@id']) {
            const translationOfWorkDocument = getDocumentByIdentifier(
              _d.translationOfWork['@id']
            );
            if (
              translationOfWorkDocument &&
              'isPartOf' in translationOfWorkDocument &&
              typeof translationOfWorkDocument.isPartOf === 'string'
            ) {
              translationOfWork = {
                type: 'Id',
                '@id': translationOfWorkDocument.isPartOf,
              };
            }
          }

          acc = acc.concat(
            createListingPage(parentIdentifier, {
              ...templateDocument,
              translationOfWork,
            })
          );
        }
      }

      // Create all keywords pages not existing yet
      if (isPageEnabled('tags') && Array.isArray(_d.keywords)) {
        acc = acc.concat(
          _d.keywords
            .map(createIdentifierFromString)
            .filter(
              (_k) =>
                acc.some(
                  (_a) =>
                    _a.type === 'Tag' &&
                    _a.identifier === _k &&
                    isInLanguage(_a, _d.inLanguage)
                ) === false
            )
            .map((_k) => {
              debug('Creating keyword page', _k);
              return createListingPage(_k, {
                ...templateDocument,
                type: 'Tag',
              });
            })
        );
      }

      return acc;
    }, documents);
  };
