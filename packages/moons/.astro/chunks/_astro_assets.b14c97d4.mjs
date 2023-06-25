import { c as createAstro, a as createComponent, A as AstroError, j as AstroErrorData, r as renderTemplate, m as maybeRenderHead, e as addAttribute, k as spreadAttributes, l as getImage$1 } from './astro.ec0efa6a.mjs';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'slash';
import 'node:fs/promises';

const $$Astro = createAstro("https://www.emmanuelgautier.com");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(AstroErrorData.ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  return renderTemplate`${maybeRenderHead($$result)}<img${addAttribute(image.src, "src")}${spreadAttributes(image.attributes)}>`;
}, "/var/data/workspace/withmoons/moons/node_modules/.pnpm/astro@2.6.6_@types+node@20.1.4_sharp@0.32.1/node_modules/astro/components/Image.astro");

const imageServiceConfig = {};
					const getImage = async (options) => await getImage$1(options, imageServiceConfig);
