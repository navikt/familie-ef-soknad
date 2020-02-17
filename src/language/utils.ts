export const hentTittelMedNr = (
  nummer: any[],
  oppholdsnr: number,
  tittel: string
) => {
  const tall = nummer.length >= 2 ? oppholdsnr + 1 : '';

  return tittel + ' ' + tall;
};
