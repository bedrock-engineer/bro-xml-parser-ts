// Node-specific test setup
// Ensure peer dependencies are available

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { DOMParser } = await import('@xmldom/xmldom');
  const fontoxpath = await import('fontoxpath');

  // Verify dependencies are loaded
  if (!DOMParser) {
    throw new Error('@xmldom/xmldom is required for Node tests');
  }
  if (!fontoxpath) {
    throw new Error('fontoxpath is required for Node tests');
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  throw new Error(
    `Failed to load Node dependencies: ${message}. ` +
      'Please ensure @xmldom/xmldom and fontoxpath are installed.'
  );
}
