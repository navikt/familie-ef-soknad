import { ESøkerDelerBolig, IBosituasjon } from '../../models/steg/bosituasjon';
import { ESvar } from '../../models/felles/spørsmålogsvar';
import { harFyltUtSamboerDetaljer } from '../../utils/person';
import { IPersonDetaljer } from '../../models/søknad/person';
import { harValgtSvar } from '../../utils/spørsmålogsvar';
import { erDatoGyldigOgInnaforBegrensninger } from '../../components/dato/utils';
import { DatoBegrensning } from '../../components/dato/Datovelger';

export const erFerdigUtfylt = (bosituasjon: IBosituasjon) => {
  const {
    delerBoligMedAndreVoksne,
    samboerDetaljer,
    skalGifteSegEllerBliSamboer,
    datoFlyttetSammenMedSamboer,
    datoFlyttetFraHverandre,
    datoSkalGifteSegEllerBliSamboer,
    vordendeSamboerEktefelle,
  } = bosituasjon;

  const harPlanerOmÅBliSamboerEllerSkalGifteSeg =
    skalGifteSegEllerBliSamboer &&
    skalGifteSegEllerBliSamboer.svarid === ESvar.JA;

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
  const harFerdigUtfyltPlanerOmÅBliSamboerEllerBliGift =
    skalGifteSegEllerBliSamboer?.svarid === ESvar.NEI ||
    (harPlanerOmÅBliSamboerEllerSkalGifteSeg &&
      datoSkalGifteSegEllerBliSamboer &&
      erDatoGyldigOgInnaforBegrensninger(
        datoSkalGifteSegEllerBliSamboer.verdi,
        DatoBegrensning.FremtidigeDatoer
      ) &&
      harFerdigUtfyltOmSamboer(vordendeSamboerEktefelle, false));
  const harSattDatoFlyttetFraHverandra: boolean =
    datoFlyttetFraHverandre?.verdi &&
    erDatoGyldigOgInnaforBegrensninger(
      datoFlyttetFraHverandre?.verdi,
      DatoBegrensning.AlleDatoer
    )
      ? true
      : false;

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
        erDatoGyldigOgInnaforBegrensninger(
          datoFlyttetSammenMedSamboer.verdi,
          DatoBegrensning.TidligereDatoer
        ) &&
        samboerDetaljer &&
        harFyltUtSamboerDetaljer(samboerDetaljer, false)
      );

    case ESøkerDelerBolig.delerBoligMedAndreVoksne:
      return harFerdigUtfyltPlanerOmÅBliSamboerEllerBliGift;

    case ESøkerDelerBolig.tidligereSamboerFortsattRegistrertPåAdresse:
      return (
        harFerdigUtfyltOmSamboer(samboerDetaljer, true) &&
        harSattDatoFlyttetFraHverandra &&
        harFerdigUtfyltPlanerOmÅBliSamboerEllerBliGift
      );
  }
};
