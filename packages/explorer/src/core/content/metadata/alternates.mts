import { getDefaultLanguage } from '@galactiks/config';
import type {
  Content,
  ContentlayerDocumentWithURL,
  MetadataHeaders,
} from '../../types/index.mjs';

export const alternatesHeaderBuilder = (
  documents: ContentlayerDocumentWithURL[]
) => {
  const selectNonTranslatedPagesByIdentifier = (identifier: string) =>
    documents.filter((_d) => !_d.translationOfWork?.['@id'] && _d.identifier === identifier);
  const selectDocumentsTranslationOfWorkByIdentifierOrURL = (
    identifier: string,
    url: string
  ) =>
    documents.filter(
      ({ translationOfWork }) =>
        translationOfWork?.['@id'] &&
        (translationOfWork?.['@id'] === identifier ||
          translationOfWork?.['@id'] === url)
    );

  const getTranslations = (document: Content) => {
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

  type Translations = Array<Content | ContentlayerDocumentWithURL>

  const getDefaultTranslation = (document: Content, translations: Translations) => {
    if (document.translationOfWork?.['@id']) {
      const defaultPageFromTranslationOfWork = selectNonTranslatedPagesByIdentifier(document.translationOfWork['@id'])
      if (defaultPageFromTranslationOfWork.length === 1) {
        return defaultPageFromTranslationOfWork[0];
      }

      console.log(document.translationOfWork, defaultPageFromTranslationOfWork.length);
    }

    const defaultPageFromDefaultLanguage = translations.filter((t) => t.inLanguage === getDefaultLanguage());
    if (defaultPageFromDefaultLanguage.length > 0) {
      return defaultPageFromDefaultLanguage[0];
    }

    return document;
  }

  return (document: Content): MetadataHeaders['alternates'] => {
    const translations: Translations = getTranslations(document);
    const defaultTranslation = getDefaultTranslation(document, translations);

    return translations
      .concat(defaultTranslation)
      .filter((_t) => _t.inLanguage)
      .map((_t) => ({ href: _t.url, hreflang: _t.inLanguage as string }))
      .concat({ href: defaultTranslation.url, hreflang: 'x-default' });
  };
};
