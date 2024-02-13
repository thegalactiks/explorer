import type { DocumentTypeDef } from '../consts.js';
import { itemListFields, translationFields } from './core.js';

export const ContentLayerWebPageElementFields: DocumentTypeDef = {
  name: 'WebPageElement',
  fields: {
    elementType: {
      type: 'enum',
      options: ['SiteNavigationElement', 'WPFooter', 'WPHeader', 'WPSideBar'],
      required: false,
    }, // avoid collision with contentlayer type
    ...translationFields, //
    ...itemListFields,
  },
};
