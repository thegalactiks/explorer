import rss, { pagesGlobToRssItems } from '@astrojs/rss';

async function get(context) {
  return rss({
    title: "Moons",
    description: "A new moon",
    site: context.site?.toString() || "Moons",
    items: await pagesGlobToRssItems(/* #__PURE__ */ Object.assign({}))
  });
}

export { get };
