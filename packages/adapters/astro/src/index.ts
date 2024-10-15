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

export { getI18nConfig } from './i18n.js';
export { getStaticPaths, getIndexPage } from './pages.js';
export { integrationsPreset } from './preset.js';
export { getRSS } from './rss.js';

type GalactiksOptions = object | undefined;

const symlinkDir = (targetPath: string, path: string) =>
  readdirSync(path)
    .filter((filename) => !filename.startsWith('.'))
    .map((filename) => [join(targetPath, filename), join(path, filename)])
    .filter(([target]) => !existsSync(target))
    .forEach(([target, path]) => symlinkSync(target, path));

const removeDirSymbolicLinks = (path: string) =>
  readdirSync(path)
    .map((filename) => join(path, filename))
    .filter((file) =>
      lstatSync(file, { throwIfNoEntry: false })?.isSymbolicLink()
    )
    .forEach((file) => unlinkSync(file));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function createPlugin(_: GalactiksOptions): AstroIntegration {
  let galactiksConfig = getConfig();

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
        let trailingSlash = config.trailingSlash;
        if (trailingSlash === 'ignore') {
          trailingSlash =
            config.build.format === 'directory' ? 'always' : 'never';
        }

        setConfig('trailingSlash', config.trailingSlash);

        assetsPath = join(fileURLToPath(config.srcDir), 'assets');
        galactiksConfig = setConfig('content.assets', assetsPath);

        publicPath = fileURLToPath(config.publicDir);
        galactiksConfig = setConfig('content.public', publicPath);

        updateConfig({
          site: galactiksConfig.webManifest.start_url,
          trailingSlash,
          prefetch: true,
          vite: {
            resolve: {
              preserveSymlinks: true,
            },
          },
        });

        symlinkDir(assetsPath, galactiksConfigContentAssets);
        symlinkDir(publicPath, galactiksConfigContentPublic);

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
