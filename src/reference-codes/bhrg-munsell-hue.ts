// TODO. This info is not particularly helpful, a munsell color library would be helpful

/**
 * MunsellHue codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:MunsellHue
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3AMunsellHue
 */

export const BHRG_MUNSELL_HUE_CODES: Record<string, string> = {
  "10B": "De waarde van de hoofdkleur is 10B. De B staat voor de kleur blauw (Blue).",
  "10BG": "De waarde van de hoofdkleur is 10BG. Dit staat voor de kleur blauw groen (Blue Green).",
  "10G": "De waarde van de hoofdkleur is 10G. Dit staat voor de kleur groen (Green).",
  "10GY": "De waarde van de hoofdkleur is 10GY. Dit staat voor de kleur groen geel (Green Yellow).",
  "10R": "De waarde van de hoofdkleur is 10R. Dit staat voor de kleur rood (Red).",
  "10Y": "De waarde van de hoofdkleur is 10Y. Dit staat voor de kleur geel (Yellow).",
  "10YR":
    "De waarde van de hoofdkleur is 10YR. Dit staat voor de hoofdkleur geel rood (Yellow Red).",
  "2.5Y": "De waarde van de hoofdkleur is 2,5Y. Dit staat voor de kleur geel (Yellow).",
  "2.5YR":
    "De waarde van de hoofdkleur is 2,5YR. Dit staat voor de hoofdkleur geel rood (Yellow Red).",
  "5B": "De waarde van de hoofdkleur is 5B. De B staat voor de kleur blauw (Blue).",
  "5BG": "De waarde van de hoofdkleur is 5BG. Dit staat voor de kleur blauw groen (Blue Green).",
  "5G": "De waarde van de hoofdkleur is 5G. Dit staat voor de kleur groen (Green).",
  "5GY": "De waarde van de hoofdkleur is 5GY. Dit staat voor de kleur groen geel (Green Yellow).",
  "5P": "De waarde van de hoofdkleur is P. De P staat voor de kleur paars (Purple).",
  "5PB": "De waarde van de hoofdkleur is 5PB. Dit staat voor kleur paars blauw (Purple Blue).",
  "5R": "De waarde van de hoofdkleur is 5R. Dit staat voor de kleur rood (Red).",
  "5RP": "De waarde van de hoofdkleur is 5RP. De RP staat voor de kleur rood (RedPurple).",
  "5Y": "De waarde van de hoofdkleur is 5Y. Dit staat voor de kleur geel (Yellow).",
  "5YR": "De waarde van de hoofdkleur is 5YR. Dit staat voor de hoofdkleur geel rood (Yellow Red).",
  "7.5R": "De waarde van de hoofdkleur is 7,5R. Dit staat voor de kleur rood (Red).",
  "7.5YR":
    "De waarde van de hoofdkleur is 7,5YR. Dit staat voor de hoofdkleur geel rood (Yellow Red).",
  N: "De waarde van de hoofdkleur is N. Dit staat voor de kleur neutraal (Neutral).",
};

/**
 * Get the Dutch description for a MunsellHue code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgMunsellHueDescription(code: string): string | undefined {
  return BHRG_MUNSELL_HUE_CODES[code];
}
