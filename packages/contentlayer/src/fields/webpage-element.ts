import type { DocumentTypeDef } from '../consts.js';
import { itemListFields } from './core.js';

export const ContentLayerWebPageElementFields: DocumentTypeDef = {
  name: 'WebPageElement',
  fields: {
    elementType: {
      type: 'enum',
      options: ['SiteNavigationElement', 'WPFooter', 'WPHeader', 'WPSideBar'],
      required: false,
    }, // avoid collision with contentlayer type
    inLanguage: { type: 'string', required: false },
    ...itemListFields,
  },
};
