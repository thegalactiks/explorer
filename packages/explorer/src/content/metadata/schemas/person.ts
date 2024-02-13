import type { Person, WithContext } from 'schema-dts';
import type { Person as ContentPerson } from '../../../types';

export const getPerson = (document: ContentPerson): WithContext<Person> => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: document.name,
  url: document.url,
  jobTitle: document.jobTitle,
});
