import { getDefaultLanguage } from '@galactiks/config';
import type {
  Content,
  ContentlayerDocumentWithURL,
  MetadataHeaders,
} from '../../types';

const nonTranslatedPagesByIdentifierSelector =
  (documents: ContentlayerDocumentWithURL[]) => (identifier: string) =>
    documents.filter(
      (_d) => !_d.translationOfWork?.['@id'] && _d.identifier === identifier
    );

const documentsTranslationOfWorkByIdentifierOrURLSelector =
  (documents: ContentlayerDocumentWithURL[]) =>
  (identifier: string, url: string) =>
    documents.filter(
      ({ translationOfWork }) =>
        translationOfWork?.['@id'] &&
        (translationOfWork?.['@id'] === identifier ||
          translationOfWork?.['@id'] === url)
    );

const translationsSelector = (documents: ContentlayerDocumentWithURL[]) => {
  const selectDocumentsTranslationOfWorkByIdentifierOrURL =
    documentsTranslationOfWorkByIdentifierOrURLSelector(documents);

  return (document: Content) => {
    if (!document.translationOfWork) {
      return selectDocumentsTranslationOfWorkByIdentifierOrURL(
        document.identifier,
        document.url
      );
    }

    return selectDocumentsTranslationOfWorkByIdentifierOrURL(
      document.translationOfWork['@id'],
      document.translationOfWork['@id']
    );
  };
};

const defaultTranslationSelector = (
  documents: ContentlayerDocumentWithURL[]
) => {
  const selectNonTranslatedPagesByIdentifier =
    nonTranslatedPagesByIdentifierSelector(documents);

  return (document: Content, translations: Translations) => {
    if (document.translationOfWork?.['@id']) {
      const defaultPageFromTranslationOfWork =
        selectNonTranslatedPagesByIdentifier(document.translationOfWork['@id']);
      if (defaultPageFromTranslationOfWork.length === 1) {
        return defaultPageFromTranslationOfWork[0];
      }
    }

    const defaultPageFromDefaultLanguage = translations.filter(
      (t) => t.inLanguage === getDefaultLanguage()
    );
    if (defaultPageFromDefaultLanguage.length > 0) {
      return defaultPageFromDefaultLanguage[0];
    }

    return document;
  };
};

type Translations = Array<Content | ContentlayerDocumentWithURL>;

export const alternatesHeaderBuilder = (
  documents: ContentlayerDocumentWithURL[]
) => {
  const selectTranslations = translationsSelector(documents);
  const selectDefaultTranslation = defaultTranslationSelector(documents);

  return (document: Content): MetadataHeaders['alternates'] => {
    const translations: Translations = selectTranslations(document);
    const defaultTranslation = selectDefaultTranslation(document, translations);

    return translations
      .concat(defaultTranslation)
      .filter((_t) => _t.inLanguage)
      .map((_t) => ({ href: _t.url, hreflang: _t.inLanguage as string }))
      .sort((a, b) => a.hreflang.localeCompare(b.hreflang))
      .concat({ href: defaultTranslation.url, hreflang: 'x-default' });
  };
};
