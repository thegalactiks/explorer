import type { Organization, WithContext } from 'schema-dts';
import type { Organization as ContentOrganization } from '../../types/index.mjs';

export const getOrganization = (
  document: ContentOrganization
): WithContext<Organization> => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: document.name,
});
