import { IDokumentasjon } from '../models/dokumentasjon';
import { ISvar } from '../models/spørsmålogsvar';

export const hentDokumentasjonTilFlersvarSpørsmål = (
  erHuketAv: boolean | undefined,
  dokumentasjonsbehov: IDokumentasjon[],
  valgtSvar: ISvar
) => {
  let endretDokumentasjonsbehov = [];
  if (erHuketAv) {
    endretDokumentasjonsbehov = dokumentasjonsbehov.filter(
      (behov) => behov.svarid !== valgtSvar.id
    );
  } else {
    valgtSvar.dokumentasjonsbehov &&
      endretDokumentasjonsbehov.push(valgtSvar?.dokumentasjonsbehov);
  }
  return endretDokumentasjonsbehov;
};
