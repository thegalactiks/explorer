import deepmerge from 'deepmerge';
import { existsSync, readFileSync } from 'fs';
import set from 'lodash.set';
import { join } from 'path';
import { z } from 'zod';

import { analyticsConfigSchema } from './analytics.mjs';
import {
  readWebManifestFromPath,
  type WebManifest,
} from './webmanifest.config.mjs';

const localesSchema = z.object({
  default: z.string(),
  available: z.array(z.string()),
});

const pageSchema = z.object({
  path: z
    .array(
      z.object({
        locale: z.string(),
        path: z.string(),
      })
    )
    .or(z.string()),
});

const pagesObjectItemSchema = pageSchema.or(z.literal(false)).optional();
const galactiksConfigFileSchema = z.object({
  locales: localesSchema.optional(),
  template: z.string(),
  analytics: analyticsConfigSchema.optional(),
  pages: z
    .object({
      articles: pagesObjectItemSchema,
      organizations: pagesObjectItemSchema,
      pages: pagesObjectItemSchema,
      people: pagesObjectItemSchema,
      place: pagesObjectItemSchema,
      tags: pagesObjectItemSchema,
    })
    .optional(),
});

const defaultConfigFileName = 'galactiks.config.json';

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type GalactiksConfig = WithRequired<
  z.infer<typeof galactiksConfigFileSchema>,
  'pages'
> & {
  name?: string;
  content: {
    root: string;
    generated: string;
    assets: string;
    public: string;
  };
  webManifest: WebManifest;
};

const defaultPages: GalactiksConfig['pages'] = {
  articles: {
    path: '/{+isPartOf}/{/identifier}/',
  },

  pages: {
    path: '/{+isPartOf}{/identifier}/',
  },

  people: {
    path: '/authors/{/identifier}/',
  },

  organizations: {
    path: '/organizations/{/identifier}/',
  },

  tags: {
    path: '/tags/{/identifier}/',
  },
};

let _config: GalactiksConfig;

const readConfigFile = (path: string): GalactiksConfig => {
  const configPath = join(path, defaultConfigFileName);
  if (!existsSync(configPath)) {
    throw new Error(`The config file "${configPath}" does not exist.`);
  }

  const configFileContent = readFileSync(configPath, 'utf8');
  const configFile = galactiksConfigFileSchema.parse(
    JSON.parse(configFileContent)
  );

  const defaultConfig = {
    pages: defaultPages,
    content: {
      root: path,
      generated: join(path, '.contentlayer/generated/index.mjs'),
      assets: join(path, 'assets'),
      public: join(path, 'public'),
    },
    webManifest: readWebManifestFromPath(path),
  };
  const config: GalactiksConfig = deepmerge(defaultConfig, configFile);

  return config;
};

export function getConfig(path?: string): GalactiksConfig {
  if (_config) {
    return _config;
  }

  if (!path && process.env.CONTENT_PATH) {
    path = process.env.CONTENT_PATH;
  } else if (!path) {
    path = process.cwd();
  }
  _config = readConfigFile(path);

  return _config;
}

export function setConfig(key: string, value: unknown): GalactiksConfig {
  _config = set(getConfig(), key, value);

  return _config;
}

export function getDefaultLanguage(): string | undefined {
  return getConfig().locales?.default;
}

export function getLanguages(): string[] {
  const locales = getConfig().locales;

  return typeof locales === 'object'
    ? locales.available || [locales.default]
    : [];
}
