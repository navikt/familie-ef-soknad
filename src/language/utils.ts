export const hentTittelMedNr = (
  liste: any[],
  oppholdsnr: number,
  tittel: string
) => {
  const tall = liste.length >= 2 ? oppholdsnr + 1 : '';

  return tittel + ' ' + tall;
};
