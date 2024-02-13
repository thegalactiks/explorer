import type { DocumentTypeDef } from '../consts.js';
import { creativeWorkFields } from './creative-work.js';

export const ContentLayerWebsiteFields: DocumentTypeDef = {
  name: 'Website',
  fields: {
    ...creativeWorkFields,
    issn: { type: 'string', required: false },
  },
};
