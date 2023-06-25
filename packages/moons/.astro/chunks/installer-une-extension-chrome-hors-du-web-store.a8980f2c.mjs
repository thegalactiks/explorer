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
  "name": "Installer une extension chrome hors du Web Store",
  "description": "Dans cet article, nous allons voir comment installer une extension Chrome hors du WebStore.",
  "image": {
    "contentUrl": "/images/webstore.jpg"
  },
  "keywords": ["chrome", "google"],
  "identifier": "installer-une-extension-chrome-hors-du-web-store",
  "inLanguage": "fr",
  "isPartOf": "blog",
  "translationOfWork": ["2013/install-chrome-extension-outside-from-webstore"],
  "dateModified": "2021-11-19T00:15:17.940Z",
  "dateCreated": "2013-08-13T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "installer-\xE0-partir-de-lextension-empaquet\xE9",
    "text": "Installer \xE0 partir de l\u2019extension empaquet\xE9"
  }, {
    "depth": 2,
    "slug": "installer-\xE0-partir-des-sources",
    "text": "Installer \xE0 partir des sources"
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
      children: "Il vous est peut \xEAtre d\xE9j\xE0 arriv\xE9 de tomber sur des extensions ou des codes sources d\u2019extensions chrome qui sont hors du Web Store et de ne pas savoir comment les installer. Ou encore, dans le cas, o\xF9 vous d\xE9veloppez une extension chrome et que vous ne savez pas comment la tester, ce qui va suivre va vous int\xE9resser."
    }), createVNode(_components.p, {
      children: ["Si vous avez le fichier ", createVNode(_components.code, {
        children: ".crx"
      }), " de l\u2019extension, c\u2019est que vous poss\xE9dez la version empaquet\xE9e de l\u2019extension. Dans ce cas allez \xE0 la partie 1, sinon passez directement \xE0 la partie 2."]
    }), createVNode(_components.h2, {
      id: "installer-\xE0-partir-de-lextension-empaquet\xE9",
      children: "Installer \xE0 partir de l\u2019extension empaquet\xE9"
    }), createVNode(_components.p, {
      children: "Pour installer une extension empaquet\xE9, suivez les \xE9tapes suivantes :"
    }), createVNode(_components.ol, {
      children: [createVNode(_components.li, {
        children: ["T\xE9l\xE9charger l\u2019extension au format ", createVNode(_components.code, {
          children: ".crx"
        }), " (si d\xE9j\xE0 fait passez au troisi\xE8me point)"]
      }), createVNode(_components.li, {
        children: "Si vous avez d\xE9sactiv\xE9 la protection contre les installations \xE0 partir de site hors du Chrome Web Store, l\u2019installation devrait \xEAtre automatique lors de l\u2019ouverture du fichier."
      }), createVNode(_components.li, {
        children: ["Sinon, ouvrez le gestionnaire d\u2019extensions (Menu > Outils > Extensions) et faites-y un glisser/d\xE9poser du fichier ", createVNode(_components.code, {
          children: ".crx"
        }), "."]
      })]
    }), createVNode(_components.h2, {
      id: "installer-\xE0-partir-des-sources",
      children: "Installer \xE0 partir des sources"
    }), createVNode(_components.p, {
      children: "Pour installer \xE0 partir des sources, suivez les \xE9tapes suivantes :"
    }), createVNode(_components.ol, {
      children: [createVNode(_components.li, {
        children: "T\xE9l\xE9chargez le dossier contenant les sources"
      }), createVNode(_components.li, {
        children: ["V\xE9rifiez que ce dossier contient le fichier ", createVNode(_components.code, {
          children: "manifest.json"
        })]
      }), createVNode(_components.li, {
        children: "Rendez-vous dans le gestionnaire d\u2019extensions (Menu > Outils > Extensions)"
      }), createVNode(_components.li, {
        children: "Passez en \u2019 Mode d\xE9veloppeur \u2019 en cochant la case correspondante en haut \xE0 droite de votre \xE9cran."
      }), createVNode(_components.li, {
        children: ["Trois boutons devraient appara\xEEtre. Cliquez sur \u2019 Charger l\u2019extension non empaquet\xE9e\u2026 \u2019, puis choisissez le dossier contenant les codes sources et le pr\xE9cieux ", createVNode(_components.code, {
          children: "manifest.json"
        }), "."]
      })]
    }), createVNode(_components.h2, {
      id: "notes",
      children: "Notes"
    }), createVNode(_components.p, {
      children: ["Ce tutoriel est compatible avec les navigateurs bas\xE9s sur Chromium (Chrome, Opera, Edge, \u2026). En cas d\u2019erreur, v\xE9rifiez la pr\xE9sence de fichier ", createVNode(_components.code, {
        children: "manifest.json"
      }), " dans les sources et qu\u2019il ne manque pas de fichier tel que des images ou des fichiers Javascript."]
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
const url = "src/content/article/2013/installer-une-extension-chrome-hors-du-web-store.mdx";
const file = "/var/data/workspace/withmoons/moons/examples/themes/basic/src/content/article/2013/installer-une-extension-chrome-hors-du-web-store.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components },
										});
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/var/data/workspace/withmoons/moons/examples/themes/basic/src/content/article/2013/installer-une-extension-chrome-hors-du-web-store.mdx";

export { Content, Content as default, file, frontmatter, getHeadings, url };
