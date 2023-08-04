import type { Content } from './types'
import { getHeadersFromEntry, getOpenGraphFromEntry } from './metadata'
import { getPathFromEntry, getUrlFromEntry } from './urls'
import { getAllDocuments, getDocumentByIdentifier, getDocumentWithoutPartOf, getDocumentsPartOf } from './repository'

const computeFields = async (entry: Content): Promise<Content> => {
  const path = await getPathFromEntry(entry);
  const contentWithoutHeaders: Omit<Content, 'headers'> = {
    ...entry,
    slug: path,
    url: getUrlFromEntry(entry),
    dateCreated: new Date(entry.dateCreated),
    dateModified: new Date(entry.dateModified || entry.dateCreated),
    datePublished: entry.datePublished ? new Date(entry.datePublished) : undefined,
  }

  return {
    ...contentWithoutHeaders,
    headers: {
      ...getHeadersFromEntry(contentWithoutHeaders),
      openGraph: getOpenGraphFromEntry(contentWithoutHeaders),
    },
  }
}

const computePagesFields = (entries: Content[]) => Promise.all(entries.map(entry => computeFields(entry)))

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
//         body: '',
//         data: {
//           url: '',
//           name: path,
//           description: path,
//           identifier: path,
//           dateCreated,
//           inLanguage,
//         }
//       }))
//   );

export const getPages = async (): Promise<Content[]> => computePagesFields(await getAllDocuments())
export const getRootPages = async (): Promise<Content[]> => computePagesFields(await getDocumentWithoutPartOf())
export const getPagesPartOf = async (slug: string): Promise<Content[]> => computePagesFields(await getDocumentsPartOf(slug))
export const getHomePage = async (): Promise<Content> => {
  const homepageContent = await getDocumentByIdentifier('index')
  if (!homepageContent) {
    throw new Error('no content for homepage')
  }

  return computeFields(homepageContent)
}
