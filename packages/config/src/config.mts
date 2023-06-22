import type { AstroUserConfig } from 'astro/config';
import type { WebManifest } from './webmanifest.mjs';

export type MoonsConfig = {
  webManifest: WebManifest;

  astro: AstroUserConfig;
};

const defaultConfig: MoonsConfig = {
  webManifest: {
    name: 'Moons',
    description: 'Website Launcher',
    start_url: 'io.moons.com',
    icons: [],
  },

  astro: {
    experimental: {
      assets: true,
    },
  },
};

let _config: MoonsConfig = defaultConfig;

export function defineConfig(config: Partial<MoonsConfig>): MoonsConfig {
  _config = defaultConfig;

  return extendsConfig(config);
}

export function extendsConfig(config: Partial<MoonsConfig>): MoonsConfig {
  _config = {
    ..._config,
    ...config,
  };

  _config.astro = {
    site: config.webManifest?.start_url || _config.astro.site,
    ..._config.astro,
  };

  return _config;
}

export function getConfig(): MoonsConfig {
  return _config;
}
