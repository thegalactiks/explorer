import type { GalactiksConfig } from '@galactiks/config';
import groupBy from 'lodash.groupby';
import type {
  ContentlayerDocumentWithRender,
  ContentlayerWebPageDocument,
  ContentlayerWebPageDocumentWithRender,
} from '../../types';
import { documentByIdentifierAndLanguageSelector } from '../selectors';
import { createPage } from './common';

const groupLocalesByLanguage = (config: GalactiksConfig) =>
  groupBy(
    config.locales?.available ?? [],
    (locale) => new Intl.Locale(locale).language
  );

const getLanguagesWithMultipleLocales = (config: GalactiksConfig) =>
  Object.fromEntries(
    Object.entries(groupLocalesByLanguage(config)).filter(
      ([, locales]) => locales.length > 1
    )
  );

export const createSameLanguagePages = (config: GalactiksConfig) => {
  const localesGroupedByLanguage = getLanguagesWithMultipleLocales(config);
  const languagesWithMultipleLocales = Object.keys(localesGroupedByLanguage);

  return async (documents: ContentlayerWebPageDocumentWithRender[]) => {
    if (languagesWithMultipleLocales.length === 0) {
      return documents;
    }
    const selectPageByIdentifierAndInLanguage =
      documentByIdentifierAndLanguageSelector(documents);

    return documents.reduce((acc, _d) => {
      if (!_d.inLanguage) {
        return acc;
      }

      const language = new Intl.Locale(_d.inLanguage).language;
      if (!languagesWithMultipleLocales.includes(language)) {
        return acc;
      }

      acc = acc.concat(
        localesGroupedByLanguage[language]
          .filter((locale) => locale !== _d.inLanguage) // exclude current language
          .filter(
            (locale) =>
              selectPageByIdentifierAndInLanguage(_d.identifier, locale) ===
              undefined
          ) // exclude already existing locale
          .map((locale) =>
            createPage<
              ContentlayerDocumentWithRender<ContentlayerWebPageDocument>
            >(_d.identifier, {
              ..._d,
              translationOfWork: _d.translationOfWork || {
                type: 'Id',
                '@id': _d.identifier,
              },
              inLanguage: locale,
            })
          )
      );

      return acc;
    }, documents);
  };
};
