/**
 * Type decoder functions for converting XML values to JavaScript types
 */

import { SENTINEL } from "./constants.js";

/**
 * BRO uses two different missing-value conventions depending on the record
 * type: CPT measurement CSVs use the -999999 sentinel, while the BHR-GT-BMA lab
 * value tables (settlement/consolidation time-series) use the literal "NaN".
 * The latter should resolve to null rather than being warned about as a parse
 * error.
 */
function isMissingNumber(value: string): boolean {
  return value.trim().toLowerCase() === "nan";
}

/**
 * Parse float, handle null values and -999999 sentinel
 */
export function parseFloat(value: string | null | undefined): number | null {
  // BRO encodes a missing numeric value as an empty string, the -999999
  // sentinel, or the literal "NaN" (common in embedded measurement CSVs).
  if (!value || value.trim() === "" || value === String(SENTINEL) || isMissingNumber(value)) {
    return null;
  }

  try {
    const num = Number.parseFloat(value);
    if (isNaN(num)) {
      console.warn(`Failed to parse float value: "${value}"`);
      return null;
    }
    return num;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Failed to parse float value: "${value}" - ${message}`);
    return null;
  }
}

export function parseInt(value: string | null | undefined): number | null {
  if (!value || value.trim() === "" || value === String(SENTINEL) || isMissingNumber(value)) {
    return null;
  }

  try {
    const num = Number.parseInt(value, 10);
    if (isNaN(num)) {
      console.warn(`Failed to parse integer value: "${value}"`);
      return null;
    }
    return num;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Failed to parse integer value: "${value}" - ${message}`);
    return null;
  }
}

export function parseBoolean(value: string | null | undefined): boolean | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "ja" || normalized === "true" || normalized === "1") {
    return true;
  }

  if (normalized === "nee" || normalized === "false" || normalized === "0") {
    return false;
  }

  return null;
}

/**
 * BRO temporal lexical forms, ordered most-specific first.
 *   xs:dateTime  YYYY-MM-DDThh:mm:ss(.sss)?(Z|±hh:mm)?
 *   xs:date      YYYY-MM-DD
 *   yearMonth    YYYY-MM
 *   year         YYYY
 */
const BRO_DATE_FORMATS = [
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
  /^\d{4}-\d{2}-\d{2}$/,
  /^\d{4}-\d{2}$/,
  /^\d{4}$/,
];

/**
 * Normalize a BRO temporal value to a precision-preserving ISO 8601 string.
 *
 * BRO date/dateTime elements are a choice of full date (`YYYY-MM-DD`),
 * year-month (`YYYY-MM`), year (`YYYY`), full `dateTime`, or a `voidReason`
 * code (e.g. "onbekend") when the value is unknown. The exact lexical value is
 * returned unchanged so no precision or timezone information is lost;
 * `voidReason` codes and any unrecognized input yield `null`.
 *
 * Timezone handling (per BRO): `dateTime` values carry a mandatory offset, which
 * for Dutch data is the seasonal `+01:00` (winter) / `+02:00` (summer) — never
 * `Z`. BRO derives the calendar date from the *Dutch-local* time, so the
 * intended date is simply the lexical `YYYY-MM-DD` prefix of the string. We keep
 * the string verbatim precisely to avoid a UTC conversion silently shifting the
 * date across midnight (BRO's own worked example of the pitfall). Consumers can
 * build a `Date`/`Temporal` when needed, but beware: `new Date("YYYY-MM-DD")` on
 * a date-only value is parsed as UTC midnight and can render as the previous day
 * in negative-offset zones — treat date-only values as plain calendar dates.
 * @see https://www.bro-productomgeving.nl/bpo/release-2.5_2024_Q4/informatie-voor-softwareleveranciers/het-afhandelen-van-tijdstippen
 *
 * Unlike the numeric decoders this does not warn on non-matching input,
 * because `voidReason` is a legitimate and common value in archive data.
 */
export function parseDate(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (trimmed === "") {
    return null;
  }

  if (BRO_DATE_FORMATS.some((format) => format.test(trimmed))) {
    return trimmed;
  }

  return null;
}

/**
 * Parse quality class (handles "klasse2" or "2" format)
 */
export function parseQualityClass(value: string | null): number | null {
  if (!value) {
    return null;
  }

  // Handle "klasse2" format
  const regex = /klasse(\d+)/i;
  const match = regex.exec(value);
  if (match?.[1]) {
    return Number.parseInt(match[1], 10);
  }

  // Handle plain number
  return parseInt(value);
}
