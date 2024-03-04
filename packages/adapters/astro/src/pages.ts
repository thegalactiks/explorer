import { getLanguages } from '@galactiks/config';
import {
  getPages,
  getIndexPage as explorerGetIndexPage,
} from '@galactiks/explorer';

export async function getStaticPaths() {
  return (await getPages({ inLanguages: getLanguages() }))
    .map((page) => ({
      params: {
        path: page.path.endsWith('/') ? page.path.slice(0, -1) : page.path,
      },
      props: { page },
    }))
    .filter((page) => page.params.path && page.params.path !== '/');
}

export function getIndexPage() {
  return explorerGetIndexPage();
}
