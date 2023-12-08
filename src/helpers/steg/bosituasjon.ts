import { ESøkerDelerBolig, IBosituasjon } from '../../models/steg/bosituasjon';
import { ESvar } from '../../models/felles/spørsmålogsvar';
import { harFyltUtSamboerDetaljer } from '../../utils/person';
import { IPersonDetaljer } from '../../models/søknad/person';
import { harValgtSvar } from '../../utils/spørsmålogsvar';
import { erDatoGyldigOgInnaforBegrensninger } from '../../components/dato/utils';
import { DatoBegrensning } from '../../components/dato/Datovelger';

const harPlanerOmÅBliSamboerEllerSkalGifteSeg = (bosituasjon: IBosituasjon) => {
  const { skalGifteSegEllerBliSamboer } = bosituasjon;

  return !!(
    skalGifteSegEllerBliSamboer &&
    skalGifteSegEllerBliSamboer.svarid === ESvar.JA
  );
};

const harSattFødselsdato = (fødselsdato?: string): boolean =>
  fødselsdato &&
  erDatoGyldigOgInnaforBegrensninger(
    fødselsdato,
    DatoBegrensning.TidligereDatoer
  )
    ? true
    : false;

const harSattIdent = (ident?: string): boolean => (ident ? true : false);

const harFerdigUtfyltOmSamboer = (
  samboerDetaljer?: IPersonDetaljer,
  erIdentValgfritt?: boolean
): boolean =>
  harValgtSvar(samboerDetaljer?.navn?.verdi) &&
  (erIdentValgfritt
    ? true
    : harSattIdent(samboerDetaljer?.ident?.verdi) ||
      harSattFødselsdato(samboerDetaljer?.fødselsdato?.verdi));

const harFerdigUtfyltPlanerOmÅBliSamboerEllerBliGift = (
  bosituasjon: IBosituasjon
): boolean => {
  const {
    skalGifteSegEllerBliSamboer,
    datoSkalGifteSegEllerBliSamboer,
    vordendeSamboerEktefelle,
  } = bosituasjon;

  return !!(
    (skalGifteSegEllerBliSamboer &&
      skalGifteSegEllerBliSamboer?.verdi === false) ||
    (harPlanerOmÅBliSamboerEllerSkalGifteSeg(bosituasjon) &&
      datoSkalGifteSegEllerBliSamboer &&
      erDatoGyldigOgInnaforBegrensninger(
        datoSkalGifteSegEllerBliSamboer.verdi,
        DatoBegrensning.FremtidigeDatoer
      ) &&
      harFerdigUtfyltOmSamboer(vordendeSamboerEktefelle, false))
  );
};

const harSattDatoFlyttetFraHverandre = (bosituasjon: IBosituasjon) => {
  const { datoFlyttetFraHverandre } = bosituasjon;
  return datoFlyttetFraHverandre?.verdi &&
    erDatoGyldigOgInnaforBegrensninger(
      datoFlyttetFraHverandre?.verdi,
      DatoBegrensning.AlleDatoer
    )
    ? true
    : false;
};

export const erFerdigUtfylt = (bosituasjon: IBosituasjon) => {
  const {
    delerBoligMedAndreVoksne,
    samboerDetaljer,
    datoFlyttetSammenMedSamboer,
  } = bosituasjon;

  switch (delerBoligMedAndreVoksne.svarid) {
    case ESøkerDelerBolig.borAleneMedBarnEllerGravid:
      return harFerdigUtfyltPlanerOmÅBliSamboerEllerBliGift(bosituasjon);

    case ESøkerDelerBolig.borMidlertidigFraHverandre:
      return true;

    case ESøkerDelerBolig.borSammenOgVenterBarn:
      return true;

    case ESøkerDelerBolig.harEkteskapsliknendeForhold:
      return !!(
        datoFlyttetSammenMedSamboer &&
        erDatoGyldigOgInnaforBegrensninger(
          datoFlyttetSammenMedSamboer.verdi,
          DatoBegrensning.TidligereDatoer
        ) &&
        samboerDetaljer &&
        harFyltUtSamboerDetaljer(samboerDetaljer, false)
      );

    case ESøkerDelerBolig.delerBoligMedAndreVoksne:
      return harFerdigUtfyltPlanerOmÅBliSamboerEllerBliGift(bosituasjon);

    case ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse:
      console.log('1', harFerdigUtfyltOmSamboer(samboerDetaljer, true));
      console.log('2', harSattDatoFlyttetFraHverandre(bosituasjon));
      console.log(
        '3',
        harFerdigUtfyltPlanerOmÅBliSamboerEllerBliGift(bosituasjon)
      );
      return (
        harFerdigUtfyltOmSamboer(samboerDetaljer, true) &&
        harSattDatoFlyttetFraHverandre(bosituasjon) &&
        harFerdigUtfyltPlanerOmÅBliSamboerEllerBliGift(bosituasjon)
      );
    default:
      return true;
  }
};
