import type { Content } from '../../types/index.js';

export type RepositoryFilters = {
  type?: Content['type'];
  inLanguage?: string;
  inLanguages?: string[];
};

export type WebPageElementFilters = {
  inLanguage?: string;
};
