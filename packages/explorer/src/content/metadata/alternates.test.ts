import type { Content, ContentlayerDocumentWithURL } from '../../types';

import { alternatesHeaderBuilder } from './alternates';

describe('alternatesHeaderBuilder', () => {
  beforeAll(() => {
    jest.mock('@galactiks/config', () => ({
      getDefaultLanguage: () => 'en-US',
    }));
  });

  test('build alternates when there is only one locales', () => {
    const document = {
      type: 'Page',
      identifier: 'identifier',
      url: '/en-US/identifier',
      inLanguage: 'en-US',
    } as Content;
    const documents = [
      {
        type: 'Page',
        url: '/en-US/identifier',
        inLanguage: 'en-US',
      } as ContentlayerDocumentWithURL,
    ];
    const builder = alternatesHeaderBuilder(documents);

    const alternates = builder(document);

    expect(alternates).toEqual([
      { href: '/en-US/identifier', hreflang: 'en-US' },
      { href: '/en-US/identifier', hreflang: 'x-default' },
    ]);
  });

  test('build alternates when there is multiple locales', () => {
    const document = {
      type: 'Page',
      identifier: 'identifier',
      url: '/en-US/identifier',
      inLanguage: 'en-US',
    } as Content;
    const documents = [
      {
        type: 'Page',
        url: '/en-US/identifier',
        inLanguage: 'en-US',
      } as ContentlayerDocumentWithURL,

      {
        type: 'Page',
        url: '/fr-FR/identifiant',
        inLanguage: 'fr-FR',
      } as ContentlayerDocumentWithURL,
    ];
    const builder = alternatesHeaderBuilder(documents);

    const alternates = builder(document);

    expect(alternates).toEqual([
      { href: '/en-US/identifier', hreflang: 'en-US' },
      { href: '/en-US/identifier', hreflang: 'x-default' },
    ]);
  });

  test('build alternates when there is multiple locales', () => {
    const document = {
      type: 'Page',
      identifier: 'identifier',
      url: '/en-US/identifier',
      inLanguage: 'en-US',
    } as Content;
    const documents = [
      {
        type: 'Page',
        identifier: 'identifier',
        url: '/en-US/identifier',
        inLanguage: 'en-US',
      } as ContentlayerDocumentWithURL,

      {
        type: 'Page',
        identifier: 'identifier',
        url: '/en-IE/identifier',
        translationOfWork: {
          '@id': 'identifier',
        },
        inLanguage: 'en-IE',
      } as ContentlayerDocumentWithURL,

      {
        type: 'Page',
        identifier: 'identifiant',
        url: '/fr-FR/identifiant',
        translationOfWork: {
          '@id': 'identifier',
        },
        inLanguage: 'fr-FR',
      } as ContentlayerDocumentWithURL,
    ];
    const builder = alternatesHeaderBuilder(documents);

    const alternates = builder(document);

    expect(alternates).toEqual([
      { href: '/en-IE/identifier', hreflang: 'en-IE' },
      { href: '/en-US/identifier', hreflang: 'en-US' },
      { href: '/fr-FR/identifiant', hreflang: 'fr-FR' },
      { href: '/en-US/identifier', hreflang: 'x-default' },
    ]);
  });

  test('build alternates when there is multiple locales for a same language with the same identifier', () => {
    const document = {
      type: 'Page',
      identifier: 'identifier',
      url: '/en-US/identifier',
      inLanguage: 'en-US',
    } as Content;
    const documents = [
      {
        type: 'Page',
        identifier: 'identifier',
        url: '/en-US/identifier',
        inLanguage: 'en-US',
      } as ContentlayerDocumentWithURL,

      {
        type: 'Page',
        identifier: 'identifier',
        url: '/en-IE/identifier',
        inLanguage: 'en-IE',
      } as ContentlayerDocumentWithURL,
    ];
    const builder = alternatesHeaderBuilder(documents);

    const alternates = builder(document);

    expect(alternates).toEqual([
      { href: '/en-IE/identifier', hreflang: 'en-IE' },
      { href: '/en-US/identifier', hreflang: 'en-US' },
      { href: '/en-US/identifier', hreflang: 'x-default' },
    ]);
  });

  test('build alternates when there is multiple locales for a same language for a document with not default language', () => {
    const document = {
      type: 'Page',
      identifier: 'identifier',
      url: '/en-IE/identifier',
      inLanguage: 'en-IE',
    } as Content;
    const documents = [
      {
        type: 'Page',
        identifier: 'identifier',
        url: '/en-US/identifier',
        inLanguage: 'en-US',
      } as ContentlayerDocumentWithURL,

      {
        type: 'Page',
        identifier: 'identifier',
        url: '/en-IE/identifier',
        inLanguage: 'en-IE',
      } as ContentlayerDocumentWithURL,
    ];
    const builder = alternatesHeaderBuilder(documents);

    const alternates = builder(document);

    expect(alternates).toEqual([
      { href: '/en-IE/identifier', hreflang: 'en-IE' },
      { href: '/en-US/identifier', hreflang: 'en-US' },
      { href: '/en-US/identifier', hreflang: 'x-default' },
    ]);
  });
});
