import { join } from 'path';
import { readWebManifestFromPath } from './webmanifest.config.js';

export const getDefaultConfig = (path: string) => ({
  trailingSlash: 'always',
  pages: {
    articles: {
      path: '/{+isPartOf}/{/identifier}/',
    },

    organizations: {
      path: '/organizations/{/identifier}/',
    },

    pages: {
      path: '/{+isPartOf}{/identifier}/',
    },

    people: {
      path: '/authors/{/identifier}/',
    },

    products: {
      path: '/products/{+isPartOf}/{/identifier}/',
    },

    softwareApplications: {
      path: '/software/{+isPartOf}/{/identifier}/',
    },

    places: {
      path: '/places/{+isPartOf}/{/identifier}/',
    },

    tags: {
      path: '/tags/{/identifier}/',
    },
  },
  content: {
    root: path,
    generated: join(path, '.contentlayer/generated/index.mjs'),
    assets: join(path, 'assets'),
    public: join(path, 'public'),
  },
  webManifest: readWebManifestFromPath(path),
});
