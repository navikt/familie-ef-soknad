import { IDokumentasjon } from '../models/dokumentasjon';
import { ISpørsmål, ISvar } from '../models/spørsmålogsvar';

export const hentDokumentasjonTilFlersvarSpørsmål = (
  erHuketAv: boolean | undefined,
  dokumentasjonsbehov: IDokumentasjon[],
  valgtSvar: ISvar
) => {
  let endretDokumentasjonsbehov = dokumentasjonsbehov;
  if (erHuketAv === true) {
    endretDokumentasjonsbehov = dokumentasjonsbehov.filter(
      (behov) => behov.svarid !== valgtSvar.id
    );
  } else if (erHuketAv === false) {
    valgtSvar.dokumentasjonsbehov &&
      endretDokumentasjonsbehov.push(valgtSvar.dokumentasjonsbehov);
  } else {
    endretDokumentasjonsbehov = dokumentasjonsbehov;
  }
  return endretDokumentasjonsbehov;
};

export const oppdaterDokumentasjonTilEtSvarSpørsmål = (
  dokumentasjonsbehov: IDokumentasjon[],
  spørsmål: ISpørsmål,
  valgtSvar: ISvar
): IDokumentasjon[] => {
  let endretDokumentasjon = dokumentasjonsbehov;

  const dokumentasjonsbehovMedLikSpørsmålid = dokumentasjonsbehov.find(
    (dokbehov) => dokbehov.spørsmålid === spørsmål.søknadid
  );

  if (dokumentasjonsbehovMedLikSpørsmålid) {
    endretDokumentasjon = dokumentasjonsbehov.filter(
      (behov) => behov.spørsmålid !== spørsmål.søknadid
    );
    endretDokumentasjon = leggTilDokumentasjonsbehov(
      endretDokumentasjon,
      valgtSvar
    );
  } else {
    endretDokumentasjon = leggTilDokumentasjonsbehov(
      dokumentasjonsbehov,
      valgtSvar
    );
  }

  return endretDokumentasjon;
};

export const leggTilDokumentasjonsbehov = (
  dokumentasjonsbehov: IDokumentasjon[],
  valgtSvar: ISvar
) => {
  let endretDokBehov = dokumentasjonsbehov;
  valgtSvar.dokumentasjonsbehov &&
    endretDokBehov.push(valgtSvar.dokumentasjonsbehov);
  return endretDokBehov;
};
