import { getConfig } from '@galactiks/config';
import { Content } from '../../types/index.js';
import { getTwitterCard } from './twitter';

jest.mock('@galactiks/config');

describe('getTwitterCard', () => {
  beforeAll(() => {
    (getConfig as jest.Mock).mockReturnValue({});
  });

  it('should return correct headers when document has an image', () => {
    const document = {
      name: 'Test Document',
      description: 'Test Description',
      image: {
        contentUrl: 'http://example.com/image.jpg',
        name: 'Test Image',
      },
    } as Content;

    const result = getTwitterCard(document);

    expect(result).toEqual([
      { name: 'twitter:title', content: 'Test Document' },
      { name: 'twitter:description', content: 'Test Description' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:image', content: 'http://example.com/image.jpg' },
      { name: 'twitter:image:alt', content: 'Test Image' },
    ]);
  });

  it('should return correct headers when document does not have an image', () => {
    const document = {
      name: 'Test Document',
      description: 'Test Description',
    } as Content;

    const result = getTwitterCard(document);

    expect(result).toEqual([
      { name: 'twitter:title', content: 'Test Document' },
      { name: 'twitter:description', content: 'Test Description' },
      { name: 'twitter:card', content: 'summary' },
    ]);
  });

  it('should include twitter:site if configured', () => {
    (getConfig as jest.Mock).mockReturnValue({
      twitter: {
        site: '@testsite',
      },
    });

    const document = {
      name: 'Test Document',
      description: 'Test Description',
    } as Content;

    const result = getTwitterCard(document);

    expect(result).toEqual([
      { name: 'twitter:title', content: 'Test Document' },
      { name: 'twitter:description', content: 'Test Description' },
      { name: 'twitter:site', content: '@testsite' },
      { name: 'twitter:card', content: 'summary' },
    ]);
  });

  it('should include twitter:creator if configured', () => {
    (getConfig as jest.Mock).mockReturnValue({
      twitter: {
        creator: '@testcreator',
      },
    });

    const document = {
      name: 'Test Document',
      description: 'Test Description',
    } as Content;

    const result = getTwitterCard(document);

    expect(result).toEqual([
      { name: 'twitter:title', content: 'Test Document' },
      { name: 'twitter:description', content: 'Test Description' },
      { name: 'twitter:creator', content: '@testcreator' },
      { name: 'twitter:card', content: 'summary' },
    ]);
  });

  it('should include both twitter:site and twitter:creator if configured', () => {
    (getConfig as jest.Mock).mockReturnValue({
      twitter: {
        creator: '@testcreator',
        site: '@testsite',
      },
    });

    const document = {
      name: 'Test Document',
      description: 'Test Description',
    } as Content;

    const result = getTwitterCard(document);

    expect(result).toEqual([
      { name: 'twitter:title', content: 'Test Document' },
      { name: 'twitter:description', content: 'Test Description' },
      { name: 'twitter:site', content: '@testsite' },
      { name: 'twitter:creator', content: '@testcreator' },
      { name: 'twitter:card', content: 'summary' },
    ]);
  });
});
