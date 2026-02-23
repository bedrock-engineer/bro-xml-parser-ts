/**
 * RockType codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:RockType
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ARockType
 */

export const BHRGT_ROCK_TYPE_CODES: Record<string, string> = {
  breccie:
    "Het gesteente bestaat voor meer dan 50% uit grove, hoekige korrels met een mediaan groter dan 2 mm.",
  conglomeraat:
    "Het gesteente bestaat voor meer dan 50% uit grove, afgeronde korrels met een mediaan groter dan 2 mm.",
  conglomeraatFijneMatrix:
    "Het gesteente bestaat uit grove, afgeronde korrels die elkaar raken met daartussen fijnkorrelig materiaal. De mediaan van de grove fractie is groter dan 2 mm.",
  conglomeraatZandig:
    "Het gesteente bestaat uit grove, afgeronde korrels die elkaar raken met daartussen fijner grofkorrelig materiaal. De mediaan van de grove fractie is groter dan 2 mm en de mediaan van de fijnere fractie ligt tussen 0,063 en 2 mm.",
  dolomiet: "Het gesteente bestaat voor meer dan 95% uit calcium-magnesiumcarbonaat.",
  gips: "Het gesteente bestaat voor meer dan 95% uit calciumsulfaat.",
  kalksteenFijnkorrelig:
    "Het gesteente bestaat voor meer dan 50% uit korrels van koolzure kalk waarvan de mediaan kleiner is dan 0,063 mm. ",
  kalksteenGrofkorrelig:
    "Het gesteente bestaat voor meer dan 50% uit korrels van koolzure kalk waarvan de mediaan tussen 0,063 en 2 mm ligt.",
  kalksteenHardsteen:
    "Het gesteente bestaat voor meer dan 50% uit koolzure kalk en korrels zijn niet (meer) herkenbaar.",
  kleisteen:
    "Het gesteente bestaat uit siliciklastisch materiaal waarvan de korrels niet met een loep zichtbaar zijn en een mes niet krassen.",
  kleisteenZandig:
    "Het gesteente bestaat voor 50-95% uit siliciklastisch materiaal waarvan de korrels niet met een loep zichtbaar zijn en een mes niet krassen, met daarin grovere deeltjes met een mediaan die tussen de 0,063 en 2 mm ligt. ",
  mergel:
    "Fijn- of grofkorrelige kalksteen die voor meer dan 95% uit koolzure kalk bestaat, in Limburg voorkomt en waarin veel resten van fossielen te zien zijn.",
  mergelKleiig:
    "Een mengsel dat voor 50 tot 95% uit mergel bestaat en voor het overige uit niet-kalkig materiaal, waarvan de korrels niet met een loep zichtbaar zijn en een mes niet krassen.",
  mergelSiltig:
    "Een mengsel dat voor 50 tot 95% uit mergel bestaat en voor het overige uit niet-kalkig materiaal, waarvan de korrels niet met een loupe zichtbaar zijn en een mes krassen of knarsen tussen de tanden. ",
  mergelZandig:
    "Een mengsel dat voor 50 tot 95% uit mergel bestaat en voor het overige uit niet-kalkig materiaal, waarvan de korrels een mediaan tussen de 0,063 en 2 mm hebben. ",
  siltsteen:
    "Het gesteente bestaat uit siliciklastisch materiaal en dat bestaat voor meer dan 95 % uit korrels die kleiner zijn dan 0,063 mm en die een mes krassen of tussen de tanden knarsen.",
  siltsteenZandig:
    "Het gesteente bestaat uit siliciklastisch materiaal en dat bestaat voor 50-95% uit korrels die kleiner zijn dan 0,063 mm en die een mes krassen en verder uit grovere korrels waarvan de mediaan tussen de 0,063 en 2 mm ligt; de grovere korrels raken elkaar niet.",
  steenkool: "Het gesteente bestaat uit zwart, amorf organisch materiaal.",
  steenzout: "Het gesteente bestaat uit kristallijn zout.",
  vuursteen: "Het gesteente bestaat uit microkristallijne, opake kwarts.",
  zandsteen:
    "Het gesteente bestaat uit siliciklastisch materiaal en dat bestaat voor meer dan 95% uit kwartskorrels met een mediaan die tussen 0,063 en 2 mm ligt.",
  zandsteenKleiig:
    "Het gesteente bestaat uit siliciklastisch materiaal en dat bestaat voor 50 tot 95% uit kwartskorrels met een mediaan die tussen 0,063 en 2 mm ligt en voor het overige uit materiaal, waarvan de korrels niet met een loep zichtbaar zijn en die een mes niet krassen.",
  zandsteenKwartsietisch:
    "Het gesteente bestaat uit kwartskorrels met een mediaan groter dan 0,063 mm en verder alleen uit kwarts cement. Bij doorslaan loopt de breuk veelal door de kwartskorrels heen.",
  zandsteenSiltig:
    "Het gesteente bestaat uit siliciklastisch materiaal en bestaat voor 50 tot 95% uit kwartskorrels met een mediaan die tussen 0,063 en 2 mm ligt en voor het overige uit materiaal, waarvan de korrels niet met een loep zichtbaar zijn en een mes krassen.",
};

/**
 * Get the Dutch description for a RockType code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtRockTypeDescription(code: string): string | undefined {
  return BHRGT_ROCK_TYPE_CODES[code];
}
