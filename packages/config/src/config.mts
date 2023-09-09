import { existsSync, readFileSync } from 'fs';
import { z } from 'zod';

import {
  readWebManifestFromPath,
  type WebManifest,
} from './webmanifest.config.mjs';
import { join } from 'path';

const localesSchema = z.object({
  default: z.string(),
  available: z.array(z.string()),
});

const moonsConfigFileSchema = z.object({
  locales: localesSchema.optional(),
  template: z.string(),
});

const defaultConfigFileName = 'moons.config.json';

export type MoonsConfig = z.infer<typeof moonsConfigFileSchema> & {
  name?: string;
  content: {
    root: string;
    generated: string;
  };
  webManifest: WebManifest;
};

let _config: MoonsConfig;

const readConfigFile = (path: string): MoonsConfig => {
  const configPath = join(path, defaultConfigFileName);
  if (!existsSync(configPath)) {
    throw new Error(`The moons config file "${configPath}" does not exist.`);
  }

  const configFileContent = readFileSync(configPath, 'utf8');
  const configFile = moonsConfigFileSchema.parse(JSON.parse(configFileContent));

  const config: MoonsConfig = {
    ...configFile,
    content: {
      root: path,
      generated: join(path, '.contentlayer/generated/index.mjs'),
    },
    webManifest: readWebManifestFromPath(path),
  };

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
