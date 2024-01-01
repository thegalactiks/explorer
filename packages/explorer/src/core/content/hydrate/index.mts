import type { Content, ContentlayerWebPageDocument } from '../../types/index.mjs';
import type { ComputeDTO } from './types.mjs';
import { computeRemainingListingPages } from './listing-pages.mjs';
import { computeDocumentsUrl } from './urls.mjs';
import { computeMissingFields } from './missing-fields.mjs';
import { addBodyRender } from './render.mjs';
import { createSameLanguagePages } from './same-language.mjs';

export type * from './types.mjs';

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
