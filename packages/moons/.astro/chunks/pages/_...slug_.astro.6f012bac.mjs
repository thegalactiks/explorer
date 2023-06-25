/* empty css                         */import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, e as addAttribute, f as renderSlot, g as renderComponent, F as Fragment } from '../astro.ec0efa6a.mjs';
import { g as getContentPages, $ as $$PageLayout, a as $$Container } from './404.astro.1394a08e.mjs';
import 'fs';
import 'node:fs/promises';
import 'node:url';
import 'node:fs';
import 'node:path';
import 'slash';
import 'path';
import 'node:worker_threads';
import 'os';
import 'url';
import 'module';
import 'worker_threads';

const $$Astro$1 = createAstro("https://www.emmanuelgautier.com");
const $$Article = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Article;
  const { class: className } = Astro2.props;
  return renderTemplate`${maybeRenderHead($$result)}<article id="article"${addAttribute(["prose prose-lg", className], "class:list")}>
  ${renderSlot($$result, $$slots["default"])}
</article>`;
}, "/var/data/workspace/withmoons/moons/examples/themes/basic/src/components/Article.astro");

const $$Astro = createAstro("https://www.emmanuelgautier.com");
async function getStaticPaths() {
  return (await getContentPages()).map((entry) => ({
    params: { slug: entry.data.identifier },
    props: { entry }
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { entry } = Astro2.props;
  const { Content } = typeof entry.render === "function" ? await entry.render() : { Content: null };
  const Layout = entry.data.layout ? (await import(entry.data.layout)).default : $$PageLayout;
  return renderTemplate`${renderComponent($$result, "Layout", Layout, { "frontmatter": entry }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead($$result2)}<main>
    ${renderComponent($$result2, "Container", $$Container, {}, { "default": ($$result3) => renderTemplate`
      <div class="mx-auto max-w-3xl mt-14">
        <h1 class="text-4xl lg:text-5xl font-bold lg:tracking-tight mt-1 lg:leading-tight">
          ${entry.data.name}
        </h1>
        <div class="flex gap-2 mt-3 items-center flex-wrap md:flex-nowrap">
          ${entry.data.author && renderTemplate`${renderComponent($$result3, "Fragment", Fragment, {}, { "default": ($$result4) => renderTemplate`
                <span class="text-gray-400">${entry.data.author}</span>
                <span class="text-gray-400">•</span>
              ` })}`}
          ${entry.data.datePublished && renderTemplate`<time class="text-gray-400"${addAttribute(entry.data.datePublished.toISOString(), "datetime")}>
                ${entry.data.datePublished.toDateString()}
              </time>`}
          <span class="text-gray-400 hidden md:block">•</span>
          ${Array.isArray(entry.data.tags) && renderTemplate`<div class="w-full md:w-auto flex flex-wrap gap-3">
                ${entry.data.tags.map((tag) => renderTemplate`<span class="text-sm text-gray-500">#${tag}</span>`)}
              </div>`}
        </div>
      </div>

      ${renderComponent($$result3, "Article", $$Article, { "class": "mx-auto mt-6 max-w-3xl" }, { "default": ($$result4) => renderTemplate`${Content && renderTemplate`${renderComponent($$result4, "Content", Content, {})}`}` })}
    ` })}
  </main>
` })}`;
}, "/var/data/workspace/withmoons/moons/examples/themes/basic/src/pages/[...slug].astro");

const $$file = "/var/data/workspace/withmoons/moons/examples/themes/basic/src/pages/[...slug].astro";
const $$url = "/[...slug]";

export { $$ as default, $$file as file, getStaticPaths, $$url as url };
