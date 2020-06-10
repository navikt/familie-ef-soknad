import {
  EStilling,
  IArbeidsgiver,
} from '../../models/steg/aktivitet/arbeidsgiver';
import {
  EAktivitet,
  IAksjeselskap,
  IAktivitet,
} from '../../models/steg/aktivitet/aktivitet';
import { harValgtSvar } from '../../utils/spørsmålogsvar';
import {
  EStudieandel,
  IUnderUtdanning,
} from '../../models/steg/aktivitet/utdanning';

export const erSisteArbeidsgiverFerdigUtfylt = (
  arbeidsforhold: IArbeidsgiver[]
) => {
  return arbeidsforhold?.some(
    (arbeidsgiver, index) =>
      index === arbeidsforhold?.length - 1 &&
      (arbeidsgiver.ansettelsesforhold?.svarid === EStilling.midlertidig
        ? arbeidsgiver.harSluttDato?.verdi === false ||
          arbeidsgiver.sluttdato?.verdi
        : arbeidsgiver.ansettelsesforhold?.verdi)
  );
};

export const erAksjeselskapFerdigUtfylt = (egetAS: IAksjeselskap[]) => {
  return egetAS?.some(
    (aksjeselskap, index) =>
      index === egetAS?.length - 1 && aksjeselskap.arbeidsmengde?.verdi
  );
};

export const erUtdanningFerdigUtfylt = (underUtdanning: IUnderUtdanning) => {
  return (
    underUtdanning?.heltidEllerDeltid?.svarid === EStudieandel.heltid ||
    harValgtSvar(underUtdanning?.målMedUtdanning?.verdi)
  );
};

export const erAktivitetSeksjonFerdigUtfylt = (
  svarid: string,
  arbeidssituasjon: IAktivitet
): boolean => {
  const {
    arbeidsforhold,
    firma,
    egetAS,
    etablererEgenVirksomhet,
    arbeidssøker,
    underUtdanning,
  } = arbeidssituasjon;

  switch (svarid) {
    case EAktivitet.erHjemmeMedBarnUnderEttÅr:
      return true;

    case EAktivitet.erArbeidstaker:
      return arbeidsforhold !== undefined
        ? erSisteArbeidsgiverFerdigUtfylt(arbeidsforhold)
        : false;

    case EAktivitet.erSelvstendigNæringsdriveneEllerFrilanser:
      return harValgtSvar(firma?.arbeidsuke?.verdi);

    case EAktivitet.erAnsattIEgetAS:
      return egetAS ? erAksjeselskapFerdigUtfylt(egetAS) : false;

    case EAktivitet.etablererEgenVirksomhet:
      return etablererEgenVirksomhet
        ? harValgtSvar(etablererEgenVirksomhet.verdi)
        : false;

    case EAktivitet.erArbeidssøker:
      return arbeidssøker
        ? harValgtSvar(arbeidssøker.ønskerSøker50ProsentStilling?.verdi)
        : false;

    case EAktivitet.tarUtdanning:
      return underUtdanning ? erUtdanningFerdigUtfylt(underUtdanning) : false;

    case EAktivitet.erHverkenIArbeidUtdanningEllerArbeidssøker:
      return true;

    default:
      return false;
  }
};

export const erForrigeAktivitetSpørsmålSeksjonFerdigUtfylt = (
  svarid: string,
  arbeidssituasjon: IAktivitet
) => {
  const { hvaErDinArbeidssituasjon } = arbeidssituasjon;
  const svaridPos = hvaErDinArbeidssituasjon.svarid.findIndex(
    (s) => s === svarid
  );
  const forrigeValgtAktivitet = hvaErDinArbeidssituasjon.svarid[svaridPos - 1];

  return erAktivitetSeksjonFerdigUtfylt(
    forrigeValgtAktivitet,
    arbeidssituasjon
  );
};
