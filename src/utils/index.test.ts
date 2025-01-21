import { initDsfr, richTextParser } from './index';

describe('utils/index', () => {
  it('should export initDsfr function', () => {
    expect(initDsfr).toBeDefined();
    expect(typeof initDsfr).toBe('function');
  });

  it('should export richTextParser function', () => {
    expect(richTextParser).toBeDefined();
    expect(typeof richTextParser).toBe('function');
  });

  it('richTextParser should be a default export from richTextParser module', () => {
    const result = richTextParser('test');
    expect(result).toBeDefined();
  });
});
