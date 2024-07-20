import { getConfig } from '@galactiks/config';
import type {
  Content,
  ContentlayerDataExports,
  ContentlayerWebsite,
  ContentlayerWebPageElement,
  ContentlayerWebPageDocument,
  ContentlayerOrganization,
} from '../../types/index.js';

import { computeDocuments } from '../hydrate/hydrate.js';
import { availableFilters, type RepositoryFilters, type WebPageElementFilters } from './filters.js';

export type Pagination = {
  page: number;
};

export type WebPageElementsResult<T> = {
  elements: T[];
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
  },
};
export type ContentResult = WebPageElementsResult<Content>;

let _generated: ContentlayerDataExports;
let _documents: Content[];

const dateNow = new Date();

const documentsByLanguagesSelector =
  <T extends Pick<ContentlayerWebPageDocument, 'inLanguage'>>(documents: T[]) =>
    (inLanguages: string[]) =>
      documents.filter(
        (_d) => !_d.inLanguage || inLanguages.indexOf(_d.inLanguage) !== -1
      );

const getGenerated = async (): Promise<ContentlayerDataExports> => {
  if (!_generated) {
    const { content } = getConfig();
    _generated = await import(content.generated);
  }

  return _generated;
};

export const getWebsites = async (): Promise<ContentlayerWebsite[]> =>
  (await getGenerated()).allWebsites || [];

export const getWebPageElements = async (
  filters?: WebPageElementFilters,
  pagination?: Pagination,
): Promise<WebPageElementsResult<ContentlayerWebPageElement>> => {
  let elements = (await getGenerated()).allWebPageElements || [];
  if (filters?.inLanguage) {
    elements = documentsByLanguagesSelector(elements)([filters.inLanguage]);
  }
  if (filters?.type) {
    elements = elements.filter(({ elementType }) => elementType === filters.type);
  }

  let resultPagination = undefined;
  if (pagination) {
    const { pagination: {
      pageSize = 10,
    } } = getConfig();
    const page = pagination?.page || 1;
    const total = elements.length;
    resultPagination = {
      page,
      pageSize,
      total,
    };

    const start = (page - 1) * pageSize;
    elements = elements.slice(start, start + pageSize);
  }

  return {
    elements,
    pagination: resultPagination,
  };
};

const getWebPageDocuments = async (): Promise<Content[]> => {
  if (Array.isArray(_documents)) {
    return _documents;
  }

  const config = getConfig();

  const generated = await getGenerated();
  const publishedDocuments = new Array<ContentlayerWebPageDocument>()
    .concat(generated.allArticles || [])
    .concat(generated.allOrganizations || [])
    .concat(generated.allPages || [])
    .concat(generated.allPeople || [])
    .concat(generated.allPlaces || [])
    .concat(generated.allProducts || [])
    .filter(
      (_d) =>
        !('datePublished' in _d) ||
        (_d.datePublished && new Date(_d.datePublished) <= dateNow)
    )
    .sort((a, b) =>
      'datePublished' in b &&
        b.datePublished &&
        'datePublished' in a &&
        a.datePublished
        ? new Date(b.datePublished).getTime() -
        new Date(a.datePublished).getTime()
        : 0
    );
  _documents = await computeDocuments({
    config,
    websites: await getWebsites(),
    documents: publishedDocuments,
    people: generated.allPeople || [],
  });

  return _documents;
};

export const getWebPageElementByType = async (
  type: ContentlayerWebPageElement['elementType'],
  filters?: WebPageElementFilters,
  pagination?: Pagination,
) =>
  getWebPageElements({ ...filters, type }, pagination);
export const getSiteNavigationElement = (
  filters?: WebPageElementFilters,
  pagination?: Pagination,
) =>
  getWebPageElementByType('SiteNavigationElement', filters, pagination);
export const getWebPageHeader = (
  filters?: WebPageElementFilters,
  pagination?: Pagination,
) =>
  getWebPageElementByType('WPHeader', filters, pagination);
export const getWebPageFooter = (
  filters?: WebPageElementFilters,
  pagination?: Pagination,
) =>
  getWebPageElementByType('WPFooter', filters, pagination);

export const getPages = async (
  filters?: RepositoryFilters,
  pagination?: Pagination,
): Promise<ContentResult> => {
  const documents = await getWebPageDocuments();

  let inLanguages = Array.isArray(filters?.inLanguages)
    ? filters.inLanguages
    : [];
  if (typeof filters?.inLanguage === 'string') {
    inLanguages = inLanguages.concat(filters.inLanguage);
  }

  let elements = documents;
  if (inLanguages.length > 0) {
    elements = documentsByLanguagesSelector(documents)(inLanguages);
  }

  const availableFiltersArgs = typeof filters === 'object' && filters !== null
    ? availableFilters.filter((key) => key in filters)
    : [];
  if (availableFiltersArgs.length > 0) {
    elements = documents.filter(_d => availableFiltersArgs.every(key => _d[key] === filters[key]));
  }

  let resultPagination = undefined;
  if (pagination) {
    const { pagination: {
      pageSize = 10,
    } } = getConfig();
    const page = pagination?.page || 1;
    const total = elements.length;
    resultPagination = {
      page,
      pageSize,
      total,
    };

    const start = (page - 1) * pageSize;
    elements = elements.slice(start, start + pageSize);
  }

  return {
    elements,
    pagination: resultPagination,
  };
};

export const getWebPageDocumentsByType = async (
  type: Content['type'],
  filters?: Omit<RepositoryFilters, 'type'>
) => getPages({ type, ...filters });

export const getOrganizations = async (): Promise<ContentlayerOrganization[]> =>
  (await getGenerated()).allOrganizations || [];
