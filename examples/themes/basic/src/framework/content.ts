import { CollectionEntry, getEntryBySlug } from "astro:content";
import { getCollection } from "astro:content";
import type { ArticleFrontmatter, PageFrontmatter } from "../../../../site/content/_schemas";

export type ContentFrontmatter = ArticleFrontmatter | PageFrontmatter;
export type HydratedContentFrontmatter = ContentFrontmatter & Required<Pick<ContentFrontmatter, "url">>
export type HydratedContent = ContentEntry & {
  data: HydratedContentFrontmatter
};
export type ContentEntry = CollectionEntry<"article"> | CollectionEntry<"page">;

const _buildEntryUrl = async (entry: ContentEntry): Promise<string> => {
  if (entry.data.url) {
    return entry.data.url;
  }

  const slug = entry.data.identifier || entry.slug;
  let url = slug;
  if (entry.data.isPartOf) {
    const parent = await getContentPageBySlug(entry.data.isPartOf)

    const baseUrl = parent ? (await _buildEntryUrl(parent)) : `/${entry.data.isPartOf}/`;
    url = `${baseUrl}/${slug}`
  }

  return url;
}

const _hydrateEntry = async (entry: ContentEntry): Promise<HydratedContent> => {
  const data = {
    ...entry.data,
    url: (await _buildEntryUrl(entry)),
    identifier: entry.data.identifier || entry.slug,
  };

  return {
    ...entry,
    data
  };
};

export const getContentPages = async (): Promise<HydratedContent[]> => {
  const [articleEntries, pageEntries] = await Promise.all([
    getCollection("article"),
    getCollection("page"),
  ]);

  const hydratedContentEntries = await Promise.all(
    new Array()
      .concat(articleEntries, pageEntries)
      .map(_hydrateEntry)
  );

  // const nonCreatedListingPages = hydratedContentEntries.filter(entry => entry.data.isPartOf && !getContentPageBySlug(entry.data.isPartOf));
  // const automaticallyGeneratedPages = nonCreatedListingPages.map(entry => {});

    return hydratedContentEntries;
};

export const getContentPageBySlug = async (slug: string): Promise<ContentEntry | undefined> => {
  const [articleEntry, pageEntry] = await Promise.all([
    getEntryBySlug("article", slug),
    getEntryBySlug("page", slug),
  ]);

  return pageEntry || articleEntry;
};

// export const getPathFromEntry = async (entry: ContentEntry) => {
//   const pathArray = [];
//   if (entry.data.inLanguage) {
//     pathArray.push(entry.data.inLanguage)
//   }

// }
