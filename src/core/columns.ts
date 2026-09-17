/**
 * `decodeColumns` — decode BRO's column time-series (space-separated rows of
 * comma-delimited columns: settlement steps, triaxial/direct-shear loading
 * stages, the CPT measurement block).
 *
 * A caller declares a typed column spec and gets typed rows back; the −999999 /
 * "NaN" sentinel→null rule lives here. Decodes the *content* of one leaf's CSV
 * text; the {@link columns} producer bridges it into the tree-shaped
 * {@link Producer} DSL.
 */

import { SENTINEL } from "../resolvers/constants.js";
import { parseBoolean } from "../resolvers/type-resolvers.js";
import type { CustomProducer } from "./producer.js";
import { custom } from "./producer.js";

/** Parse one CSV cell into a typed value. */
export type ColumnParser<V> = (raw: string) => V;

/** One column of a CSV time-series. */
export interface ColumnSpec {
  /** Output property name on each row object. */
  name: string;
  /** Cell parser (see {@link col}). */
  parse: ColumnParser<unknown>;
  /**
   * When true, a row missing this (trailing) column is still kept. By default a
   * row with fewer cells than the number of required columns is dropped.
   */
  optional?: boolean;
}

export interface DecodeColumnsOptions {
  /** Row delimiter (default: any run of whitespace). */
  rowSeparator?: string | RegExp;
  /** Column delimiter within a row (default: `,`). */
  colSeparator?: string;
}

/**
 * Standard cell parsers. The −999999 sentinel and the literal "NaN" both decode
 * to `null`.
 */
export const col = {
  /** Decimal number, or `null` for empty / sentinel / NaN. */
  num: (raw: string): number | null => {
    const trimmed = raw.trim();
    if (trimmed === "") {
      return null;
    }
    const n = Number.parseFloat(trimmed);
    return n === SENTINEL || isNaN(n) ? null : n;
  },
  /** Integer, or `null` for empty / sentinel / NaN. */
  int: (raw: string): number | null => {
    const trimmed = raw.trim();
    if (trimmed === "") {
      return null;
    }
    const n = Number.parseInt(trimmed, 10);
    return n === SENTINEL || isNaN(n) ? null : n;
  },
  /** Trimmed string, or `null` when empty. */
  str: (raw: string): string | null => {
    const trimmed = raw.trim();
    return trimmed === "" ? null : trimmed;
  },
  /** Boolean, understanding BRO's `ja`/`nee`. */
  bool: (raw: string): boolean | null => parseBoolean(raw),
};

/**
 * Decode CSV text into typed row objects per a column spec.
 *
 * Rows are split on {@link DecodeColumnsOptions.rowSeparator} (default:
 * whitespace) and cells on {@link DecodeColumnsOptions.colSeparator} (default:
 * `,`). Each column is parsed positionally (a missing trailing cell yields
 * `null`); a `null` entry in `columns` skips that position (for column masks
 * where only some positions are wanted). A row with fewer cells than the number
 * of required (non-`optional`, non-skipped) columns is dropped as malformed.
 */
export function decodeColumns<T>(
  text: string | null | undefined,
  columns: Array<ColumnSpec | null>,
  options: DecodeColumnsOptions = {},
): Array<T> {
  if (!text) {
    return [];
  }
  const trimmed = text.trim();
  if (trimmed === "") {
    return [];
  }

  const rowSeparator = options.rowSeparator ?? /\s+/;
  const colSeparator = options.colSeparator ?? ",";
  const requiredCount = columns.filter((c) => c && !c.optional).length;

  const out: Array<T> = [];
  for (const row of trimmed.split(rowSeparator)) {
    if (row.trim() === "") {
      continue;
    }
    const cells = row.split(colSeparator);
    if (cells.length < requiredCount) {
      continue;
    }
    const record: Record<string, unknown> = {};
    columns.forEach((spec, i) => {
      if (!spec) {
        return;
      }
      const cell = cells[i];
      record[spec.name] = cell === undefined ? null : spec.parse(cell);
    });
    out.push(record as T);
  }
  return out;
}

/**
 * A {@link Producer} that reads the CSV text at `valuesAt` (relative to the
 * enclosing node) and decodes it with {@link decodeColumns}. Yields `[]` when the
 * values element is absent.
 */
export function columns<T>(
  valuesAt: string,
  spec: Array<ColumnSpec | null>,
  options?: DecodeColumnsOptions,
): CustomProducer<Array<T>> {
  return custom<Array<T>>({
    produce: (lens) => decodeColumns<T>(lens.textAt(valuesAt), spec, options),
  });
}
