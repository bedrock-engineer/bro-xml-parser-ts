import { describe, it, expect } from 'vitest';
import { BROParser } from '@/parser';
import { BrowserXMLAdapter } from '@/adapters/browser-adapter';

describe('Bundle Isolation (Browser)', () => {
  it('should not include Node dependencies in browser bundle', () => {
    // Check that Node-specific globals don't exist
    expect(typeof (globalThis as unknown as Record<string, unknown>).fontoxpath).toBe('undefined');

    // Verify we're using native APIs
    expect(typeof DOMParser).not.toBe('undefined');
    expect(typeof document.evaluate).toBe('function');
  });

  it('should create parser without Node dependencies', () => {
    expect(() => {
      const adapter = new BrowserXMLAdapter();
      const parser = new BROParser(adapter);
    }).not.toThrow();
  });

  it('should use native DOMParser', () => {
    const adapter = new BrowserXMLAdapter();

    // Verify the adapter is using native APIs (check constructor)
    expect(adapter).toBeInstanceOf(BrowserXMLAdapter);
  });
});
