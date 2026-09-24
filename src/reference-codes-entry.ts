/**
 * Reference codes entry point.
 *
 * Import from this subpath to avoid including lookup tables in your main bundle:
 *
 * ```typescript
 * import { describe } from "@bedrock-engineer/bro-xml-parser/reference-codes";
 * describe(cpt.qualityClass); // domain-correct, from the value's own codeSpace
 * ```
 */
export * from "./reference-codes/index.js";
