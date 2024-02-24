import { defineDocumentType } from 'contentlayer/source-files';
import { ContentLayerPlaceFields } from '../fields/place.js';

export const PlaceDocumentType = defineDocumentType(() => ({
  ...ContentLayerPlaceFields,
  filePathPattern: 'places/**/!(index).md?(x)',
  contentType: 'mdx',
}));
