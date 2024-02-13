import type { Content, ContentlayerWebPageDocument } from '../../types/index';
import type { ComputeDTO } from './types';
import { computeRemainingListingPages } from './listing-pages';
import { computeDocumentsUrl } from './urls';
import { computeMissingFields } from './missing-fields';
import { addBodyRender } from './render';
import { createSameLanguagePages } from './same-language';

export type * from './types';

const hydratePagesWithRender = async (
  documents: ContentlayerWebPageDocument[]
) =>
  documents.map((d) => ({
    ...d,
    body: addBodyRender(d.body),
  }));

export const computeDocuments = async ({
  config,
  documents,
  people,
  websites,
}: ComputeDTO<ContentlayerWebPageDocument>): Promise<Content[]> =>
  Promise.resolve(documents)
    .then(hydratePagesWithRender)
    .then(createSameLanguagePages(config))
    .then(computeRemainingListingPages())
    .then(computeDocumentsUrl(websites))
    .then(computeMissingFields(config, people));
