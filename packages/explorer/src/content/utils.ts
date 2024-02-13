import slugify from 'slugify';

export const createIdentifierFromString = (s: string) =>
  slugify(s, { lower: true, trim: true });
