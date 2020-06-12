import { ESøkerDelerBolig, IBosituasjon } from '../../models/steg/bosituasjon';
import { ESvar } from '../../models/spørsmålogsvar';

export const erFerdigUtfylt = (bosituasjon: IBosituasjon) => {
  const {
    delerBoligMedAndreVoksne,
    samboerDetaljer,
    datoFlyttetSammenMedSamboer,
    skalGifteSegEllerBliSamboer,
  } = bosituasjon;

  const harPlanerOmÅBliSamboerEllerSkalGifteSeg =
    skalGifteSegEllerBliSamboer &&
    skalGifteSegEllerBliSamboer.svarid === ESvar.JA;

  const harSattFødselsdato = samboerDetaljer?.fødselsdato ? true : false;

  switch (delerBoligMedAndreVoksne.svarid) {
    case ESøkerDelerBolig.borAleneMedBarnEllerGravid:
      return (
        skalGifteSegEllerBliSamboer?.svarid === ESvar.NEI ||
        (harPlanerOmÅBliSamboerEllerSkalGifteSeg && harSattFødselsdato)
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
        (harPlanerOmÅBliSamboerEllerSkalGifteSeg && harSattFødselsdato)
      );
    case ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse:
      return (
        skalGifteSegEllerBliSamboer?.svarid === ESvar.NEI ||
        (harPlanerOmÅBliSamboerEllerSkalGifteSeg && harSattFødselsdato)
      );
  }
};
