import { ESøkerDelerBolig, IBosituasjon } from '../../models/steg/bosituasjon';
import { ESvar } from '../../models/felles/spørsmålogsvar';
import { erGyldigDato } from '../../utils/dato';

export const erFerdigUtfylt = (bosituasjon: IBosituasjon) => {
  const {
    delerBoligMedAndreVoksne,
    samboerDetaljer,
    datoFlyttetSammenMedSamboer,
    skalGifteSegEllerBliSamboer,
    datoFlyttetFraHverandre,
  } = bosituasjon;

  const harPlanerOmÅBliSamboerEllerSkalGifteSeg =
    skalGifteSegEllerBliSamboer &&
    skalGifteSegEllerBliSamboer.svarid === ESvar.JA;

  const harSattFødselsdato = samboerDetaljer?.fødselsdato?.verdi ? true : false;
  const harSattIdent = samboerDetaljer?.ident?.verdi ? true : false;
  const harFerdigUtfyltOmSamboer = harSattIdent || harSattFødselsdato;

  switch (delerBoligMedAndreVoksne.svarid) {
    case ESøkerDelerBolig.borAleneMedBarnEllerGravid:
      return (
        skalGifteSegEllerBliSamboer?.svarid === ESvar.NEI ||
        (harPlanerOmÅBliSamboerEllerSkalGifteSeg && harFerdigUtfyltOmSamboer)
      );
    case ESøkerDelerBolig.borMidlertidigFraHverandre:
      return true;
    case ESøkerDelerBolig.borSammenOgVenterBarn:
      return true;
    case ESøkerDelerBolig.harEkteskapsliknendeForhold:
      return datoFlyttetSammenMedSamboer ? true : false;
    case ESøkerDelerBolig.delerBoligMedAndreVoksne:
      return (
        skalGifteSegEllerBliSamboer?.svarid === ESvar.NEI ||
        (harPlanerOmÅBliSamboerEllerSkalGifteSeg && harFerdigUtfyltOmSamboer)
      );
    case ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse:
      return erGyldigDato(datoFlyttetFraHverandre?.verdi);
  }
};
