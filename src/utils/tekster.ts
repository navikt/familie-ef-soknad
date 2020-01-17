export const hentPeriodeTittelMedTall = (
  perioder: any[],
  periodenr: number,
  tittel: string
) => {
  const tall = perioder.length >= 2 ? periodenr + 1 : '';

  return tittel + ' ' + tall;
};
