import { getConfig } from '@galactiks/config';
import type { MetadataHeaders } from '../../types/index.js';

export const getFacebookObjects = (): MetadataHeaders['facebook'] => {
  const { facebook } = getConfig();
  const headers = [];
  if (facebook?.appId) {
    headers.push({ property: 'fb:app_id', content: facebook.appId });
  }

  return headers;
};
