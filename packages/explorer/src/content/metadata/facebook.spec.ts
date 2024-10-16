import { getFacebookObjects } from './facebook';
import { getConfig } from '@galactiks/config';

jest.mock('@galactiks/config');

describe('getFacebookObjects', () => {
  it('should return an empty array if facebook config is not present', () => {
    (getConfig as jest.Mock).mockReturnValue({});

    const result = getFacebookObjects();

    expect(result).toEqual([]);
  });

  it('should return an array with fb:app_id if facebook appId is present', () => {
    const mockAppId = '1234567890';
    (getConfig as jest.Mock).mockReturnValue({
      facebook: { appId: mockAppId },
    });

    const result = getFacebookObjects();

    expect(result).toEqual([{ property: 'fb:app_id', content: mockAppId }]);
  });

  it('should return an empty array if facebook config is present but appId is not', () => {
    (getConfig as jest.Mock).mockReturnValue({ facebook: {} });

    const result = getFacebookObjects();

    expect(result).toEqual([]);
  });
});
