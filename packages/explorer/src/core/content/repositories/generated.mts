import { getConfig } from '@galactiks/config';
import type {
  Content,
  ContentlayerDataExports,
  ContentlayerWebsite,
  ContentlayerWebPageElement,
  ContentlayerWebPageDocument,
  ContentlayerOrganization,
} from '../types/index.mjs';
import { computeDocuments } from '../compute.mjs';

import type { RepositoryFilters, WebPageElementFilters } from './filters.mjs';

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
  filters?: WebPageElementFilters
): Promise<ContentlayerWebPageElement[]> => {
  const elements = (await getGenerated()).allWebPageElements || [];

  return filters?.inLanguage
    ? documentsByLanguagesSelector(elements)([filters.inLanguage])
    : elements;
};

const getWebPageDocuments = async (): Promise<Content[]> => {
  if (Array.isArray(_documents)) {
    return _documents;
  }

  const config = getConfig();

  const generated = await getGenerated();
  const publishedDocuments = new Array<ContentlayerWebPageDocument>()
    .concat(generated.allPages || [])
    .concat(generated.allArticles || [])
    .concat(generated.allPeople || [])
    .concat(generated.allPlaces || [])
    .filter((_d) => !_d.datePublished || new Date(_d.datePublished) <= dateNow);
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
  filters?: WebPageElementFilters
): Promise<ContentlayerWebPageElement | undefined> =>
  (await getWebPageElements(filters)).find(
    ({ elementType: _t }) => _t === type
  );
export const getSiteNavigationElement = (filters?: WebPageElementFilters) =>
  getWebPageElementByType('SiteNavigationElement', filters);

export const getPages = async (
  filters?: RepositoryFilters
): Promise<Content[]> => {
  const documents = await getWebPageDocuments();
  if (!filters) {
    return documents;
  }

  let inLanguages = Array.isArray(filters.inLanguages)
    ? filters.inLanguages
    : [];
  if (typeof filters.inLanguage === 'string') {
    inLanguages = inLanguages.concat(filters.inLanguage);
  }

  return documents.filter(
    (_d) =>
      (inLanguages.length === 0 ||
        !_d.inLanguage ||
        inLanguages.indexOf(_d.inLanguage) !== -1) &&
      (!filters.type || _d.type === filters.type)
  );
};

export const getWebPageDocumentsByType = async (
  type: Content['type'],
  filters?: Omit<RepositoryFilters, 'type'>
) => getPages({ type, ...filters });

export const getOrganizations = async (): Promise<ContentlayerOrganization[]> =>
  (await getGenerated()).allOrganizations || [];
