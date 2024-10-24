import { getDefaultLanguage, getLanguages } from '@galactiks/config';
import type { Content } from '../../types/index.js';

import { homeIdentifier } from '../consts.js';
import { documentByIdentifierSelector } from '../selectors.js';
import { createIdentifierFromString } from '../utils.js';

import type { RepositoryFilters } from './filters.js';
import { type ContentResult, getOrganizations, getPages, type Pagination } from './generated.js';

export * from './generated.js';

export const getRootPages = async (
  filters?: RepositoryFilters
): Promise<ContentResult> =>
  getPages({ ...filters, isPartOf: undefined });

export const getPagesPartOf = async (
  slug: string,
  filters?: RepositoryFilters,
  pagination?: Pagination,
): Promise<ContentResult> =>
  getPages({ ...filters, isPartOf: slug }, pagination);

export const getPagesPartOfRecursively = async (
  slug: string,
  filters?: RepositoryFilters,
  pagination?: Pagination,
): Promise<ContentResult> => {
  const pagesResult = await getPagesPartOf(slug, filters);
  if (pagesResult.pagination?.total === 0) {
    return pagesResult;
  }

  return Promise.all(
    pages.map((page) => getPagesPartOfRecursively(page.identifier, filters))
  ).then((items) => items.reduce((acc, item) => acc.concat(item), pages));
};

export const getSamePartOfPages = async (
  content: Content,
  filters?: RepositoryFilters,
  pagination?: Pagination,
): Promise<ContentResult> => {
  if (!content.isPartOf) {
    return [];
  }

  const relatedPages = await getPagesPartOf(content.isPartOf, {
    inLanguage: content.inLanguage,
    type: content.type,
    ...filters,
  });
  return relatedPages.filter((doc) => doc.identifier !== content.identifier);
};

export const getRelatedPages = async (
  content: Content,
  exclude: Content[] = [],
  filters?: RepositoryFilters,
  pagination?: Pagination,
): Promise<ContentResult> => {
  if (!content.keywords) {
    return [];
  }

  const pages = await getPages({
    inLanguage: content.inLanguage,
    type: content.type,
    ...filters,
  });
  const excludeIdentifiers = exclude.map((doc) => doc.identifier);
  return pages
    .filter(
      (doc) =>
        doc.identifier !== content.identifier &&
        !excludeIdentifiers.includes(doc.identifier)
    )
    .map((doc) => {
      const commonKeywords = Array.isArray(doc.keywords)
        ? doc.keywords.filter((keyword) => content.keywords?.includes(keyword))
          .length
        : 0;

      return { doc, commonKeywords };
    })
    .filter(({ commonKeywords }) => commonKeywords > 0)
    .sort((a, b) => a.commonKeywords - b.commonKeywords)
    .map(({ doc }) => doc);
};

export const getPagesWithKeywordIdentifier = async (
  keywordIdentifier: string,
  filters?: RepositoryFilters,
  pagination?: Pagination,
): Promise<ContentResult> =>
  (await getPages(filters)).filter((doc) =>
    doc.keywords?.some(
      (keyword) => createIdentifierFromString(keyword) === keywordIdentifier
    )
  );

export const getPageByIdentifier = async (
  identifier: string,
  filters?: RepositoryFilters,
) => documentByIdentifierSelector(await getPages(filters))(identifier);

export const getPageByURL = async (url: string) =>
  (await getPages()).find((page) => page.url === url);

export const getTagPageByKeyword = async (
  keyword: string,
  filters?: RepositoryFilters,
  pagination?: Pagination,
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

type ContentWithIsPartOf = Content & Required<Pick<Content, 'isPartOf'>>;

export const getSerieWorks = async (content: ContentWithIsPartOf) => {
  const serieWorksResult = await getPagesPartOf(content.isPartOf, {
    type: content.type,
    inLanguage: content.inLanguage,
  })

  return serieWorksResult.elements
    .filter((w) => 'position' in w && typeof w.position === 'number')
    .sort((a, b) => (a.position as number) - (b.position as number)) as Array<
      Content & Required<Pick<Content, 'position'>>
    >;
}

export const getPreviousWorkSeries = async (
  content: Content
): Promise<Content | undefined> => {
  if (!(content.isPartOf && typeof content.position === 'number')) {
    return undefined;
  }

  const serieWorks = await getSerieWorks(content as ContentWithIsPartOf);
  let previousWork = undefined;
  for (const work of serieWorks) {
    if (work.position === content.position) {
      return previousWork;
    }

    previousWork = work;
  }

  return previousWork;
};

export const getNextWorkSeries = async (
  content: Content
): Promise<Content | undefined> => {
  if (!(content.isPartOf && typeof content.position === 'number')) {
    return undefined;
  }

  const serieWorks = await getSerieWorks(content as ContentWithIsPartOf);
  for (const work of serieWorks) {
    if (work.position > content.position) {
      return work;
    }
  }
};
