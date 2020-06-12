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
  return arbeidsforhold?.every((arbeidsgiver) =>
    arbeidsgiver.ansettelsesforhold?.svarid === EStilling.midlertidig
      ? arbeidsgiver.harSluttDato?.verdi === false ||
        arbeidsgiver.sluttdato?.verdi
      : arbeidsgiver.ansettelsesforhold?.verdi
  );
};

export const erAksjeselskapFerdigUtfylt = (egetAS: IAksjeselskap[]) => {
  return egetAS?.every((aksjeselskap) => aksjeselskap.arbeidsmengde?.verdi);
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
      return (
        arbeidsforhold !== undefined &&
        erSisteArbeidsgiverFerdigUtfylt(arbeidsforhold)
      );

    case EAktivitet.erSelvstendigNæringsdriveneEllerFrilanser:
      return harValgtSvar(firma?.arbeidsuke?.verdi);

    case EAktivitet.erAnsattIEgetAS:
      return egetAS !== undefined && erAksjeselskapFerdigUtfylt(egetAS);

    case EAktivitet.etablererEgenVirksomhet:
      return (
        etablererEgenVirksomhet !== undefined &&
        harValgtSvar(etablererEgenVirksomhet.verdi)
      );

    case EAktivitet.erArbeidssøker:
      return (
        arbeidssøker !== undefined &&
        harValgtSvar(arbeidssøker.ønskerSøker50ProsentStilling?.verdi)
      );

    case EAktivitet.tarUtdanning:
      return (
        underUtdanning !== undefined && erUtdanningFerdigUtfylt(underUtdanning)
      );

    case EAktivitet.erHverkenIArbeidUtdanningEllerArbeidssøker:
      return true;

    default:
      return false;
  }
};
