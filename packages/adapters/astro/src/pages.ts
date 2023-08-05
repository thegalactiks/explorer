import { getAllPagesExceptHome } from '@withmoons/explorer'

export async function getStaticPaths() {
  return (await getAllPagesExceptHome()).map((page) => ({
    params: { path: page.path.slice(1) },
    props: { page },
  }))
}
