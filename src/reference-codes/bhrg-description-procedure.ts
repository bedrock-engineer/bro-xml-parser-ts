/**
 * DescriptionProcedure codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:DescriptionProcedure
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ADescriptionProcedure
 */

export const BHRG_DESCRIPTION_PROCEDURE_CODES: Record<string, string> = {
  GDN_SBB4v1995:
    "Standaard Boor Beschrijvingsmethode 4 uit 1995. Een door een voorganger van de Geologische Dienst Nederland vastgestelde procedure voor de beschrijving van boormonsters. Hieronder vallen ook voorgaande versies vanaf 1990.",
  "GDN_SBB5.1v2000":
    "Standaard Boor Beschrijvingsmethode 5.1 uit 2000. Een door een voorganger van de Geologische Dienst Nederland vastgestelde procedure voor de beschrijving van boormonsters.",
  "GDN_SBB5.2v2005":
    "Standaard Boor Beschrijvingsmethode 5.2 uit 2005. Een door een voorganger van de Geologische Dienst Nederland vastgestelde procedure voor de beschrijving van boormonsters.",
  "GDN_SBB5.3v2008":
    "Standaard Boor Beschrijvingsmethode 5.3 uit 2008. Een door een voorganger van de Geologische Dienst Nederland vastgestelde procedure voor de beschrijving van boormonsters.",
  GDN_SBB5v1999:
    "Standaard Boor Beschrijvingsmethode 5 uit 1999. Een door een voorganger van de Geologische Dienst Nederland vastgestelde procedure voor de beschrijving van boormonsters.",
  GDN_SBB6v2022:
    "Standaard Boor Beschrijvingsmethode 6 versie 2020. Een door de Geologische Dienst Nederland vastgestelde procedure voor de beschrijving van boormonsters.",
  NEN5104plusOnbekend:
    "NEN 5104 Geotechniek Classificatie van onverharde grondmonsters uit 1989 beschrijft de procedure voor het beschrijven van grondmonsters voor geotechniek. De grond is geclassificeerd volgens NEN 5104. Wanneer de grond niet geclassificeerd kan worden is het bijzonder materiaal. Er zijn eventueel extra aspecten beschreven die geen onderdeel uitmaken van de procedure, het is niet bekend volgens welke procedure deze aspecten zijn beschreven. De NEN 5104 kent geen strikt onderscheid tussen beschrijven, analyseren en interpreteren en daardoor kan het resultaat een synthetisch karakter hebben.",
  "SIKB_ASB1.1v2008":
    "Archeologische Standaard Boorbeschrijvingsmethode versie 1.1 uit 2008. Op basis van de Standaard Boor Beschrijvingsmethode versie 5.2. Een in opdracht van het SIKB vastgestelde procedure voor de beschrijving van boormonsters. Hieronder vallen ook voorgaande versies vanaf 2005.",
};

/**
 * Get the Dutch description for a DescriptionProcedure code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgDescriptionProcedureDescription(code: string): string | undefined {
  return BHRG_DESCRIPTION_PROCEDURE_CODES[code];
}
