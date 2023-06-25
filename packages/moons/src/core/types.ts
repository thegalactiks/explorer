import type { CollectionEntry, Render } from "astro:content";
import type { ArticleFrontmatter, PageFrontmatter } from "../assets/content/_schemas";
type ContentConfig = typeof import("../assets/content/config");

type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;

declare module 'astro:content' {
  interface Render {
    '.generated': Promise<{
      Content(props: Record<string, any>): string;
      headings: string[];
    }>;
  }
}

export type GeneratedPageEntry = {
  id: string;
  slug: string;
  path: string;
  body: string;
  data: import('astro/zod').infer<
    ReturnTypeOrOriginal<Required<ContentConfig['collections']['page']>['schema']>
  >
};

export type ContentEntry = CollectionEntry<'article'> | CollectionEntry<'page'> | GeneratedPageEntry;

export type ContentFrontmatter = ArticleFrontmatter | PageFrontmatter;
export type HydratedContentFrontmatter = ContentFrontmatter & Required<Pick<ContentFrontmatter, "url">>
export type HydratedContent = ContentEntry & {
  path: string;
  data: HydratedContentFrontmatter
};
