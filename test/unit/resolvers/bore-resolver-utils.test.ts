import { describe, it, expect, beforeEach } from 'vitest';
import {
  createNamespaceResolver,
  getTextContent,
  createXPathTextGetter,
  findChildElement,
  extractArray,
  parseCSVPairs,
  type Namespaces
} from '@/resolvers/bore-resolver-utils';

describe('bore-resolver-utils', () => {
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

  describe('findChildElement', () => {
    it('should find child element using XPath', () => {
      const mockParent = {} as Node;
      const mockChild = { textContent: 'child' } as Node;

      const mockAdapter = {
        evaluateXPath: (node: Node, xpath: string, resolver: Function) => {
          expect(node).toBe(mockParent);
          expect(xpath).toBe('./child');
          expect(typeof resolver).toBe('function');
          return mockChild;
        }
      };

      const result = findChildElement(mockParent, './child', mockAdapter, mockNamespaces);

      expect(result).toBe(mockChild);
    });

    it('should return null when child not found', () => {
      const mockParent = {} as Node;

      const mockAdapter = {
        evaluateXPath: () => null
      };

      const result = findChildElement(mockParent, './nonexistent', mockAdapter, mockNamespaces);

      expect(result).toBeNull();
    });
  });

  describe('extractArray', () => {
    it('should extract and map array elements from XPath results', () => {
      const mockContext = {} as Node;
      const mockNodes = [
        { textContent: '10.5' },
        { textContent: '20.3' },
        { textContent: '30.7' }
      ] as Node[];

      const mockAdapter = {
        evaluateXPathAll: (node: Node, xpath: string, resolver: Function) => {
          expect(node).toBe(mockContext);
          expect(xpath).toBe('./values');
          expect(typeof resolver).toBe('function');
          return mockNodes;
        },
        evaluateXPath: (node: Node, xpath: string) => {
          // Return the node itself for getText to work
          return node;
        }
      };

      const result = extractArray(
        mockContext,
        './values',
        (node, getText) => {
          const text = node.textContent;
          return text ? parseFloat(text) : null;
        },
        mockAdapter,
        mockNamespaces
      );

      expect(result).toEqual([10.5, 20.3, 30.7]);
    });

    it('should filter out null results', () => {
      const mockContext = {} as Node;
      const mockNodes = [
        { textContent: '10.5' },
        { textContent: 'invalid' },
        { textContent: '30.7' }
      ] as Node[];

      const mockAdapter = {
        evaluateXPathAll: () => mockNodes,
        evaluateXPath: (node: Node) => node
      };

      const result = extractArray(
        mockContext,
        './values',
        (node) => {
          const text = node.textContent;
          if (!text) return null;
          const num = parseFloat(text);
          return isNaN(num) ? null : num;
        },
        mockAdapter,
        mockNamespaces
      );

      expect(result).toEqual([10.5, 30.7]);
    });

    it('should return empty array when no nodes found', () => {
      const mockContext = {} as Node;

      const mockAdapter = {
        evaluateXPathAll: () => [],
        evaluateXPath: () => null
      };

      const result = extractArray(
        mockContext,
        './nonexistent',
        (node) => node,
        mockAdapter,
        mockNamespaces
      );

      expect(result).toEqual([]);
    });

    it('should provide getText helper to map function', () => {
      const mockContext = {} as Node;
      const mockNode = {} as Node;
      const mockValueNode = { textContent: 'test value' } as Node;

      const mockAdapter = {
        evaluateXPathAll: () => [mockNode],
        evaluateXPath: (node: Node, xpath: string) => {
          if (xpath === './value') return mockValueNode;
          return null;
        }
      };

      const result = extractArray(
        mockContext,
        './items',
        (node, getText) => {
          const value = getText('./value');
          return value ? { data: value } : null;
        },
        mockAdapter,
        mockNamespaces
      );

      expect(result).toEqual([{ data: 'test value' }]);
    });
  });

  describe('parseCSVPairs', () => {
    it('should parse space-separated comma-delimited pairs', () => {
      const csvText = '0.0,1.5 1.0,2.3 2.0,3.7';

      const result = parseCSVPairs(csvText, (key, value) => ({
        x: parseFloat(key),
        y: parseFloat(value)
      }));

      expect(result).toEqual([
        { x: 0.0, y: 1.5 },
        { x: 1.0, y: 2.3 },
        { x: 2.0, y: 3.7 }
      ]);
    });

    it('should filter out invalid pairs', () => {
      const csvText = '0.0,1.5 invalid,data 2.0,3.7';

      const result = parseCSVPairs(csvText, (key, value) => {
        const x = parseFloat(key);
        const y = parseFloat(value);
        return !isNaN(x) && !isNaN(y) ? { x, y } : null;
      });

      expect(result).toEqual([
        { x: 0.0, y: 1.5 },
        { x: 2.0, y: 3.7 }
      ]);
    });

    it('should handle empty or null input', () => {
      expect(parseCSVPairs(null, (k, v) => ({ k, v }))).toEqual([]);
      expect(parseCSVPairs(undefined, (k, v) => ({ k, v }))).toEqual([]);
      expect(parseCSVPairs('', (k, v) => ({ k, v }))).toEqual([]);
      expect(parseCSVPairs('   ', (k, v) => ({ k, v }))).toEqual([]);
    });

    it('should skip malformed pairs (missing comma)', () => {
      const csvText = '0.0,1.5 badpair 2.0,3.7';

      const result = parseCSVPairs(csvText, (key, value) => ({
        x: parseFloat(key),
        y: parseFloat(value)
      }));

      expect(result).toEqual([
        { x: 0.0, y: 1.5 },
        { x: 2.0, y: 3.7 }
      ]);
    });

    it('should handle whitespace variations', () => {
      const csvText = '  0.0,1.5   1.0,2.3  \n  2.0,3.7  ';

      const result = parseCSVPairs(csvText, (key, value) => ({
        x: parseFloat(key),
        y: parseFloat(value)
      }));

      expect(result).toEqual([
        { x: 0.0, y: 1.5 },
        { x: 1.0, y: 2.3 },
        { x: 2.0, y: 3.7 }
      ]);
    });

    it('should support custom parsing logic', () => {
      const csvText = '10,active 20,inactive 30,active';

      const result = parseCSVPairs(csvText, (key, value) => ({
        id: parseInt(key, 10),
        isActive: value === 'active'
      }));

      expect(result).toEqual([
        { id: 10, isActive: true },
        { id: 20, isActive: false },
        { id: 30, isActive: true }
      ]);
    });

    it('should handle single pair', () => {
      const csvText = '5.0,10.0';

      const result = parseCSVPairs(csvText, (key, value) => ({
        x: parseFloat(key),
        y: parseFloat(value)
      }));

      expect(result).toEqual([{ x: 5.0, y: 10.0 }]);
    });
  });
});
