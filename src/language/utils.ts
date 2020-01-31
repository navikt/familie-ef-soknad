export const hentPeriodeTittelMedTall = (
  perioder: any[],
  oppholdsnr: number,
  tittel: string
) => {
  const tall = perioder.length >= 2 ? oppholdsnr + 1 : '';

  return tittel + ' ' + tall;
};
