import type { DocumentTypeDef } from '../consts.js';
import { galactiksFields } from './core.js';
import { creativeWorkFields } from './creative-work.js';

export const ContentLayerArticleFields: DocumentTypeDef = {
  name: 'Article',
  fields: {
    ...galactiksFields,
    ...creativeWorkFields,
  },
};
