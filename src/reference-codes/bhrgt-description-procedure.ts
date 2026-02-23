/**
 * DescriptionProcedure codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrgt:DescriptionProcedure
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrgt%3ADescriptionProcedure
 */

export const BHRGT_DESCRIPTION_PROCEDURE_CODES: Record<string, string> = {
  ISO14688d1v2019c2020:
    "NEN-EN-ISO 14688-1:2019+C:2020 Geotechnisch onderzoek en beproeving – Identificatie en classificatie van grond – Deel1: Identificatie en beschrijving (incl. Nederlandse bijlage:2019). Een door de NEN voor Nederland vastgestelde norm t.b.v. het identificeren van onverharde grondmonsters voor geotechniek gebaseerd op de ISO norm. De norm is vastgesteld in september 2013 en is de vervanger voor de NEN 5104. De versie uit 2019 is een herziening. In 2020 zijn correcties opgenomen.",
  ISO14688d1v2019NEN8990v2020:
    "NEN-EN-ISO 14688-1:2019 Geotechnisch onderzoek en beproeving ? Identificatie en classificatie van grond ? Deel1: Identificatie en beschrijving + NEN 8990:2020 Geotechnisch onderzoek en beproeving - Identificatie en classificatie van grond - Nederlandse aanvulling op NEN-EN-ISO 14688-1 beschrijft de procedure voor het beschrijven van grondmonsters voor geotechniek. Een internationale norm geaccepteerd door Europa en vertaalt in het Nederlands met een Nederlandse aanvulling.",
  ISO14689d1v2018:
    "NEN-EN-ISO 14689-1 versie 2018. Geotechnisch onderzoek en beproeving - Identificatie en classificatie van gesteente - Deel 1: Identificatie en beschrijving. Een internationale norm geaccepteerd door Europa en Nederland.",
  NEN5104Synthetisch:
    "De grond is geclassificeerd volgens NEN 5104 en die norm vormt de basis van de procedure. Wanneer de grond niet geclassificeerd kan worden is het bijzonder materiaal. De procedure kent geen strikt onderscheid tussen beschrijven, analyseren en interpreteren en daardoor kan het resultaat een synthetisch karakter hebben.",
};

/**
 * Get the Dutch description for a DescriptionProcedure code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgtDescriptionProcedureDescription(code: string): string | undefined {
  return BHRGT_DESCRIPTION_PROCEDURE_CODES[code];
}
