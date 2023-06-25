/* empty css                         */import { c as createAstro, a as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead } from '../astro.ec0efa6a.mjs';
import { $ as $$PageLayout } from './404.astro.1394a08e.mjs';
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

const $$Astro = createAstro("https://www.emmanuelgautier.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "frontmatter": { name: "New moon" } }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead($$result2)}<main></main>
` })}`;
}, "/var/data/workspace/withmoons/moons/examples/themes/basic/src/pages/index.astro");

const $$file = "/var/data/workspace/withmoons/moons/examples/themes/basic/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
