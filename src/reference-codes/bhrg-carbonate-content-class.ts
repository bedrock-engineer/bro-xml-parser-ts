/**
 * CarbonateContentClass codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:CarbonateContentClass
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ACarbonateContentClass
 */

export const BHRG_CARBONATE_CONTENT_CLASS_CODES: Record<string, string> = {
  kalkAandeelOnbekend: "Koolzure kalk is aanwezig in de grond, maar het aandeel is niet bekend.",
  kalkarmNEN5104:
    "Geeft hoorbare en niet zichtbare opbruising tot duidelijk hoorbare en met korte opbruising bij het toevoegen van verdund zoutzuur (10 % HCl). Een klasse onder de NEN 5104 procedure.",
  kalkhoudend:
    "Bruist waarneembaar, maar niet aanhoudend op bij het toevoegen van verdund zoutzuur (10 % HCl). Een klasse onder de NEN-EN-ISO 14688 procedure.",
  kalkloos:
    "Bruist niet op bij het toevoegen van verdund zoutzuur (10 % HCl). Een klasse onder de NEN-EN-ISO 14688 procedure.",
  kalkloosNEN5104:
    "Geeft geen zichtbare en geen hoorbare opbruising bij het toevoegen van verdund zoutzuur (10 % HCl). Een klasse onder de NEN 5104 procedure.",
  kalkrijk:
    "Bruist sterk en aanhoudend op bij het toevoegen van verdund zoutzuur (10 % HCl). Een klasse onder de NEN-EN-ISO 14688 procedure.",
  kalkrijkNEN5104:
    "Bruist heftig en langdurig op bij het toevoegen van verdund zoutzuur (10 % HCl). Een klasse onder de NEN 5104 procedure.",
  onbekend: "Het is niet bekend of de grond koolzure kalk bevat.",
  zwakKalkhoudend:
    "Bruist zwak of sporadisch op bij het toevoegen van verdund zoutzuur (10 % HCl). Een klasse onder de NEN-EN-ISO 14688 procedure.",
};

/**
 * Get the Dutch description for a CarbonateContentClass code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgCarbonateContentClassDescription(code: string): string | undefined {
  return BHRG_CARBONATE_CONTENT_CLASS_CODES[code];
}
