import { getConfig } from '@galactiks/config';
import type {
  Content,
  ContentlayerDataExports,
  ContentlayerWebsite,
  ContentlayerWebPageElement,
  ContentlayerWebPageDocument,
} from '../types/index.mjs';
import { computeDocuments } from '../compute.mjs';

import type { RepositoryFilters, WebPageElementFilters } from './filters.mjs';

let _generated: ContentlayerDataExports;
let _documents: Content[];

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
  (await getGenerated()).allWebsites;

export const getWebPageElements = async (
  filters?: WebPageElementFilters
): Promise<ContentlayerWebPageElement[]> => {
  const elements = (await getGenerated()).allWebPageElements;

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
  _documents = await computeDocuments({
    config,
    websites: await getWebsites(),
    documents: new Array<ContentlayerWebPageDocument>()
      .concat(generated.allPages)
      .concat(generated.allArticles)
      .concat(generated.allPeople)
      .concat(generated.allPlaces),
    people: generated.allPeople,
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

  return filters
    ? documents.filter(
        (_d) =>
          (!Array.isArray(filters.inLanguages) ||
            filters.inLanguages.length === 0 ||
            !_d.inLanguage ||
            filters.inLanguages.indexOf(_d.inLanguage) !== -1) &&
          (!filters.type || _d.type === filters.type)
      )
    : documents;
};

export const getWebPageDocumentsByType = async (
  type: Content['type'],
  filters?: Omit<RepositoryFilters, 'type'>
) => getPages({ type, ...filters });

export const getOrganizations = async () =>
  (await getGenerated()).allOrganizations;
