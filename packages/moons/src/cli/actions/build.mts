import { execSync } from 'child_process';
import { cpSync, existsSync, rmSync } from 'node:fs';
import { resolve, join } from 'path';
import { readWebManifestFromPath } from '@withmoons/config';

export type Options = {
  manifest: string
}

const defaultWebManifestFileName = 'webmanifest.json'

const configPath = process.env.MOONS_CONFIG_PATH || resolve('./assets/content');
const files = ['_schemas.ts', 'config.ts'];

function clean(contentPath: string) {
  files.forEach(file => {
    rmSync(join(contentPath, file), { force: true });
  })

  rmSync(contentPath, { recursive: true, force: true });
}

export function action(templatePath: string, path: string = '.', options: Options) {
  const rootPath = resolve(templatePath);
  const contentPath = resolve(path, 'content');
  const newContentPath = join(rootPath, 'src/content');

  files.forEach(file => {
    cpSync(join(configPath, file), join(contentPath, file));
  })

  if (existsSync(newContentPath)) {
    rmSync(newContentPath, { recursive: true, force: true });
  }
  cpSync(contentPath, newContentPath, { recursive: true });

  const webmanifestPath = options.manifest ? resolve(options.manifest) : join(path, defaultWebManifestFileName);
  const webManifest = readWebManifestFromPath(webmanifestPath);

  execSync(`npx astro build --root ${rootPath} --site ${webManifest.start_url}`);
  clean(newContentPath);
}
