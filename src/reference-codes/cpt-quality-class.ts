/**
 * QualityClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:cpt:QualityClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Acpt%3AQualityClass
 */

export const CPT_QUALITY_CLASS_CODES: Record<string, string> = {
  klasse1: "Klasse 1 volgens volgens de bij 'sondeernorm' opgegeven norm",
  klasse2: "Klasse 2 volgens volgens de bij 'sondeernorm' opgegeven norm",
  klasse3: "Klasse 3 volgens volgens de bij 'sondeernorm' opgegeven norm",
  klasse4: "Klasse 4 volgens volgens de bij 'sondeernorm' opgegeven norm",
  klasse5: "Klasse 5 volgens volgens de bij 'sondeernorm' opgegeven norm",
  klasse6: "Klasse 6 volgens volgens de bij 'sondeernorm' opgegeven norm",
  klasse7: "Klasse 7 volgens volgens de bij 'sondeernorm' opgegeven norm",
  nvt: "Klassen niet van toepassing (NEN 3680)",
  onbekend: "Klasse onbekend",
};

/**
 * Get the Dutch description for a QualityClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getCptQualityClassDescription(code: string): string | undefined {
  return CPT_QUALITY_CLASS_CODES[code];
}
