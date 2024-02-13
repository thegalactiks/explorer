import {
  defineNestedType,
  type FieldDefs,
  type NestedType,
} from 'contentlayer/source-files';

export const galactiksFields: FieldDefs = {
  listingPage: { type: 'boolean', required: false, default: false },
  slug: { type: 'string', required: false },
  path: { type: 'string', required: false },
};

export const idFields: FieldDefs = {
  '@id': { type: 'string', required: true },
};
export const idDocumentType = defineNestedType(() => ({
  name: 'Id',
  fields: idFields,
}));

export const itemListElementFields: NestedType = defineNestedType(() => ({
  name: 'ItemListElement',
  fields: {
    name: { type: 'string', required: true },
    path: { type: 'string', required: false },
    url: { type: 'string', required: false },
    itemListElement: {
      type: 'list',
      required: false,
      of: itemListElementFields,
    },
  },
}));

export const itemListFields: FieldDefs = {
  name: { type: 'string', required: false },
  identifier: { type: 'string', required: true },
  itemListElement: { type: 'list', required: true, of: itemListElementFields },
};

export const postalAddress = defineNestedType(() => ({
  name: 'PostalAddress',
  fields: {
    addressCountry: { type: 'string', required: true },
    addressLocality: { type: 'string', required: false },
    addressRegion: { type: 'string', required: false },
    postOfficeBoxNumber: { type: 'string', required: false },
    postalCode: { type: 'string', required: false },
    streetAddress: { type: 'string', required: false },
  },
}));
