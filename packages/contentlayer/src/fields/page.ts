import type { DocumentTypeDef } from '../consts.js';
import { galactiksFields } from './core.js';
import { creativeWorkFields } from './creative-work.js';

export const ContentLayerPageFields: DocumentTypeDef = {
  name: 'Page',
  fields: {
    ...galactiksFields,
    ...creativeWorkFields,
  },
};
