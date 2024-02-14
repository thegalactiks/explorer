import type { Id } from '@galactiks/contentlayer';

import { documentByIdentifierSelector, isInLanguage } from '../selectors.js';
import { createIdentifierFromString } from '../utils.js';
import type {
  ContentlayerWebPageDocument,
  ContentlayerDocumentWithRender,
  ContentlayerWebPageDocumentWithRender,
} from '../../types/index.js';

import { createPage } from './common.js';

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

      if ('isPartOf' in _d && _d.isPartOf) {
        const _isPartOfIdentifier = createIdentifierFromString(_d.isPartOf);

        // If parent page does not exist, create it
        if (
          acc.some(
            (_a) =>
              _a.identifier === _isPartOfIdentifier &&
              isInLanguage(_a, _d.inLanguage)
          ) === false
        ) {
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
            createListingPage(_isPartOfIdentifier, {
              ...templateDocument,
              translationOfWork,
            })
          );
        }
      }

      // Create all keywords pages not existing yet
      if (Array.isArray(_d.keywords)) {
        acc = acc.concat(
          _d.keywords
            .map(createIdentifierFromString)
            .filter(
              (_k) =>
                _k &&
                acc.some(
                  (_a) =>
                    _a.identifier === _k && isInLanguage(_a, _d.inLanguage)
                ) === false
            )
            .map((_k) =>
              createListingPage(_k, {
                ...templateDocument,
                type: 'Tag',
              })
            )
        );
      }

      return acc;
    }, documents);
  };
