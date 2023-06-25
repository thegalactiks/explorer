import { _ as __astro_tag_component__, F as Fragment, i as createVNode } from './astro.ec0efa6a.mjs';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'slash';
import 'node:fs/promises';
import './_astro_assets.b14c97d4.mjs';
import 'fs';
import 'path';
import 'node:worker_threads';
import 'os';
import 'url';
import 'module';
import 'worker_threads';

const frontmatter = {
  "name": "Emmanuel Gautier",
  "description": "I'm Emmanuel, a solution architect and fullstack developer living in France.",
  "identifier": "index",
  "dateCreated": "1970-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p"
  }, props.components);
  return createVNode(_components.p, {
    children: "Hi \u{1F44B}, I\u2019m Emmanuel, a solution architect and fullstack developer living in France."
  });
}
function MDXContent(props = {}) {
  const {
    wrapper: MDXLayout
  } = props.components || {};
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

__astro_tag_component__(getHeadings, "astro:jsx");
__astro_tag_component__(MDXContent, "astro:jsx");
const url = "src/content/page/home.mdx";
const file = "/var/data/workspace/withmoons/moons/examples/themes/basic/src/content/page/home.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components },
										});
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/var/data/workspace/withmoons/moons/examples/themes/basic/src/content/page/home.mdx";

export { Content, Content as default, file, frontmatter, getHeadings, url };
