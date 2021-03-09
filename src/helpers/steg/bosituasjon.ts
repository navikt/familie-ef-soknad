import { ESøkerDelerBolig, IBosituasjon } from '../../models/steg/bosituasjon';
import { ESvar } from '../../models/felles/spørsmålogsvar';
import { erGyldigDato } from '../../utils/dato';
import { harFyltUtSamboerDetaljer } from '../../utils/person';
import { IPersonDetaljer } from '../../models/søknad/person';
import { harValgtSvar } from '../../utils/spørsmålogsvar';

export const erFerdigUtfylt = (bosituasjon: IBosituasjon) => {
  const {
    delerBoligMedAndreVoksne,
    samboerDetaljer,
    datoFlyttetSammenMedSamboer,
    skalGifteSegEllerBliSamboer,
    datoFlyttetFraHverandre,
    vordendeSamboerEktefelle,
  } = bosituasjon;

  const harPlanerOmÅBliSamboerEllerSkalGifteSeg =
    skalGifteSegEllerBliSamboer &&
    skalGifteSegEllerBliSamboer.svarid === ESvar.JA;

  const harSattFødselsdato = (fødselsdato?: string): boolean =>
    fødselsdato ? true : false;
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
  const harFerdigUtfyltPlanerOmÅBliSamboerEllerBliGift =
    skalGifteSegEllerBliSamboer?.svarid === ESvar.NEI ||
    (harPlanerOmÅBliSamboerEllerSkalGifteSeg &&
      harFerdigUtfyltOmSamboer(vordendeSamboerEktefelle, false));

  switch (delerBoligMedAndreVoksne.svarid) {
    case ESøkerDelerBolig.borAleneMedBarnEllerGravid:
      return harFerdigUtfyltPlanerOmÅBliSamboerEllerBliGift;

    case ESøkerDelerBolig.borMidlertidigFraHverandre:
      return true;

    case ESøkerDelerBolig.borSammenOgVenterBarn:
      return true;

    case ESøkerDelerBolig.harEkteskapsliknendeForhold:
      return !!(
        datoFlyttetSammenMedSamboer &&
        samboerDetaljer &&
        harFyltUtSamboerDetaljer(samboerDetaljer, false)
      );

    case ESøkerDelerBolig.delerBoligMedAndreVoksne:
      return harFerdigUtfyltPlanerOmÅBliSamboerEllerBliGift;

    case ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse:
      return (
        harFerdigUtfyltOmSamboer(samboerDetaljer, true) &&
        erGyldigDato(datoFlyttetFraHverandre?.verdi) &&
        harFerdigUtfyltPlanerOmÅBliSamboerEllerBliGift
      );
  }
};
