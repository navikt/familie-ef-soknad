import { ESøkerDelerBolig, IBosituasjon } from '../../models/steg/bosituasjon';
import { ESvar } from '../../models/felles/spørsmålogsvar';
import { harFyltUtSamboerDetaljer } from '../../utils/person';
import { IPersonDetaljer } from '../../models/søknad/person';
import { harValgtSvar } from '../../utils/spørsmålogsvar';
import { erDatoGyldigOgInnaforBegrensninger } from '../../components/dato/utils';
import { DatoBegrensning } from '../../components/dato/Datovelger';
import { stringHarVerdiOgErIkkeTom } from '../../utils/typer';

const harPlanerOmÅBliSamboerEllerSkalGifteSeg = (bosituasjon: IBosituasjon) => {
  const { skalGifteSegEllerBliSamboer } = bosituasjon;

  return (
    skalGifteSegEllerBliSamboer !== undefined &&
    skalGifteSegEllerBliSamboer.verdi
  );
};

const harSattFødselsdato = (fødselsdato?: string): boolean =>
  stringHarVerdiOgErIkkeTom(fødselsdato) &&
  erDatoGyldigOgInnaforBegrensninger(
    fødselsdato,
    DatoBegrensning.TidligereDatoer
  );

const harSattIdent = (ident?: string): boolean =>
  stringHarVerdiOgErIkkeTom(ident);

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
  console.log('skalGifteSegEllerBliSamboer:', skalGifteSegEllerBliSamboer);
  console.log(
    'skalGifteSegEllerBliSamboer.verdi: ',
    skalGifteSegEllerBliSamboer?.verdi
  );
  console.log(
    'harPlanerOmÅBliSamboerEllerSkalGifteSeg(bosituasjon): ',
    harPlanerOmÅBliSamboerEllerSkalGifteSeg(bosituasjon)
  );
  console.log(
    'datoSkalGifteSegEllerBliSamboer: ',
    datoSkalGifteSegEllerBliSamboer
  );
  console.log(
    'erDatoGyldigOgInnaforBegrensninger: ',
    datoSkalGifteSegEllerBliSamboer &&
      erDatoGyldigOgInnaforBegrensninger(
        datoSkalGifteSegEllerBliSamboer.verdi,
        DatoBegrensning.FremtidigeDatoer
      )
  );
  console.log(
    'harFerdigUtfyltOmSamboer: ',
    harFerdigUtfyltOmSamboer(vordendeSamboerEktefelle, false)
  );

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
  return (
    stringHarVerdiOgErIkkeTom(datoFlyttetFraHverandre) &&
    erDatoGyldigOgInnaforBegrensninger(
      datoFlyttetFraHverandre?.verdi,
      DatoBegrensning.AlleDatoer
    )
  );
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
      console.log(
        'harFerdigUtfyltOmSamboer(samboerDetaljer, true): ',
        harFerdigUtfyltOmSamboer(samboerDetaljer, true)
      );
      console.log(
        'harSattDatoFlyttetFraHverandre(bosituasjon): ',
        harSattDatoFlyttetFraHverandre(bosituasjon)
      );
      console.log(
        'harFerdigUtfyltPlanerOmÅBliSamboerEllerBliGift(bosituasjon): ',
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
