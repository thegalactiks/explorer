import type { BreadcrumbList, WithContext } from 'schema-dts';
import type { Content } from '../../../types/index.mjs';

export const getBreadcrumb = (
  document: Content
): WithContext<BreadcrumbList> => {
  if (!Array.isArray(document.breadcrumb?.itemListElement)) {
    throw new Error('breadcrumb must be an array at this point.');
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: document.breadcrumb?.itemListElement.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.item,
    })),
  };
};
