import { describe, it, expect } from 'vitest';
import {
  createNamespaceResolver,
  getTextContent,
  createXPathTextGetter,
} from '@/resolvers/registration-history';
import type { Namespaces } from '@/types';

describe('registration-history', () => {
  const mockNamespaces: Namespaces = {
    bhrgtcom: 'http://www.broservices.nl/xsd/bhrgtcommon/2.1',
    brocom: 'http://www.broservices.nl/xsd/brocommon/3.0',
    gml: 'http://www.opengis.net/gml/3.2'
  };

  describe('createNamespaceResolver', () => {
    it('should create a resolver that returns namespace URI for known prefixes', () => {
      const resolver = createNamespaceResolver(mockNamespaces);

      expect(resolver('bhrgtcom')).toBe('http://www.broservices.nl/xsd/bhrgtcommon/2.1');
      expect(resolver('brocom')).toBe('http://www.broservices.nl/xsd/brocommon/3.0');
      expect(resolver('gml')).toBe('http://www.opengis.net/gml/3.2');
    });

    it('should return null for unknown prefixes', () => {
      const resolver = createNamespaceResolver(mockNamespaces);

      expect(resolver('unknown')).toBeNull();
      expect(resolver('')).toBeNull();
    });

    it('should return null for null prefix', () => {
      const resolver = createNamespaceResolver(mockNamespaces);

      expect(resolver(null)).toBeNull();
    });

    it('should create independent resolvers', () => {
      const resolver1 = createNamespaceResolver(mockNamespaces);
      const resolver2 = createNamespaceResolver({ custom: 'http://custom.com' });

      expect(resolver1('bhrgtcom')).toBe('http://www.broservices.nl/xsd/bhrgtcommon/2.1');
      expect(resolver2('custom')).toBe('http://custom.com');
      expect(resolver2('bhrgtcom')).toBeNull();
    });
  });

  describe('getTextContent', () => {
    it('should return trimmed text content from node', () => {
      const mockNode = {
        textContent: '  some text  '
      } as Node;

      expect(getTextContent(mockNode)).toBe('some text');
    });

    it('should return null for node with empty text', () => {
      const mockNode = {
        textContent: '   '
      } as Node;

      expect(getTextContent(mockNode)).toBeNull();
    });

    it('should return null for node with null textContent', () => {
      const mockNode = {
        textContent: null
      } as Node;

      expect(getTextContent(mockNode)).toBeNull();
    });

    it('should return null for null node', () => {
      expect(getTextContent(null)).toBeNull();
    });

    it('should handle nodes with only whitespace', () => {
      const mockNode = {
        textContent: '\n\t  \n'
      } as Node;

      expect(getTextContent(mockNode)).toBeNull();
    });
  });

  describe('createXPathTextGetter', () => {
    it('should create a function that gets text from XPath expressions', () => {
      const mockNode = {} as Node;
      const mockTargetNode = {
        textContent: '  test value  '
      } as Node;

      const mockAdapter = {
        evaluateXPath: (node: Node, xpath: string, resolver: Function) => {
          expect(node).toBe(mockNode);
          expect(xpath).toBe('./test');
          expect(typeof resolver).toBe('function');
          return mockTargetNode;
        }
      };

      const getText = createXPathTextGetter(mockNode, mockAdapter, mockNamespaces);

      expect(getText('./test')).toBe('test value');
    });

    it('should return null when XPath finds no node', () => {
      const mockNode = {} as Node;

      const mockAdapter = {
        evaluateXPath: () => null
      };

      const getText = createXPathTextGetter(mockNode, mockAdapter, mockNamespaces);

      expect(getText('./nonexistent')).toBeNull();
    });

    it('should handle multiple XPath queries with same getter', () => {
      const mockNode = {} as Node;
      const results = {
        './path1': { textContent: 'value1' },
        './path2': { textContent: 'value2' },
        './path3': null
      };

      const mockAdapter = {
        evaluateXPath: (_: Node, xpath: string) => results[xpath as keyof typeof results] || null
      };

      const getText = createXPathTextGetter(mockNode, mockAdapter, mockNamespaces);

      expect(getText('./path1')).toBe('value1');
      expect(getText('./path2')).toBe('value2');
      expect(getText('./path3')).toBeNull();
    });
  });

});
