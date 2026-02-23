/**
 * OrganicSoilTexture codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:OrganicSoilTexture
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3AOrganicSoilTexture
 */

export const BHRGT_ORGANIC_SOIL_TEXTURE_CODES: Record<string, string> = {
  amorf:
    "Geen zichtbare plantaardige structuur, sponsachtige consistentie. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  matigAmorfNEN5104:
    "Matig vergane plantenresten, de structuur is nog zichtbaar. Bij handpersen glijdt veel van het veen tussen de vingers door en het uitgeknepen water is troebel. Een klasse onder de NEN 5104 procedure.",
  pseudoVezelig:
    "Mengsel van vezels en amorfe massa. Er is geen onderscheid gemaakt tussen fijne en grove vezels (fijnVezelig en grofVezelig). Een klasse onder de NEN-EN-ISO 14688 procedure.",
  pseudoVezeligFijn:
    "Mengsel van vezels met een lengte kleiner dan 1 mm en amorfe massa. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  pseudoVezeligGrof:
    "Mengsel van vezels met een lengte of diameter groter dan 1 mm en amorfe massa. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  sterkAmorfNEN5104:
    "Zeer sterk vergane plantenresten, structuur ontbreekt geheel. Bij handpersen glijdt het grootste deel van het veen tussen de vingers door. Een klasse onder de NEN 5104 procedure.",
  vezelig:
    "Vezelige structuur, eenvoudig te herkennen plantaardige structuur, behoudt enige sterkte. Er is geen onderscheid gemaakt tussen fijne en grove vezels (fijnVezelig en grofVezelig). Een klasse onder de NEN-EN-ISO 14688 procedure.",
  vezeligFijn:
    "Vezelige structuur, vezels met een lengte kleiner dan 1 mm, eenvoudig te herkennen plantaardige structuur, behoudt enige sterkte. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  vezeligGrof:
    "Vezelige structuur, vezels met een lengte of diameter groter dan 1 mm, eenvoudig te herkennen plantaardige structuur, behoudt enige sterkte. Een klasse onder de NEN-EN-ISO 14688 procedure.",
  zwakAmorfNEN5104:
    "Niet tot zwak vergane plantenresten. Bij handpersen ontwijkt geen veen tussen de vingers en het uitgeperste water is kleurloos tot troebel. Een klasse onder de NEN 5104 procedure.",
};

/**
 * Get the Dutch description for a OrganicSoilTexture code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtOrganicSoilTextureDescription(code: string): string | undefined {
  return BHRGT_ORGANIC_SOIL_TEXTURE_CODES[code];
}
