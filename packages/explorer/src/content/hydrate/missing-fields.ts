import type { GalactiksConfig } from '@galactiks/config';
import type {
  Content,
  ContentlayerPerson,
  ContentlayerDocumentWithURL,
  ContentlayerWebPageDocumentWithRender,
  Person,
} from '../../types/index.js';

import { documentByTypeAndIdentifierAndLanguageSelector } from '../selectors.js';
import { alternatesHeaderBuilder } from '../metadata/alternates.js';
import { breadcrumbBuilder } from '../metadata/breadcrumb.js';
import { getBasicHeaders } from '../metadata/headers.js';
import { getTwitterCard } from '../metadata/twitter.js';
import { getOpenGraphObjects } from '../metadata/ogp/og.js';
import { getFacebookObjects } from '../metadata/facebook.js';
import { getStructuredDataSchemas } from '../metadata/schemas/structured-data.js';

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
      const dateCreated =
        'dateCreated' in document && document.dateCreated
          ? new Date(document.dateCreated)
          : new Date();
      const contentWithoutHeaders: Omit<Content, 'headers'> = {
        ...document,
        author:
          'author' in document
            ? getAuthor(document.author, document.inLanguage)
            : undefined,
        breadcrumb: buildBreadcrumb(document),
        dateCreated,
        dateModified:
          'dateModified' in document && document.dateModified
            ? new Date(document.dateModified)
            : dateCreated,
        datePublished:
          'datePublished' in document && document.datePublished
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
          facebook: getFacebookObjects(),
          twitterCard: getTwitterCard(contentWithoutHeaders),
        },
      };
    });
  };
