import { getCollection } from 'astro:content';

import { getHeadersFromEntry, getOpenGraphFromEntry } from '../metadata';
import type { CollectionName, ContentEntry, HydratedContent } from '../types';
import { getPathFromEntry, getUrlFromEntry } from './urls';

const _hydrateEntry = async (collection: CollectionName, entry: ContentEntry): Promise<HydratedContent> => {
  const path = await getPathFromEntry(entry);
  const hydratedContent: Omit<HydratedContent, 'metadata'> = {
    ...entry,
    collection,
    slug: path,
    path,
    data: {
      ...entry.data,
      url: getUrlFromEntry({ ...entry, path }),
      dateModified: entry.data.dateModified || entry.data.dateCreated,
    }
  };

  return {
    ...hydratedContent,
    metadata: {
      headers: getHeadersFromEntry(hydratedContent),
      openGraph: getOpenGraphFromEntry(hydratedContent),
    },
  }
};

const _hydraEntries = (collection: CollectionName, entries: ContentEntry[]) => Promise.all(entries.map(entry => _hydrateEntry(collection, entry)))

const getEntryWithoutParent = async (): Promise<HydratedContent[]> => {
  const entries = await getContentEntries();
  return entries.filter(entry => !entry.data.isPartOf);
}

const getContentEntriesPartOf = async (slug: string): Promise<HydratedContent[]> => {
  const entries = await getContentEntries();
  return entries.filter(entry => entry.data.isPartOf === slug);
}

const getContentEntriesByCollection = async (collection: CollectionName): Promise<HydratedContent[]> => _hydraEntries(collection, await getCollection(collection));

const getContentEntries = async (): Promise<HydratedContent[]> => {
  const [articleEntries, pageEntries] = await Promise.all([
    getContentEntriesByCollection('articles'),
    getContentEntriesByCollection('pages'),
  ]);

  return articleEntries.concat(pageEntries);
}

// const getListingEntriesFromContentEntries = async (contentEntries: HydratedContent[]): Promise<HydratedContent[]> =>
//   Promise.all(
//     contentEntries
//       .filter(entry => entry.data.isPartOf && contentEntries.findIndex(_entry => _entry.path === entry.data.isPartOf) !== -1)
//       .reduce<Array<Pick<HydratedContent, 'path'> & Pick<HydratedContent['data'], 'dateCreated' | 'inLanguage'>>>((acc, { data: { dateCreated, inLanguage, isPartOf } }) => {
//         const index = acc.findIndex(_entry => _entry.path === isPartOf);
//         if (index === -1) {
//           return acc.concat({ dateCreated, path: isPartOf as string, inLanguage });
//         }

//         if (index !== -1) {
//           acc[index] = {
//             ...acc[index],
//             dateCreated,
//           }
//         }

//         return acc;
//       }, [])
//       .map(({ dateCreated, inLanguage, path }) => _hydrateEntry('pages', {
//         id: path,
//         slug: path,
//         path,
//         body: '',
//         data: {
//           layout: '@layouts/PageLayout.astro',
//           url: '',
//           name: path,
//           description: path,
//           identifier: path,
//           dateCreated,
//           inLanguage,
//         }
//       }))
//   );

export const getPages = () => getContentEntries();
export const getRootPages = () => getEntryWithoutParent();
export const getPagesPartOf = (slug: string) => getContentEntriesPartOf(slug);
