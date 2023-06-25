import { getCollection, getEntryBySlug } from "astro:content";
// import { default as cytoscape, type Core as Cytoscape } from "cytoscape";
import { join } from "path";
import type { ContentEntry, GeneratedPageEntry, HydratedContent, HydratedContentFrontmatter } from "./types";

// const _buildStructureTreeFromEntries = (entries: ContentEntry[]): Cytoscape => {
//   const cy = cytoscape({
//     elements: entries.map(entry => ({
//       data: {
//         id: entry.slug,
//         parent: entry.data.isPartOf,
//       }
//     }))
//   })

//   return cy;
// }

const _getPathFromEntry = (entry: ContentEntry): string => entry.data.identifier || entry.slug;

const _buildEntryUrl = async (entry: ContentEntry): Promise<string> => {
  if (entry.data.url) {
    return entry.data.url;
  }

  // TODO: Use Web Manifest URL
  // new URL(slug, base).toString()
  return _buildEntryPath(entry);
}

const _buildEntryPath = async (entry: ContentEntry): Promise<string> => {
  // TODO: take language into account
  // if (entry.data.inLanguage) {
  // }

  const path = _getPathFromEntry(entry);
  if (!entry.data.isPartOf) {
    return path;
  }

  const parent = await getContentPageBySlug(entry.data.isPartOf)
  const base = parent ? (await _buildEntryPath(parent)) : `${entry.data.isPartOf}/`;
  return join(base, path);
}

const _hydrateEntry = async (entry: ContentEntry): Promise<HydratedContent> => {
  const data: HydratedContentFrontmatter = {
    ...entry.data,
    url: (await _buildEntryUrl(entry)),
    identifier: entry.data.identifier || entry.slug,
    datePublished: entry.data.datePublished || entry.data.dateCreated,
    dateModified: entry.data.dateModified || entry.data.dateCreated,
  };

  const path = await _buildEntryPath(entry);
  return {
    ...entry,
    path,
    slug: `/${path}`,
    data
  };
};

const _hydrateEntries = async (entries: ContentEntry[]): Promise<HydratedContent[]> => Promise.all(
  entries.map(_hydrateEntry)
)

const getEntryWithoutParent = async (): Promise<HydratedContent[]> => {
  const entries = await getContentEntries();
  return entries.filter(entry => !entry.data.isPartOf);
}

const getContentEntriesPartOf = async (slug: string): Promise<HydratedContent[]> => {
  const entries = await getContentEntries();
  return entries.filter(entry => entry.data.isPartOf === slug);
}

const getContentEntries = async (): Promise<HydratedContent[]> => {
  const [articleEntries, pageEntries] = await Promise.all([
    getCollection('article'),
    getCollection('page'),
  ]);

  const contentEntries = await _hydrateEntries(new Array<ContentEntry>().concat(articleEntries, pageEntries));

  return contentEntries
    .reduce<HydratedContent[]>((acc, entry) => {
      const path = entry.data.isPartOf;
      if (!path || acc.findIndex(_entry => _entry.path === path) !== -1) {
        return acc;
      }

      const generatedEntry: HydratedContent = {
        id: path,
        slug: `/${path}`,
        path,
        body: '',
        data: {
          layout: '../layouts/ListPageLayout.astro',
          url: '',
          name: path,
          description: path,
          identifier: path,
          dateCreated: entry.data.dateCreated,
          // inLanguage: entry.data.inLanguage,
        }
      };

      return acc.concat(generatedEntry);
    }, contentEntries);
}

export const getContentPages = async () => await getContentEntries();
export const getRootPages = async () => await getEntryWithoutParent();
export const getContentPagesPartOf = async (slug: string) => await getContentEntriesPartOf(slug);

export const getContentPageBySlug = async (slug: string): Promise<ContentEntry | undefined> => {
  const [articleEntry, pageEntry] = await Promise.all([
    getEntryBySlug("article", slug),
    getEntryBySlug("page", slug),
  ]);

  return pageEntry || articleEntry;
};
