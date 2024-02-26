import { createIdentifierFromString } from './utils';

describe('createIdentifierFromString', () => {
  it('should create a valid identifier from a string', () => {
    const input = 'Hello World!';
    const expectedOutput = 'hello-world!';

    const result = createIdentifierFromString(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle special characters and spaces', () => {
    const input = 'This is a Test!';
    const expectedOutput = 'this-is-a-test!';

    const result = createIdentifierFromString(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should handle uppercase characters', () => {
    const input = 'GitHub Copilot';
    const expectedOutput = 'github-copilot';

    const result = createIdentifierFromString(input);

    expect(result).toEqual(expectedOutput);
  });
});
