import { defineDocumentType } from 'contentlayer/source-files';
import { ContentLayerPlaceFields } from '../fields/place.js';

export const PlaceDocumentType = defineDocumentType(() => ({
  ...ContentLayerPlaceFields,
  filePathPattern: 'places/**/*.md?(x)',
  contentType: 'mdx',
}));
