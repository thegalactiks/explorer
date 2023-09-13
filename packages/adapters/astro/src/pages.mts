import { getDefaultLanguage, getLanguages } from '@galactiks/config';
import {
  getAllPagesExceptHome,
  getHomePage as explorerGetHomePage,
} from '@galactiks/explorer';

export async function getStaticPaths() {
  return (await getAllPagesExceptHome({ inLanguages: getLanguages() })).map(
    (page) => ({
      params: { path: page.path.slice(1) },
      props: { page },
    })
  );
}

export function getHomePage() {
  return explorerGetHomePage({ inLanguage: getDefaultLanguage() });
}
