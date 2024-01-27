import type { Id } from '@galactiks/contentlayer';
import { documentByIdentifierSelector, isInLanguage } from '../selectors.mjs';
import { createIdentifierFromString } from '../utils.mjs';
import type { ContentlayerWebPageDocument, ContentlayerDocumentWithRender, ContentlayerWebPageDocumentWithRender } from '../../types/index.mjs';

import { createPage } from './common.mjs';

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

export const computeRemainingListingPages = () => async (
  documents: ContentlayerWebPageDocumentWithRender[]
) => {
  const getDocumentByIdentifier = documentByIdentifierSelector(documents);

  return documents.reduce((acc, _d) => {
    const templateDocument: Partial<ContentlayerWebPageDocument> = {
      dateCreated: _d.dateCreated,
      datePublished: _d.datePublished,
      dateModified: _d.dateModified,
      inLanguage: _d.inLanguage,
    };

    if (_d.isPartOf) {
      const _isPartOfIdentifier = createIdentifierFromString(_d.isPartOf);

      // If parent page does not exist, create it
      if (acc.some((_a) => _a.identifier === _isPartOfIdentifier && isInLanguage(_a, _d.inLanguage)) === false) {
        let translationOfWork: Id | undefined = undefined;
        if (_d.translationOfWork && _d.translationOfWork['@id']) {
          const translationOfWorkDocument = getDocumentByIdentifier(
            _d.translationOfWork['@id']
          );
          if (translationOfWorkDocument?.isPartOf) {
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
                (_a) => _a.identifier === _k && isInLanguage(_a, _d.inLanguage)
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
