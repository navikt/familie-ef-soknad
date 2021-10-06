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
  IUnderUtdanning,
  IUtdanning,
} from '../../models/steg/aktivitet/utdanning';
import { IFirma } from '../../models/steg/aktivitet/firma';
import { IDetaljertUtdanning } from '../../skolepenger/models/detaljertUtdanning';
import {
  erDatoGyldigOgInnaforBegrensninger,
  erPeriodeGyldigOgInnaforBegrensninger,
} from '../../components/dato/utils';
import { DatoBegrensning } from '../../components/dato/Datovelger';

export const erSisteArbeidsgiverFerdigUtfylt = (
  arbeidsforhold: IArbeidsgiver[]
) => {
  return arbeidsforhold?.every((arbeidsgiver) =>
    arbeidsgiver.ansettelsesforhold?.svarid === EStilling.midlertidig
      ? arbeidsgiver.harSluttDato?.verdi === false ||
        (arbeidsgiver?.sluttdato?.verdi &&
          erDatoGyldigOgInnaforBegrensninger(
            arbeidsgiver?.sluttdato?.verdi,
            DatoBegrensning.FremtidigeDatoer
          ))
      : arbeidsgiver.ansettelsesforhold?.verdi
  );
};

export const erSisteFirmaUtfylt = (firmaer: IFirma[]) => {
  return firmaer?.every((firma) => {
    return (
      firma?.etableringsdato?.verdi &&
      erDatoGyldigOgInnaforBegrensninger(
        firma?.etableringsdato?.verdi,
        DatoBegrensning.TidligereDatoer
      ) &&
      firma.arbeidsuke?.verdi
    );
  });
};

export const erAksjeselskapFerdigUtfylt = (
  egetAS: IAksjeselskap[],
  inkludertArbeidsmengde: boolean
) => {
  return inkludertArbeidsmengde
    ? egetAS?.every((aksjeselskap) => aksjeselskap.arbeidsmengde?.verdi)
    : egetAS?.every((aksjeselskap) => aksjeselskap.navn?.verdi);
};

export const erTidligereUtdanningFerdigUtfylt = (
  tidligereUtdanning: IUtdanning[]
): boolean => {
  return tidligereUtdanning.every(
    (utdanning) =>
      utdanning.linjeKursGrad?.verdi !== '' &&
      utdanning?.periode &&
      erPeriodeGyldigOgInnaforBegrensninger(
        utdanning?.periode,
        DatoBegrensning.AlleDatoer
      )
  );
};

export const erUnderUtdanningFerdigUtfylt = (
  underUtdanning: IUnderUtdanning
): boolean => {
  return harValgtSvar(underUtdanning?.målMedUtdanning?.verdi);
};

export const erDetaljertUtdanningFerdigUtfylt = (
  detaljertUtdanning: IDetaljertUtdanning
): boolean => {
  return (
    harValgtSvar(detaljertUtdanning.semesteravgift?.verdi) ||
    harValgtSvar(detaljertUtdanning.studieavgift?.verdi) ||
    harValgtSvar(detaljertUtdanning.eksamensgebyr?.verdi)
  );
};

export const erAllUtdanningFerdigUtfylt = (
  underUtdanning: IUnderUtdanning | IDetaljertUtdanning
) => {
  if (!erDetaljertUtdanningFerdigUtfylt(underUtdanning)) return false;

  if (underUtdanning?.harTattUtdanningEtterGrunnskolen?.verdi === false) {
    return underUtdanning && erUnderUtdanningFerdigUtfylt(underUtdanning);
  } else {
    const tidligereUtdanning = underUtdanning?.tidligereUtdanning;
    return (
      tidligereUtdanning !== undefined &&
      erUnderUtdanningFerdigUtfylt(underUtdanning) &&
      erTidligereUtdanningFerdigUtfylt(tidligereUtdanning)
    );
  }
};

export const erAktivitetSeksjonFerdigUtfylt = (
  svarid: string,
  arbeidssituasjon: IAktivitet,
  inkludertArbeidsmengde: boolean = true
): boolean => {
  const {
    arbeidsforhold,
    firmaer,
    egetAS,
    etablererEgenVirksomhet,
    arbeidssøker,
    underUtdanning,
    datoOppstartJobb,
  } = arbeidssituasjon;

  switch (svarid) {
    case EAktivitet.erHjemmeMedBarnUnderEttÅr:
      return true;

    case EAktivitet.erArbeidstakerOgEllerLønnsmottakerFrilanser:
      return (
        arbeidsforhold !== undefined &&
        erSisteArbeidsgiverFerdigUtfylt(arbeidsforhold)
      );

    case EAktivitet.erSelvstendigNæringsdriveneEllerFrilanser:
      return firmaer !== undefined && erSisteFirmaUtfylt(firmaer);

    case EAktivitet.erAnsattIEgetAS:
      return (
        egetAS !== undefined &&
        erAksjeselskapFerdigUtfylt(egetAS, inkludertArbeidsmengde)
      );

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
        underUtdanning !== undefined &&
        erAllUtdanningFerdigUtfylt(underUtdanning)
      );

    case EAktivitet.harFåttJobbTilbud:
      return (
        datoOppstartJobb !== undefined &&
        erDatoGyldigOgInnaforBegrensninger(
          datoOppstartJobb.verdi,
          DatoBegrensning.FremtidigeDatoer
        )
      );

    case EAktivitet.erHverkenIArbeidUtdanningEllerArbeidssøker:
      return true;

    default:
      return false;
  }
};
