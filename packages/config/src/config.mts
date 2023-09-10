import deepmerge from 'deepmerge';
import { existsSync, readFileSync } from 'fs';
import { z } from 'zod';

import {
  readWebManifestFromPath,
  type WebManifest,
} from './webmanifest.config.mjs';
import { join } from 'path';
import { pageDocumentTypes } from './consts.mjs';

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

const moonsConfigFileSchema = z.object({
  locales: localesSchema.optional(),
  template: z.string(),
  pages: z
    .object(
      Object.fromEntries(
        Object.values(pageDocumentTypes).map((key) => [
          key,
          pageSchema.or(z.literal(false)).optional(),
        ])
      )
    )
    .optional(),
});

const defaultConfigFileName = 'moons.config.json';

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type MoonsConfig = WithRequired<
  z.infer<typeof moonsConfigFileSchema>,
  'pages'
> & {
  name?: string;
  content: {
    root: string;
    generated: string;
  };
  webManifest: WebManifest;
};

const defaultPages: MoonsConfig['pages'] = {
  articles: {
    path: '/{+isPartOf}/{/identifier}',
  },

  pages: {
    path: '/{+isPartOf}{/identifier}',
  },

  people: {
    path: '/authors/{/identifier}',
  },

  organizations: {
    path: '/organizations/{/identifier}',
  },
};

let _config: MoonsConfig;

const readConfigFile = (path: string): MoonsConfig => {
  const configPath = join(path, defaultConfigFileName);
  if (!existsSync(configPath)) {
    throw new Error(`The moons config file "${configPath}" does not exist.`);
  }

  const configFileContent = readFileSync(configPath, 'utf8');
  const configFile = moonsConfigFileSchema.parse(JSON.parse(configFileContent));

  const defaultConfig = {
    pages: defaultPages,
    content: {
      root: path,
      generated: join(path, '.contentlayer/generated/index.mjs'),
    },
    webManifest: readWebManifestFromPath(path),
  };
  const config: MoonsConfig = deepmerge(defaultConfig, configFile);

  return config;
};

export function getConfig(path?: string): MoonsConfig {
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

export function getDefaultLanguage(): string | undefined {
  return getConfig().locales?.default;
}

export function getLanguages(): string[] | undefined {
  return getConfig().locales?.available;
}
