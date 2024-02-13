import type { AstroUserConfig } from 'astro';

import { getDefaultLanguage, getLanguages } from '@galactiks/config';

export const getI18nConfig = (): AstroUserConfig['i18n'] => {
  const locales = getLanguages();
  if (locales.length < 2) {
    return undefined;
  }

  return {
    defaultLocale: getDefaultLanguage() || locales[0],
    locales,
  };
};
