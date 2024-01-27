import { getDefaultLanguage } from '@galactiks/config';
import type {
  Content,
  ContentlayerDocumentWithURL,
  MetadataHeaders,
} from '../../types/index.mjs';

export const alternatesHeaderBuilder = (
  documents: ContentlayerDocumentWithURL[]
) => {
  const selectPagesByIdentifier = (identifier: string) =>
    documents.filter((_d) => _d.identifier === identifier);
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

  return (document: Content): MetadataHeaders['alternates'] => {
    let translations: Array<ContentlayerDocumentWithURL | Content> = [];
    let defaultTranslation: ContentlayerDocumentWithURL | Content | undefined;
    if (document.translationOfWork) {
      const translationOfWorkId = document.translationOfWork['@id'];

      const originalWork = documents.find(
        (_d) =>
          _d.identifier === translationOfWorkId ||
          _d.url === translationOfWorkId
      );
      if (!originalWork) {
        throw new Error(`no original work found for ${translationOfWorkId}`);
      }

      translations = selectDocumentsTranslationOfWorkByIdentifierOrURL(
        translationOfWorkId,
        translationOfWorkId
      );
      defaultTranslation = originalWork;
    } else {
      translations = selectDocumentsTranslationOfWorkByIdentifierOrURL(
        document.identifier,
        document.url
      );
    }

    if (translations.length === 0) {
      translations = selectPagesByIdentifier(document.identifier);
    }

    if (!defaultTranslation) {
      const configDefaultLanguage = getDefaultLanguage();
      defaultTranslation =
        translations.find((t) => t.inLanguage === configDefaultLanguage) ||
        document;
    }

    return translations
      .filter((_t) => _t.inLanguage)
      .map((_t) => ({ href: _t.url, hreflang: _t.inLanguage as string }))
      .concat({ href: defaultTranslation.url, hreflang: 'x-default' });
  };
};
