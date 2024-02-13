import { getLanguages } from '@galactiks/config';
import {
  getPages,
  getIndexPage as explorerGetIndexPage,
} from '@galactiks/explorer';

export async function getStaticPaths() {
  return (await getPages({ inLanguages: getLanguages() }))
    .filter((_p) => _p.path && _p.path !== '/')
    .map((page) => ({
      params: { path: page.path.slice(1) },
      props: { page },
    }));
}

export function getIndexPage() {
  return explorerGetIndexPage();
}
