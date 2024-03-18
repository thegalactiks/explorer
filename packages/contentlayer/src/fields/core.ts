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

/*
 * Those fields are following schema.org fields specifications:
 * - https://schema.org/inLanguage
 * - https://schema.org/translationOfWork
 * - https://schema.org/workTranslation
 *
 * Those fields are applied for every document types when a readable text exists (ex: description, name, ...etc).
 */
export const translationFields: FieldDefs = {
  inLanguage: { type: 'string', required: false },
  translationOfWork: { type: 'nested', of: idDocumentType, required: false },
  workTranslation: { type: 'nested', of: idDocumentType, required: false },
};

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

export const quantitativeValue = defineNestedType(() => ({
  name: 'QuantitativeValue',
  fields: {
    maxValue: { type: 'number', required: false },
    minValue: { type: 'number', required: false },
    value: { type: 'number', required: true },
    unitCode: { type: 'string', required: false },
    unitText: { type: 'string', required: false },
  },
}));

const EUEnergyEfficiencyEnumeration = [
  'EUEnergyEfficiencyCategoryA',
  'EUEnergyEfficiencyCategoryA1Plus',
  'EUEnergyEfficiencyCategoryA2Plus',
  'EUEnergyEfficiencyCategoryA3Plus',
  'EUEnergyEfficiencyCategoryB',
  'EUEnergyEfficiencyCategoryC',
  'EUEnergyEfficiencyCategoryD',
  'EUEnergyEfficiencyCategoryE',
  'EUEnergyEfficiencyCategoryF',
  'EUEnergyEfficiencyCategoryG',
];
export const energyConsumptionDetails = defineNestedType(() => ({
  name: 'EnergyConsumptionDetails',
  fields: {
    energyEfficiencyScaleMax: {
      type: 'enum',
      options: EUEnergyEfficiencyEnumeration,
      required: false,
    },
    energyEfficiencyScaleMin: {
      type: 'enum',
      options: EUEnergyEfficiencyEnumeration,
      required: false,
    },
  },
}));

export const propertyValue = defineNestedType(() => ({
  name: 'PropertyValue',
  fields: {
    name: { type: 'string', required: true },
    value: { type: 'string', required: true },
    minValue: { type: 'number', required: false },
    maxValue: { type: 'number', required: false },
    unitCode: { type: 'string', required: false },
    unitText: { type: 'string', required: false },
  },
}));
