import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { z } from 'zod';

const defaultWebManifestFileName = 'webmanifest.json';

const iconSchema = z.object({
  src: z.string(),
  sizes: z.string(),
  type: z.string().optional(),
});

const shortcutSchema = z.object({
  name: z.string(),
  short_name: z.string().optional(),
  url: z.string(),
  description: z.string().optional(),
  icons: z.array(iconSchema).optional(),
});

const webManifestSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  short_name: z.string().optional(),
  description: z.string(),
  start_url: z.string().url(),
  scope: z.string().optional(),
  background_color: z.string().optional(),
  theme_color: z.string().optional(),
  icons: z.array(iconSchema),
  shortcuts: z.array(shortcutSchema).optional(),
});

export type WebManifest = z.infer<typeof webManifestSchema>;

export function readWebManifestFromPath(path: string): WebManifest {
  const webmanifestPath = join(path, defaultWebManifestFileName);
  if (!existsSync(webmanifestPath)) {
    throw new Error(
      `The WebManifest file "${webmanifestPath}" does not exist.`
    );
  }

  const webManifestFileContent = readFileSync(webmanifestPath, 'utf8');
  return webManifestSchema.parse(JSON.parse(webManifestFileContent));
}
