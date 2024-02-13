import type { Content, ContentlayerWebPageDocument } from '../../types/index.js';
import type { ComputeDTO } from './types.js';
import { computeRemainingListingPages } from './listing-pages.js';
import { computeDocumentsUrl } from './urls.js';
import { computeMissingFields } from './missing-fields.js';
import { addBodyRender } from './render.js';
import { createSameLanguagePages } from './same-language.js';

export type * from './types.js';

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
