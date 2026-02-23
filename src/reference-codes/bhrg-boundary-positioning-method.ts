/**
 * BoundaryPositioningMethod codes and descriptions from the official BRO reference.
 *
 * @generated from urn:bro:bhrg:BoundaryPositioningMethod
 * @see https://publiek.broservices.nl/bro/refcodes/v1/codes?domain=urn%3Abro%3Abhrg%3ABoundaryPositioningMethod
 */

export const BHRG_BOUNDARY_POSITIONING_METHOD_CODES: Record<string, string> = {
  afgeleid:
    "De grens is gebaseerd op een verandering die niet waargenomen is in de monsters, maar afgeleid is uit het boorgedrag; het begrip scherpte is niet van toepassing.",
  afgeleidBoorgatlog:
    "De grens is gebaseerd op een verandering die niet waargenomen is in de monsters, maar  afgeleid is uit de boorgatlogging; het begrip scherpte is niet van toepassing.",
  afgeleidSondering:
    "De grens is gebaseerd op een verandering die niet waargenomen is in de monsters, maar afgeleid is uit een sondering die op minder dan 5 meter van de boring vandaan ligt; het begrip scherpte is niet van toepassing.",
  onbekend: "Het is niet bekend op welke manier de grens is bepaald.",
  voorbepaald:
    "De grens is niet gebaseerd op een verandering maar is kunstmatig bepaald; het begrip scherpte is niet van toepassing.",
  waargenomen:
    "De grens is gebaseerd op een verandering die waargenomen is in de monsters. De verandering is niet nader gespecificeerd.",
  waargenomenDiffuus:
    "De grens is gebaseerd op een verandering die waargenomen is in de monsters. De verandering voltrekt zich binnen een bereik dat tussen 30 en 100 mm ligt.",
  waargenomenGeleidelijk:
    "De grens is gebaseerd op een verandering die waargenomen is in de monsters. De verandering voltrekt zich binnen een bereik dat tussen 3 en 30 mm ligt.",
  waargenomenScherp:
    "De grens is gebaseerd op een verandering die waargenomen is in de monsters. De verandering waarop de grens is gebaseerd voltrekt zich binnen een bereik van minder dan 3 mm.",
  waargenomenWillekeurig:
    "De grens is gebaseerd op een verandering die waargenomen is in de monsters, maar de verandering is zo geleidelijk dat de grens op een willekeurige plaats is gelegd.",
};

/**
 * Get the Dutch description for a BoundaryPositioningMethod code.
 *
 * @param code - The code value
 * @returns The Dutch description, or undefined if the code is not recognized
 */
export function getBhrgBoundaryPositioningMethodDescription(code: string): string | undefined {
  return BHRG_BOUNDARY_POSITIONING_METHOD_CODES[code];
}
