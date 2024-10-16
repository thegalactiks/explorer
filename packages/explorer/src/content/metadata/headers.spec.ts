import { getConfig } from '@galactiks/config';
import { Content } from '../../types/index.js';
import { getBasicHeaders } from './headers';

jest.mock('@galactiks/config');

describe('getBasicHeaders', () => {
  beforeAll(() => {
    (getConfig as jest.Mock).mockReturnValue({});
  });

  it('should return correct basic headers', () => {
    const entry = {
      name: 'Test Document',
      description: 'Test Description',
      sameAs: 'http://example.com',
    } as Content;

    const result = getBasicHeaders(entry);

    expect(result).toEqual({
      title: 'Test Document',
      description: 'Test Description',
      canonical: 'http://example.com',
      robots: 'index,follow',
    });
  });

  it('should return correct basic headers when sameAs is not provided', () => {
    const entry = {
      name: 'Test Document',
      description: 'Test Description',
      url: 'http://example.com',
    } as Content;

    const result = getBasicHeaders(entry);

    expect(result).toEqual({
      title: 'Test Document',
      description: 'Test Description',
      canonical: 'http://example.com',
      robots: 'index,follow',
    });
  });
});
