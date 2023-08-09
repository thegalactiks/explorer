import type { ItemList } from '../types/index.mjs'
import { homeIdentifier, pageDepthLimit } from '../consts.mjs'
import type { ContentlayerDocumentWithURL } from '../urls.mjs'
import { documentByIdentifierSelector } from '../selectors.mjs'
import { MaxDepthLimitReachedError } from '../../exceptions/index.mjs'

const addPosition = (itemList: ItemList['itemListElement']): ItemList['itemListElement'] => itemList.map((item, index, arr) => ({
  ...item,
  position: arr.length - index
})).sort((a, b) => b.position - a.position)

export const breadcrumbBuilder = (documents: ContentlayerDocumentWithURL[]) => (document: ContentlayerDocumentWithURL): ItemList => {
  const selectPageByIdentifier = documentByIdentifierSelector(documents)

  const recursiveBreadcrumbExploration = (documentIdentifier: string, itemList: ItemList['itemListElement'] = []): ItemList['itemListElement'] => {
    if (itemList.length > pageDepthLimit) {
      throw new MaxDepthLimitReachedError()
    }

    const page = selectPageByIdentifier(documentIdentifier)
    if (!page) {
      throw new Error('No page found during breadcrumb computation')
    }

    itemList = itemList.concat({
      name: page.name,
      position: 0,
      item: page.url
    })

    if (documentIdentifier === homeIdentifier) {
      return itemList
    }

    return recursiveBreadcrumbExploration(page.isPartOf || homeIdentifier, itemList)
  }

  return {
    name: 'Breadcrumb',
    description: '',
    identifier: 'breadcrumb',
    itemListElement: addPosition(recursiveBreadcrumbExploration(document.identifier))
  }
}
