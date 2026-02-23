// Browser-specific test setup
// Verify native APIs are available

if (typeof DOMParser === 'undefined') {
  throw new Error('DOMParser is not available in browser environment');
}

if (typeof document === 'undefined' || typeof document.evaluate !== 'function') {
  throw new Error('Native XPath (document.evaluate) is not available');
}

// Ensure no Node dependencies leaked
if (typeof process !== 'undefined' && (process as NodeJS.Process).versions?.node) {
  console.warn('Warning: process object detected in browser tests');
}
