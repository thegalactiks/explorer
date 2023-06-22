import { defineConfig } from "astro/config";
import markdoc from "@astrojs/markdoc";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import rehypeExternalLinks from "rehype-external-links";
import rehypePresetMinify from "rehype-preset-minify";
import remarkToc from "remark-toc";

// https://astro.build/config
export default defineConfig({
  experimental: {
    assets: true,
  },
  integrations: [
    markdoc(),
    mdx(),
    partytown(),
    prefetch(),
    sitemap(),
    tailwind(),
  ],
  markdown: {
    remarkPlugins: [remarkToc],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: {
            type: "text",
            value: " 🔗",
          },
        },
      ],
      ...rehypePresetMinify.plugins,
    ],
  },
  site: "https://moons.dev",
});
