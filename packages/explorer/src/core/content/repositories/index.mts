import { getDefaultLanguage, getLanguages } from '@galactiks/config';

import type { Content } from '../../types/index.mjs';
import { homeIdentifier } from '../consts.mjs';
import { documentByIdentifierSelector } from '../selectors.mjs';
import { createIdentifierFromString } from '../utils.mjs';

import type { RepositoryFilters } from './filters.mjs';
import { getOrganizations, getPages } from './generated.mjs';

export * from './generated.mjs';

export const getRootPages = async (
  filters?: RepositoryFilters
): Promise<Content[]> =>
  (await getPages(filters)).filter((doc) => !doc.isPartOf);
export const getPagesPartOf = async (
  slug: string,
  filters?: RepositoryFilters
): Promise<Content[]> =>
  (await getPages(filters)).filter((doc) => doc.isPartOf === slug);
export const getPagesWithKeywordIdentifier = async (
  keywordIdentifier: string,
  filters?: RepositoryFilters
): Promise<Content[]> =>
  (await getPages(filters)).filter(
    (doc) =>
      doc.keywords?.some(
        (keyword) => createIdentifierFromString(keyword) === keywordIdentifier
      )
  );
export const getPageByIdentifier = async (
  identifier: string,
  filters?: RepositoryFilters
) => documentByIdentifierSelector(await getPages(filters))(identifier);

export const getPageByURL = async (url: string) =>
  (await getPages()).find((_p) => _p.url === url);

export const getTagPageByKeyword = async (
  keyword: string,
  filters?: RepositoryFilters
) =>
  (await getPages(filters)).filter(
    (doc) =>
      doc.type === 'Tag' &&
      doc.identifier === createIdentifierFromString(keyword)
  );

export const getPageBySlug = async (
  slug: string,
  filters?: RepositoryFilters
) => (await getPages(filters)).find((doc) => doc.slug === slug);

export const getOrganizationByIdentifier = async (identifier: string) =>
  documentByIdentifierSelector(await getOrganizations())(identifier);

export type RepositoryHomeFilters = {
  inLanguage?: string;
};
export const getHomePage = async (
  filters?: RepositoryHomeFilters
): Promise<Content | undefined> =>
  getPageByIdentifier(
    homeIdentifier,
    filters?.inLanguage ? { inLanguages: [filters.inLanguage] } : undefined
  );

export const getIndexPage = async (): Promise<Content | undefined> => {
  const defaultLanguage = getDefaultLanguage();
  const languages = getLanguages();

  const inLanguage =
    defaultLanguage || (languages.length === 1 && languages[0]) || undefined;

  return getHomePage({ inLanguage });
};
