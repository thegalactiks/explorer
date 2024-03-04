import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AstroConfig, AstroIntegration } from 'astro';
import { getDefaultLanguage } from '@galactiks/config';
import { type Content, getPageByURL } from '@galactiks/explorer';
import { generateSitemaps } from '@galactiks/sitemap';

const sitemapIndexOutput = 'sitemap-index.xml';

const createPlugin = (): AstroIntegration => {
  let config: AstroConfig;

  return {
    name: '@galactiks/astro-integration/sitemap',

    hooks: {
      'astro:config:done': async ({ config: cfg }) => {
        config = cfg;
      },

      'astro:build:done': async ({ dir, routes, pages, logger }) => {
        if (!config.site) {
          logger.warn(
            'The Sitemap integration requires the `site` astro.config option. Skipping.'
          );
          return;
        }

        let finalSiteUrl: URL;
        if (config.site) {
          finalSiteUrl = new URL(config.base, config.site);
        } else {
          console.warn(
            'The Sitemap integration requires the `site` astro.config option. Skipping.'
          );
          return;
        }

        let pageUrls = pages.map((p) => {
          if (p.pathname !== '' && !finalSiteUrl.pathname.endsWith('/'))
            finalSiteUrl.pathname += '/';
          if (p.pathname.startsWith('/')) p.pathname = p.pathname.slice(1);
          const fullPath = finalSiteUrl.pathname + p.pathname;
          return new URL(fullPath, finalSiteUrl).href;
        });

        const routeUrls = routes.reduce<string[]>((urls, r) => {
          if (r.type !== 'page') return urls;

          /**
           * Dynamic URLs have entries with `undefined` pathnames
           */
          if (r.pathname) {
            // `finalSiteUrl` may end with a trailing slash
            // or not because of base paths.
            let fullPath = finalSiteUrl.pathname;
            if (fullPath.endsWith('/'))
              fullPath += r.generate(r.pathname).substring(1);
            else fullPath += r.generate(r.pathname);

            const newUrl = new URL(fullPath, finalSiteUrl).href;

            if (config.trailingSlash === 'never') {
              urls.push(newUrl);
            } else if (
              config.build.format === 'directory' &&
              !newUrl.endsWith('/')
            ) {
              urls.push(newUrl + '/');
            } else {
              urls.push(newUrl);
            }
          }

          return urls;
        }, []);

        pageUrls = Array.from(new Set([...pageUrls, ...routeUrls]));
        logger.info(`Generating sitemap for ${pageUrls.length} pages`);
        logger.info(pageUrls.join('\n'));

        const contentPages = (
          await Promise.all(pageUrls.map(getPageByURL))
        ).filter((page) => page !== undefined) as Content[];
        if (contentPages.length === 0) {
          logger.warn(
            `No pages found!\n\`${sitemapIndexOutput}\` not created.`
          );
          return;
        }

        const destDir = fileURLToPath(dir);
        await generateSitemaps({
          destinationDir: destDir,
          hostname: finalSiteUrl.href,
          pages: contentPages,
          defaultLanguage: getDefaultLanguage(),
          publication: {
            name: 'Galactiks',
          },
        });
        // await simpleSitemapAndIndex({
        //   hostname: finalSiteUrl.href,
        //   destinationDir: destDir,
        //   sourceData: urlData,
        //   limit: entryLimit,
        //   gzip: false,
        // });
        logger.info(
          `\`${sitemapIndexOutput}\` created at \`${path.relative(process.cwd(), destDir)}\``
        );
      },
    },
  };
};

export default createPlugin;
