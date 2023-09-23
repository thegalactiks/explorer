import { getConfig } from '@galactiks/config';

import type {
  Content,
  ContentlayerDataExports,
  ContentlayerWebPageDocument,
  ContentlayerWebPageElement,
  ContentlayerWebsite,
} from './types/index.mjs';
import { computeDocuments } from './compute.mjs';
import { homeIdentifier } from './consts.mjs';
import {
  documentByIdentifierSelector,
  documentsByLanguagesSelector,
} from './selectors.mjs';
import { createIdentifierFromString } from './utils.mjs';

let _generated: ContentlayerDataExports;
let _documents: Content[];

export type RepositoryFilters = {
  inLanguages?: string[];
};

const getGenerated = async (): Promise<ContentlayerDataExports> => {
  if (!_generated) {
    const { content } = getConfig();
    _generated = await import(content.generated);
  }

  return _generated;
};

export const getWebsites = async (): Promise<ContentlayerWebsite[]> =>
  (await getGenerated()).allWebsites;

export type WebPageElementFilters = {
  inLanguage?: string;
};
export const getWebPageElements = async (
  filters?: WebPageElementFilters
): Promise<ContentlayerWebPageElement[]> => {
  const elements = (await getGenerated()).allWebPageElements;

  return filters?.inLanguage
    ? documentsByLanguagesSelector(elements)([filters.inLanguage])
    : elements;
};
export const getWebPageElementByType = async (
  type: ContentlayerWebPageElement['elementType'],
  filters?: WebPageElementFilters
): Promise<ContentlayerWebPageElement | undefined> =>
  (await getWebPageElements(filters)).find(
    ({ elementType: _t }) => _t === type
  );
export const getSiteNavigationElement = (filters?: WebPageElementFilters) =>
  getWebPageElementByType('SiteNavigationElement', filters);

const getWebPageDocuments = async (): Promise<Content[]> => {
  if (Array.isArray(_documents)) {
    return _documents;
  }

  const config = getConfig();

  const generated = await getGenerated();
  _documents = await computeDocuments({
    config,
    websites: await getWebsites(),
    documents: new Array<ContentlayerWebPageDocument>()
      .concat(generated.allPages)
      .concat(generated.allArticles)
      .concat(generated.allPeople),
    people: generated.allPeople,
  });

  return _documents;
};

export const getPages = async (
  filters?: RepositoryFilters
): Promise<Content[]> => {
  const documents = await getWebPageDocuments();

  return filters?.inLanguages &&
    Array.isArray(filters.inLanguages) &&
    filters.inLanguages.length > 0
    ? documentsByLanguagesSelector(documents)(filters.inLanguages)
    : documents;
};
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

export const getOrganizations = async () =>
  (await getGenerated()).allOrganizations;
export const getOrganizationByIdentifier = async (identifier: string) =>
  documentByIdentifierSelector(await getOrganizations())(identifier);

export const getAllPagesExceptHome = async (
  filters?: RepositoryFilters
): Promise<Content[]> =>
  (await getPages(filters)).filter(
    ({ identifier }) => identifier !== homeIdentifier
  );

export type RepositoryHomeFilters = {
  inLanguage?: string;
};
export const getHomePage = async (
  filters?: RepositoryHomeFilters
): Promise<Content> => {
  const homepageContent = await getPageByIdentifier(
    homeIdentifier,
    filters?.inLanguage ? { inLanguages: [filters.inLanguage] } : undefined
  );
  if (!homepageContent) {
    throw new Error('no content for homepage');
  }

  return homepageContent;
};
