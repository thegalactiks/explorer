import type { GalactiksConfig } from '@galactiks/config';
import type { Id } from '@galactiks/contentlayer';

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
  documentByIdentifierSelector,
  documentByTypeAndIdentifierAndLanguageSelector,
  isInLanguage,
} from './selectors.mjs';
import type {
  Content,
  ContentlayerPerson,
  ContentlayerWebPageDocument,
  ContentlayerWebsite,
  Person,
} from './types/index.mjs';
import { createIdentifierFromString } from './utils.mjs';

export type ComputeDTO<T> = {
  config: GalactiksConfig;
  documents: T[];
  websites: ContentlayerWebsite[];
  people: ContentlayerPerson[];
};

function createPage<T>(
  identifier: string,
  document: Partial<ContentlayerWebPageDocument>
) {
  const id = createIdentifierFromString(identifier);

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
) => {
  const getDocumentByIdentifier = documentByIdentifierSelector(documents);

  return documents.reduce((acc, _d) => {
    const templateDocument: Partial<ContentlayerWebPageDocument> = {
      dateCreated: _d.dateCreated,
      datePublished: _d.datePublished,
      dateModified: _d.dateModified,
      inLanguage: _d.inLanguage,
    };

    // If parent page does not exist, create it
    if (
      _d.isPartOf &&
      acc.some(
        (_a) => _a.identifier === _d.isPartOf && isInLanguage(_a, _d.inLanguage)
      ) === false
    ) {
      let translationOfWork: Id | undefined = undefined;
      if (_d.translationOfWork && _d.translationOfWork['@id']) {
        const translationOfWorkDocument = getDocumentByIdentifier(_d.translationOfWork['@id']);
        console.log(_d.translationOfWork, translationOfWorkDocument)

        if (translationOfWorkDocument?.isPartOf) {
          translationOfWork = {
            "type": "Id",
            "@id": translationOfWorkDocument.isPartOf,
          };
        }
      }

      acc = acc.concat(createListingPage(_d.isPartOf, {
        ...templateDocument,
        translationOfWork,
      }));
    }

    // Create all keywords pages not existing yet
    if (Array.isArray(_d.keywords)) {
      acc = acc.concat(
        _d.keywords
          .filter(
            (_k) =>
              _k &&
              acc.some(
                (_a) => _a.identifier === _k && isInLanguage(_a, _d.inLanguage)
              ) === false
          )
          .map((_k) =>
            createListingPage(_k, {
              ...templateDocument,
              type: 'Tag',
            })
          )
      );
    }

    return acc;
  }, documents);
}

const computeMissingFields =
  (_: GalactiksConfig, people: ContentlayerPerson[]) =>
    async (
      documents: Array<
        ContentlayerDocumentWithURL & ContentlayerWebPageDocumentWithRender
      >
    ): Promise<Content[]> => {
      const buildBreadcrumb = breadcrumbBuilder(documents);
      const buildAlternates = alternatesHeaderBuilder(documents);
      const selectPersonByIdentifierAndLanguage =
        documentByTypeAndIdentifierAndLanguageSelector('Person', documents);

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
            image: author.image,
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
  config,
  documents,
  people,
  websites,
}: ComputeDTO<ContentlayerWebPageDocument>): Promise<Content[]> =>
  Promise.resolve(documents)
    .then(hydratePagesWithRender)
    .then(computeRemainingListingPages)
    .then(computeDocumentsUrl(websites))
    .then(computeMissingFields(config, people));
