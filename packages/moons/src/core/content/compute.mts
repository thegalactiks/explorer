import slugify from 'slugify'

import {
  alternatesHeaderBuilder,
  breadcrumbBuilder,
  getBasicHeaders,
  getOpenGraphObjects,
  getStructuredDataSchemas,
  getTwitterCard,
} from './metadata/index.mjs';
import {
  addBodyRender,
  emptyRender,
  type ContentlayerDocumentWithRender,
  type ContentlayerWebPageDocumentWithRender,
} from './render.mjs';
import {
  computeDocumentsUrl,
  type ContentlayerDocumentWithURL,
} from './urls.mjs';
import {
  documentByIdentifierAndLanguageSelector,
  isInLanguage,
} from './selectors.mjs';
import type {
  Content,
  ContentlayerPerson,
  ContentlayerWebPageDocument,
  ContentlayerWebsite,
  Person,
} from './types/index.mjs';

export type ComputeDTO<T> = {
  documents: T[];
  websites: ContentlayerWebsite[];
  people: ContentlayerPerson[];
};

function createPage<T>(
  identifier: string,
  document: Partial<ContentlayerWebPageDocument>
) {
  const id = slugify(identifier)

  return {
    _id: id,
    identifier: id,
    slug: id,
    description: '',
    type: 'Page',
    name: identifier,
    ...document,
    body: document.body?.raw
      ? addBodyRender(document.body)
      : {
          raw: '',
          code: '',
          render: emptyRender,
        },
  } as T;
}

const createListingPage = (
  identifier: string,
  document: Partial<ContentlayerWebPageDocument> = {}
) =>
  createPage<ContentlayerDocumentWithRender<ContentlayerWebPageDocument>>(
    identifier,
    {
      listingPage: true,
      ...document,
    }
  );

const hydratePagesWithRender = async (
  documents: ContentlayerWebPageDocument[]
) =>
  documents.map((d) => ({
    ...d,
    body: addBodyRender(d.body),
  }));

const computeRemainingListingPages = async (
  documents: ContentlayerWebPageDocumentWithRender[]
) =>
  documents.reduce(
    (
      acc,
      {
        keywords,
        dateCreated,
        datePublished,
        dateModified,
        isPartOf,
        inLanguage,
      }
    ) => {
      const templateDocument = {
        dateCreated,
        datePublished,
        dateModified,
        inLanguage,
      };

      // If parent page does not exist, create it
      if (
        isPartOf &&
        acc.some(
          (_a) => _a.identifier === isPartOf && isInLanguage(_a, inLanguage)
        ) === false
      ) {
        acc = acc.concat(createListingPage(isPartOf, templateDocument));
      }

      // Create all keywords pages not existing yet
      if (Array.isArray(keywords)) {
        if (
          acc.some(
            (_a) => _a.identifier === 'tags' && isInLanguage(_a, inLanguage)
          ) === false
        ) {
          acc = acc.concat(createListingPage('tags', templateDocument));
        }

        acc = acc.concat(
          keywords
            .filter(
              (_k) =>
                acc.some(
                  (_a) => _a.identifier === _k && isInLanguage(_a, inLanguage)
                ) === false
            )
            .map((_k) =>
              createListingPage(_k, {
                ...templateDocument,
                isPartOf: 'tags',
              })
            )
        );
      }

      return acc;
    },
    documents
  );

const computeMissingFields =
  (people: ContentlayerPerson[]) =>
  async (
    documents: Array<
      ContentlayerDocumentWithURL & ContentlayerWebPageDocumentWithRender
    >
  ): Promise<Content[]> => {
    const buildBreadcrumb = breadcrumbBuilder(documents);
    const buildAlternates = alternatesHeaderBuilder(documents);
    const selectPersonByIdentifierAndLanguage =
      documentByIdentifierAndLanguageSelector(people);

    const getAuthor = (
      identifier?: string,
      inLanguage?: string
    ): Person | undefined => {
      let author;
      if (identifier) {
        author = selectPersonByIdentifierAndLanguage(identifier, inLanguage);
      } else if (people.length === 1) {
        author = people[0];
      }

      return (
        author && {
          identifier: author.identifier,
          name: author.name,
          description: author.description,
          url: author.url,
        }
      );
    };

    return documents.map((document) => {
      const dateCreated = new Date(document.dateCreated);
      const contentWithoutHeaders: Omit<Content, 'headers'> = {
        ...document,
        author: getAuthor(document.author, document.inLanguage),
        breadcrumb: buildBreadcrumb(document),
        dateCreated,
        dateModified: document.dateModified
          ? new Date(document.dateModified)
          : dateCreated,
        datePublished: document.datePublished
          ? new Date(document.datePublished)
          : dateCreated,
      };

      return {
        ...contentWithoutHeaders,
        headers: {
          ...getBasicHeaders(contentWithoutHeaders),
          alternates: buildAlternates(contentWithoutHeaders),
          structuredDataSchemas: getStructuredDataSchemas(
            contentWithoutHeaders
          ),
          openGraph: getOpenGraphObjects(contentWithoutHeaders),
          twitterCard: getTwitterCard(contentWithoutHeaders),
        },
      };
    });
  };

export const computeDocuments = async ({
  documents,
  people,
  websites,
}: ComputeDTO<ContentlayerWebPageDocument>): Promise<Content[]> =>
  Promise.resolve(documents)
    .then(hydratePagesWithRender)
    .then(computeRemainingListingPages)
    .then(computeDocumentsUrl(websites))
    .then(computeMissingFields(people));
