/**
 * Resolving a {@link Coded} value to its official BRO description.
 *
 * The one decode function. It replaces the former per-field `getXxxDescription`
 * crosswalk: because a {@link Coded} carries the `codeSpace` domain read straight
 * from the instance, the lookup is correct by construction — there is no
 * field-name guessing to get wrong.
 */

import type { Coded } from "../core/producer.js";
import { CODES_BY_DOMAIN } from "./codes-by-domain.js";

/**
 * The official Dutch description for a coded value, or `null` when the value is
 * absent or its `code`/`codeSpace` is unknown.
 *
 * ```ts
 * describe(cpt.qualityClass); // "Klasse 2 volgens ..." | null
 * ```
 */
export function describe(coded: Coded | null | undefined): string | null {
  if (!coded) {
    return null;
  }
  return CODES_BY_DOMAIN[coded.codeSpace]?.[coded.code] ?? null;
}

/**
 * A short human label derived from a BRO code, for the common case where the
 * official description is a full sentence but the UI wants a compact label.
 * Splits the camelCase code into spaced words with a leading capital
 * (`"kleiigZand"` → `"Kleiig zand"`); a runtime concern the app may prefer to own.
 *
 * Codes carrying an acronym (two or more adjacent capitals) or a digit are
 * returned unchanged: lower-casing them would mangle identifiers like
 * `ISO22476D1` or `RTKGPS5tot10cm`.
 */
export function prettifyBroCode(code: string): string {
  if (/[A-Z]{2}|\d/.test(code)) {
    return code;
  }
  const spaced = code.replace(/([a-z])([A-Z])/g, "$1 $2").trim();
  if (!spaced) {
    return code;
  }
  return spaced.charAt(0).toUpperCase() + spaced.slice(1).toLowerCase();
}
