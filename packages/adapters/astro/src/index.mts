import { getConfig, setConfig } from '@galactiks/config';
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

export { getStaticPaths, getIndexPage } from './pages.mjs';
export { integrationsPreset } from './preset.mjs';

type GalactiksOptions = {
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

export default function createPlugin(
  options: GalactiksOptions
): AstroIntegration {
  let galactiksConfig = getConfig(options?.content?.path);

  const galactiksConfigContentAssets = galactiksConfig.content.assets;
  const galactiksConfigContentPublic = galactiksConfig.content.public;

  let assetsPath: string;
  let publicPath: string;

  return {
    name: '@galactiks/astro-integration',
    hooks: {
      'astro:config:setup': ({
        config,
        command,
        updateConfig,
        addWatchFile,
      }) => {
        assetsPath = join(fileURLToPath(config.srcDir), 'assets');
        galactiksConfig = setConfig('content.assets', assetsPath);

        publicPath = fileURLToPath(config.publicDir);
        galactiksConfig = setConfig('content.public', publicPath);

        updateConfig({
          site: galactiksConfig.webManifest.start_url,
          prefetch: true,
          vite: {
            resolve: {
              preserveSymlinks: true,
            },
          },
        });

        symlinkDir(galactiksConfigContentAssets, assetsPath);
        symlinkDir(galactiksConfigContentAssets, publicPath);
        symlinkDir(galactiksConfigContentPublic, publicPath);

        if (command === 'dev') {
          addWatchFile(galactiksConfig.content.generated);
          addWatchFile(galactiksConfigContentAssets);
          addWatchFile(galactiksConfigContentPublic);
        }
      },

      'astro:build:done': () => {
        removeDirSymbolicLinks(assetsPath);
        removeDirSymbolicLinks(publicPath);
      },
    },
  };
}
