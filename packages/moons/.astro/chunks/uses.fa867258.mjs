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
  "name": "Uses",
  "description": "Here's what tech I'm currently using for coding and in my day-to-day tasks.",
  "identifier": "uses",
  "dateCreated": "1970-01-01T00:00:00.000Z"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "hardware",
    "text": "Hardware"
  }, {
    "depth": 2,
    "slug": "os-and-distribution",
    "text": "OS and Distribution"
  }, {
    "depth": 2,
    "slug": "coding",
    "text": "Coding"
  }, {
    "depth": 3,
    "slug": "languages--libraries",
    "text": "Languages & Libraries"
  }, {
    "depth": 3,
    "slug": "hosting--cloud-providers",
    "text": "Hosting / Cloud Providers"
  }, {
    "depth": 3,
    "slug": "vscode-extensions",
    "text": "VSCode Extensions"
  }, {
    "depth": 2,
    "slug": "software",
    "text": "Software"
  }];
}
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p",
    a: "a",
    span: "span",
    h2: "h2",
    ul: "ul",
    li: "li",
    h3: "h3"
  }, props.components);
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Here\u2019s what tech I\u2019m currently using for coding and in my day-to-day tasks."
    }), createVNode(_components.p, {
      children: ["If you want to see what other devs use, check out ", createVNode(_components.a, {
        href: "https://uses.tech/",
        rel: "nofollow",
        children: ["uses.tech", createVNode(_components.span, {
          children: " \u{1F517}"
        })]
      }), "!"]
    }), createVNode(_components.h2, {
      id: "hardware",
      children: "Hardware"
    }), createVNode(_components.ul, {
      children: [createVNode(_components.li, {
        children: "AMD Ryzen 5 5600X 3.7 GHz 6-Core"
      }), createVNode(_components.li, {
        children: "16GB DDR4 RAM"
      }), createVNode(_components.li, {
        children: "MSI GeForce GT 730"
      })]
    }), createVNode(_components.p, {
      children: ["Completed build on ", createVNode(_components.a, {
        href: "https://pcpartpicker.com/b/tyGcCJ",
        rel: "nofollow",
        children: ["pcpartpicker", createVNode(_components.span, {
          children: " \u{1F517}"
        })]
      })]
    }), createVNode(_components.h2, {
      id: "os-and-distribution",
      children: "OS and Distribution"
    }), createVNode(_components.ul, {
      children: createVNode(_components.li, {
        children: "Linux / Ubuntu"
      })
    }), createVNode(_components.h2, {
      id: "coding",
      children: "Coding"
    }), createVNode(_components.ul, {
      children: [createVNode(_components.li, {
        children: "Visual Studio Code"
      }), createVNode(_components.li, {
        children: "ZSH"
      })]
    }), createVNode(_components.h3, {
      id: "languages--libraries",
      children: "Languages & Libraries"
    }), createVNode(_components.ul, {
      children: [createVNode(_components.li, {
        children: "JavaScript"
      }), createVNode(_components.li, {
        children: "TypeScript"
      }), createVNode(_components.li, {
        children: "React"
      }), createVNode(_components.li, {
        children: "Gatsby"
      }), createVNode(_components.li, {
        children: "Next.JS"
      }), createVNode(_components.li, {
        children: "Vue"
      }), createVNode(_components.li, {
        children: "Nuxt"
      }), createVNode(_components.li, {
        children: "Node"
      }), createVNode(_components.li, {
        children: "NestJS"
      }), createVNode(_components.li, {
        children: "Python"
      }), createVNode(_components.li, {
        children: "Docker"
      }), createVNode(_components.li, {
        children: "MongoDB"
      }), createVNode(_components.li, {
        children: "Sometimes Kotlin with SpringBoot"
      }), createVNode(_components.li, {
        children: "Sometimes PHP with Symfony or Laravel"
      })]
    }), createVNode(_components.h3, {
      id: "hosting--cloud-providers",
      children: "Hosting / Cloud Providers"
    }), createVNode(_components.ul, {
      children: [createVNode(_components.li, {
        children: "Cloudflare"
      }), createVNode(_components.li, {
        children: "Amazon Web Service (AWS)"
      }), createVNode(_components.li, {
        children: "Google Cloud Platform (GCP)"
      })]
    }), createVNode(_components.h3, {
      id: "vscode-extensions",
      children: "VSCode Extensions"
    }), createVNode(_components.ul, {
      children: [createVNode(_components.li, {
        children: "Docker"
      }), createVNode(_components.li, {
        children: "ESLint"
      }), createVNode(_components.li, {
        children: "Front Matter"
      }), createVNode(_components.li, {
        children: "Github Copilot"
      }), createVNode(_components.li, {
        children: "HashiCorp Terraform"
      }), createVNode(_components.li, {
        children: "PHP Intelphense for PHP development"
      }), createVNode(_components.li, {
        children: "Prettier"
      }), createVNode(_components.li, {
        children: "Python & Pylance for Python Development"
      }), createVNode(_components.li, {
        children: "\u201CExtension Pack for Java\u201D, for Java and Kotlin development"
      }), createVNode(_components.li, {
        children: "Vetur and Volar for VueJS development depending whether is Vue 2 or Vue 3"
      })]
    }), createVNode(_components.h2, {
      id: "software",
      children: "Software"
    }), createVNode(_components.ul, {
      children: [createVNode(_components.li, {
        children: "Chrome"
      }), createVNode(_components.li, {
        children: "Spotify"
      }), createVNode(_components.li, {
        children: "Bitwarden"
      }), createVNode(_components.li, {
        children: "Grammarly"
      })]
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
const url = "src/content/page/uses.mdx";
const file = "/var/data/workspace/withmoons/moons/examples/themes/basic/src/content/page/uses.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components },
										});
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/var/data/workspace/withmoons/moons/examples/themes/basic/src/content/page/uses.mdx";

export { Content, Content as default, file, frontmatter, getHeadings, url };
