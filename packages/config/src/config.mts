import markdoc from '@astrojs/markdoc';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import prefetch from '@astrojs/prefetch';
import sitemap from '@astrojs/sitemap';
import type { AstroUserConfig } from 'astro/config';
import deepmerge from './utils/deepmerge.mjs';

import type { WebManifest } from './webmanifest.mjs';

export type MoonsConfig = AstroUserConfig & {
  webManifest: WebManifest;
};

const defaultConfig: MoonsConfig = {
  webManifest: {
    name: 'Moons',
    description: 'Website Launcher',
    start_url: 'io.moons.com',
    icons: [],
  },

  experimental: {
    assets: true,
  },
  integrations: [
    markdoc(),
    mdx(),
    partytown(),
    prefetch(),
    sitemap(),
  ],
};

let _config: MoonsConfig = defaultConfig;

export function defineConfig(config: Partial<MoonsConfig>): MoonsConfig {
  _config = defaultConfig;

  return extendsConfig(config);
}

export function extendsConfig(config: Partial<MoonsConfig>): MoonsConfig {
  _config = deepmerge({
    site: config.webManifest?.start_url || _config.site,
    ..._config,
  }, config);

  return _config;
}

export function getConfig(): MoonsConfig {
  return _config;
}
