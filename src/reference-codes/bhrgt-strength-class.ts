/**
 * StrengthClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:StrengthClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AStrengthClass
 */

export const BHRGT_STRENGTH_CLASS_CODES: Record<string, string> = {
  matigSterk:
    "Het gesteente kan met een zakmes niet worden geschild of geschraapt. Een gesteentemonster kan worden gebroken met een enkele ferme slag met een geologenhamer. Komt overeen met een uniaxiale druksterkte van 25 tot 50 MPa.",
  sterk:
    "Het gesteente breekt pas na enkele slagen met een geologenhamer. Komt overeen met een uniaxiale druksterkte van 50 tot 100 MPa.",
  uiterstSterk:
    "Met een geologenhamer kunnen alleen fragmenten van het gesteente worden afgeslagen. Komt overeen met een uniaxiale druksterkte groter dan 250 MPa.",
  uiterstZwak:
    "Het gesteente kan met een duimnagel worden ingedrukt. Komt overeen met een uniaxiale druksterkte van 0,6 tot 1 MPa.",
  zeerSterk:
    "Het gesteente breekt na meerdere slagen met een geologenhamer. Komt overeen met een uniaxiale druksterkte van 100 tot 250 MPa.",
  zeerZwak:
    "Het gesteente verkruimelt bij een slag met de punt van een geologenhamer. kan met een zakmes worden geschild. Komt overeen met een uniaxiale druksterkte van 1 tot 5 MPa.",
  zwak: "Het gesteente kan met enige moeite met een zakmes worden geschild. Met de punt van een geologenhamer kunnen er deuken in worden geslagen. Komt overeen met een uniaxiale druksterkte van 5 tot 25 MPa.",
};

/**
 * Get the Dutch description for a StrengthClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtStrengthClassDescription(code: string): string | undefined {
  return BHRGT_STRENGTH_CLASS_CODES[code];
}
