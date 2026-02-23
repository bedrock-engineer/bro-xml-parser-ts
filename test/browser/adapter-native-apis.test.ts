import { describe, it, expect } from 'vitest';
import { BrowserXMLAdapter } from '@/adapters/browser-adapter';

describe('Browser Adapter Native APIs', () => {
  it('should use native DOMParser for XML parsing', () => {
    const adapter = new BrowserXMLAdapter();
    const xml = '<root><test>value</test></root>';

    const doc = adapter.parseXML(xml);

    expect(doc).toBeInstanceOf(Document);
    expect(doc.querySelector('test')?.textContent).toBe('value');
  });

  it('should use native XPath evaluation', () => {
    const adapter = new BrowserXMLAdapter();
    const xml =
      '<root xmlns:test="http://test.ns"><test:item>value</test:item></root>';

    const doc = adapter.parseXML(xml);
    const node = adapter.evaluateXPath(
      doc,
      '//test:item',
      (prefix) => (prefix === 'test' ? 'http://test.ns' : null)
    );

    expect(node).not.toBeNull();
    expect(node?.textContent).toBe('value');
  });

  it('should handle XPath errors gracefully', () => {
    const adapter = new BrowserXMLAdapter();
    const xml = '<root></root>';
    const doc = adapter.parseXML(xml);

    const node = adapter.evaluateXPath(doc, '//nonexistent', () => null);
    expect(node).toBeNull();
  });
});
