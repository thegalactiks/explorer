import type { APIContext } from "astro";
import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function get(context: APIContext) {
  return rss({
    title: "Moons",
    description: "A new moon",
    site: context.site?.toString() || "Moons",
    items: await pagesGlobToRssItems(import.meta.glob("./*.{md,mdx}")),
  });
}
