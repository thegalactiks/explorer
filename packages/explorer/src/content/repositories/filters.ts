import type { Content, ContentlayerWebPageElement } from '../../types/index.js';

export const availableFilters = ['type', 'isPartOf']
export type RepositoryFilters = {
  type?: Content['type'];
  isPartOf?: Content['isPartOf'];
  inLanguage?: string;
  inLanguages?: string[];
};

export type WebPageElementFilters = {
  inLanguage?: string;
  type?: ContentlayerWebPageElement['elementType']
};
