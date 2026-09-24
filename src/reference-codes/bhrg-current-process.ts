/**
 * CurrentProcess code descriptions from the official BRO reference.
 *
 * Keyed by code; resolve a {@link Coded} value's description with `describe`
 * rather than importing this table directly.
 *
 * @generated from urn:bro:bhrg:CurrentProcess
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ACurrentProcess
 */

export const BHRG_CURRENT_PROCESS_CODES: Record<string, string> = {
  geulverlegging: 'Er komen lateraal migrerende geulen voor.',
  geulvorming: 'Er vindt vorming of verdieping van geulen plaats door uitschuring van de waterbodem.',
  piping: 'Water stroomt onder een dijk of ander grondlichaam door om binnendijks aan het oppervlak te komen.',
  scheurvorming: 'De (kleiige of venige) bovengrond is dermate uitgedroogd dat er scheurvorming optreedt, meestal in een polygoon-patroon.',
  verstuiving: 'Er vindt verstuiving plaats wanneer het hard waait (levend stuifzand).',
};
