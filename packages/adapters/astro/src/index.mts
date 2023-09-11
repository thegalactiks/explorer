import { getConfig, setConfig } from '@withmoons/config';
import type { AstroIntegration } from 'astro';
import {
  existsSync,
  lstatSync,
  readdirSync,
  symlinkSync,
  unlinkSync,
} from 'fs';
import { fileURLToPath } from 'node:url';
import { join } from 'path';

export { getStaticPaths, getHomePage } from './pages.mjs';
export { integrationsPreset } from './preset.mjs';

type MoonsOptions = {
  content?: {
    path?: string;
  };
};

const symlinkDir = (path: string, targetPath: string) =>
  readdirSync(path)
    .map((filename) => [join(path, filename), join(targetPath, filename)])
    .filter(([, path]) => !existsSync(path))
    .forEach(([target, path]) => symlinkSync(target, path));

const removeDirSymbolicLinks = (path: string) =>
  readdirSync(path)
    .map((filename) => join(path, filename))
    .filter((file) => lstatSync(file).isSymbolicLink())
    .forEach((file) => unlinkSync(file));

export default function createPlugin(options: MoonsOptions): AstroIntegration {
  let moonsConfig = getConfig(options?.content?.path);

  const moonsConfigContentAssets = moonsConfig.content.assets;
  const moonsConfigContentPublic = moonsConfig.content.public;

  let assetsPath: string;
  let publicPath: string;

  return {
    name: '@withmoons/astro-integration',
    hooks: {
      'astro:config:setup': ({
        config,
        command,
        updateConfig,
        addWatchFile,
      }) => {
        assetsPath = join(fileURLToPath(config.srcDir), 'assets');
        moonsConfig = setConfig('content.assets', assetsPath);

        publicPath = fileURLToPath(config.publicDir);
        moonsConfig = setConfig('content.public', publicPath);

        updateConfig({
          site: moonsConfig.webManifest.start_url,
          vite: {
            resolve: {
              preserveSymlinks: true,
            },
          },
        });

        symlinkDir(moonsConfigContentAssets, assetsPath);
        symlinkDir(moonsConfigContentAssets, publicPath);
        symlinkDir(moonsConfigContentPublic, publicPath);

        if (command === 'dev') {
          addWatchFile(moonsConfig.content.generated);
          addWatchFile(moonsConfigContentAssets);
          addWatchFile(moonsConfigContentPublic);
        }
      },

      'astro:build:done': () => {
        removeDirSymbolicLinks(assetsPath);
        removeDirSymbolicLinks(publicPath);
      },
    },
  };
}
