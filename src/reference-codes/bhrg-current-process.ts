/**
 * CurrentProcess codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:CurrentProcess
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ACurrentProcess
 */

export const BHRG_CURRENT_PROCESS_CODES: Record<string, string> = {
  geulverlegging: "Er komen lateraal migrerende geulen voor.",
  geulvorming:
    "Er vindt vorming of verdieping van geulen plaats door uitschuring van de waterbodem.",
  piping:
    "Water stroomt onder een dijk of ander grondlichaam door om binnendijks aan het oppervlak te komen.",
  scheurvorming:
    "De (kleiige of venige) bovengrond is dermate uitgedroogd dat er scheurvorming optreedt, meestal in een polygoon-patroon.",
  verstuiving: "Er vindt verstuiving plaats wanneer het hard waait (levend stuifzand).",
};

/**
 * Get the Dutch description for a CurrentProcess code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgCurrentProcessDescription(code: string): string | undefined {
  return BHRG_CURRENT_PROCESS_CODES[code];
}
