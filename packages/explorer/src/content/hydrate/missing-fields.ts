import type { GalactiksConfig } from '@galactiks/config';
import type {
  Content,
  ContentlayerPerson,
  ContentlayerDocumentWithURL,
  ContentlayerWebPageDocumentWithRender,
  Person,
} from '../../types';
import { documentByTypeAndIdentifierAndLanguageSelector } from '../selectors';
import {
  alternatesHeaderBuilder,
  breadcrumbBuilder,
  getBasicHeaders,
  getOpenGraphObjects,
  getStructuredDataSchemas,
  getTwitterCard,
} from '../metadata';

export const computeMissingFields =
  (_: GalactiksConfig, people: ContentlayerPerson[]) =>
  async (
    documents: Array<
      ContentlayerDocumentWithURL & ContentlayerWebPageDocumentWithRender
    >
  ) => {
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
