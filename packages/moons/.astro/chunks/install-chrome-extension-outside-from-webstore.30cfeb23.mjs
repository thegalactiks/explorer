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
  "name": "Install a Chrome Extension outside from the Webstore",
  "description": "You may already encounter the case when you see a Chrome extension source code but you don't know how to install it. In this case, you may want to follow the steps below.",
  "image": {
    "contentUrl": "/images/webstore.jpg"
  },
  "keywords": ["chrome", "google"],
  "identifier": "install-chrome-extension-outside-from-webstore",
  "inLanguage": "en",
  "isPartOf": "blog",
  "translationOfWork": ["2013/installer-une-extension-chrome-hors-du-web-store"],
  "dateModified": "2021-11-19T00:14:20.838Z",
  "dateCreated": "2013-08-13T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "install-from-packaged-extension",
    "text": "Install from packaged extension"
  }, {
    "depth": 2,
    "slug": "install-from-source-code",
    "text": "Install from source code"
  }, {
    "depth": 2,
    "slug": "notes",
    "text": "Notes"
  }];
}
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p",
    code: "code",
    h2: "h2",
    ol: "ol",
    li: "li"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "You may already encounter the case when you see a Chrome extension source code but you don\u2019t know how to install it. In this case, you may want to follow the steps below."
    }), createVNode(_components.p, {
      children: ["If you have the extension ", createVNode(_components.code, {
        children: ".crx"
      }), " file, it means you have the packaged version of the extension. In this case, go to part 1, otherwise, go to part 2."]
    }), createVNode(_components.h2, {
      id: "install-from-packaged-extension",
      children: "Install from packaged extension"
    }), createVNode(_components.p, {
      children: "To install a packaged extension, follow the steps below:"
    }), createVNode(_components.ol, {
      children: [createVNode(_components.li, {
        children: ["Download the Chrome extension ", createVNode(_components.code, {
          children: ".crx"
        }), " file (if it is already the case, go to part 3)."]
      }), createVNode(_components.li, {
        children: "If you disable the protection settings against Chrome extension installation from outside the Chrome Web Store, the installation should be automatic when opening the file."
      }), createVNode(_components.li, {
        children: ["Otherwise, open the Chrome extension manager (Menu > Tools > Extensions) and drag and drop the file ", createVNode(_components.code, {
          children: ".crx"
        }), " file."]
      }), createVNode(_components.li, {
        children: "Si vous avez d\xE9sactiv\xE9 la protection contre les installations \xE0 partir de site hors du Chrome Web Store, l\u2019installation devrait \xEAtre automatique lors de l\u2019ouverture du fichier."
      })]
    }), createVNode(_components.h2, {
      id: "install-from-source-code",
      children: "Install from source code"
    }), createVNode(_components.p, {
      children: "To install from source code, follow the steps below:"
    }), createVNode(_components.ol, {
      children: [createVNode(_components.li, {
        children: "Download the source code folder"
      }), createVNode(_components.li, {
        children: ["Check that the directory contains a file named ", createVNode(_components.code, {
          children: "manifest.json"
        })]
      }), createVNode(_components.li, {
        children: "Go to the Chrome extension manager (Menu > Tools > Extensions)"
      }), createVNode(_components.li, {
        children: "Check the \u2019 Developer Mode \u2019 checkbox in the top right corner of your screen."
      }), createVNode(_components.li, {
        children: ["Three buttons should appear. Click on \u2019 Load unpacked extension\u2026 \u2019 and choose the directory containing the source code and the precious ", createVNode(_components.code, {
          children: "manifest.json"
        }), " file."]
      })]
    }), createVNode(_components.h2, {
      id: "notes",
      children: "Notes"
    }), createVNode(_components.p, {
      children: ["This tutorial is compatible with Chromium-based browsers (Chrome, Opera, Edge, \u2026). In case of errors, check if the file ", createVNode(_components.code, {
        children: "manifest.json"
      }), " exists and there are no missing files, like images or JS files."]
    })]
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
const url = "src/content/article/2013/install-chrome-extension-outside-from-webstore.mdx";
const file = "/var/data/workspace/withmoons/moons/examples/themes/basic/src/content/article/2013/install-chrome-extension-outside-from-webstore.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components },
										});
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/var/data/workspace/withmoons/moons/examples/themes/basic/src/content/article/2013/install-chrome-extension-outside-from-webstore.mdx";

export { Content, Content as default, file, frontmatter, getHeadings, url };
