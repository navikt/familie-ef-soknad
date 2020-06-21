import { IDokumentasjon } from '../../models/dokumentasjon';
import { ISpørsmål, ISvar } from '../../models/spørsmålogsvar';
import { hentTekst } from '../../utils/søknad';
import { IntlShape } from 'react-intl';

export const hentDokumentasjonTilFlersvarSpørsmål = (
  erHuketAv: boolean | undefined,
  dokumentasjonsbehov: IDokumentasjon[],
  valgtSvar: ISvar,
  intl: IntlShape
) => {
  let endretDokumentasjonsbehov = dokumentasjonsbehov;
  if (erHuketAv === true) {
    endretDokumentasjonsbehov = dokumentasjonsbehov.filter(
      (behov) => behov.svarid !== valgtSvar.id
    );
  } else if (erHuketAv === false) {
    valgtSvar.dokumentasjonsbehov &&
      endretDokumentasjonsbehov.push(valgtSvar.dokumentasjonsbehov);
  }
  return leggTilDokumentasjonLabel(endretDokumentasjonsbehov, intl);
};

export const oppdaterDokumentasjonTilEtSvarSpørsmål = (
  dokumentasjonsbehov: IDokumentasjon[],
  spørsmål: ISpørsmål,
  valgtSvar: ISvar,
  intl: IntlShape
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
  return leggTilDokumentasjonLabel(endretDokumentasjon, intl);
};

function leggTilDokumentasjonLabel(
  dokumentasjon: IDokumentasjon[],
  intl: IntlShape
) {
  return dokumentasjon.map((dokumentasjonsbehov) => {
    return {
      ...dokumentasjonsbehov,
      label: hentTekst(dokumentasjonsbehov.tittel, intl),
    };
  });
}

export const leggTilDokumentasjonsbehov = (
  dokumentasjonsbehov: IDokumentasjon[],
  valgtSvar: ISvar
) => {
  let endretDokBehov = dokumentasjonsbehov;
  valgtSvar.dokumentasjonsbehov &&
    endretDokBehov.push(valgtSvar.dokumentasjonsbehov);
  return endretDokBehov;
};
