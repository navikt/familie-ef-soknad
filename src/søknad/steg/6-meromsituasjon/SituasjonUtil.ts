import {
  DinSituasjonType,
  ESagtOppEllerRedusertStilling,
  IDinSituasjon,
} from '../../../models/steg/dinsituasjon/meromsituasjon';
import { IntlShape } from 'react-intl';
import { ISøknad } from '../../../models/søknad/søknad';
import { IArbeidsgiver } from '../../../models/steg/aktivitet/arbeidsgiver';
import { fraStringTilTall } from '../../../utils/søknad';
import { harValgtSvar } from '../../../utils/spørsmålogsvar';
import { IBarn } from '../../../models/steg/barn';
import { hentBarnetsNavnEllerBeskrivelseMedGenetiv } from '../../../utils/barn';
import { storeForbokstaver } from '../../../utils/tekst';
import { erDatoGyldigOgInnaforBegrensninger } from '../../../components/dato/utils';
import { DatoBegrensning } from '../../../components/dato/Datovelger';

export const erSituasjonIAvhukedeSvar = (
  situasjon: DinSituasjonType,
  avhukedeSvar: string[],
  intl: IntlShape
): boolean => {
  const tekstid: string = 'dinSituasjon.svar.' + situasjon;
  const svarTekst: string = intl.formatMessage({ id: tekstid });
  return avhukedeSvar.some((svarHuketAvISøknad: string) => {
    return svarHuketAvISøknad === svarTekst;
  });
};
export const harSøkerMindreEnnHalvStilling = (søknad: ISøknad): boolean => {
  const { firmaer, arbeidsforhold, firma, egetAS } = søknad.aktivitet;

  let totalArbeidsmengde: number = 0;
  if (firmaer)
    totalArbeidsmengde += firmaer.reduce((initiell, firma) => {
      return firma.arbeidsmengde?.verdi
        ? initiell + fraStringTilTall(firma.arbeidsmengde?.verdi)
        : initiell;
    }, 0);
  if (firma?.arbeidsmengde)
    totalArbeidsmengde += fraStringTilTall(firma.arbeidsmengde.verdi);
  if (egetAS)
    totalArbeidsmengde += egetAS.reduce((initiell, selskap) => {
      return selskap.arbeidsmengde?.verdi
        ? initiell + fraStringTilTall(selskap.arbeidsmengde?.verdi)
        : initiell;
    }, 0);
  if (arbeidsforhold) {
    const arbeidsmengder = arbeidsforhold.map((arbeidsgiver: IArbeidsgiver) => {
      return arbeidsgiver.arbeidsmengde
        ? fraStringTilTall(arbeidsgiver.arbeidsmengde.verdi)
        : 0;
    });
    let arbeidsmengdeForArbeidsforhold = arbeidsmengder.reduce(
      (total: number, arbeidsmengde: number) => total + arbeidsmengde
    );
    totalArbeidsmengde += arbeidsmengdeForArbeidsforhold;
  }
  return totalArbeidsmengde < 50;
};

export const harValgtSvarPåSagtOppEllerRedusertArbeidstidSpørsmål = (
  dinSituasjon: IDinSituasjon
) => {
  const {
    sagtOppEllerRedusertStilling,
    begrunnelseSagtOppEllerRedusertStilling,
    datoSagtOppEllerRedusertStilling,
  } = dinSituasjon;

  const valgtSagtOppEllerRedusertStilling =
    sagtOppEllerRedusertStilling?.svarid ===
      ESagtOppEllerRedusertStilling.sagtOpp ||
    sagtOppEllerRedusertStilling?.svarid ===
      ESagtOppEllerRedusertStilling.redusertStilling;
  const harSkrevetBegrunnelse = harValgtSvar(
    begrunnelseSagtOppEllerRedusertStilling?.verdi
  );
  const harValgtDato =
    datoSagtOppEllerRedusertStilling?.verdi !== undefined &&
    erDatoGyldigOgInnaforBegrensninger(
      datoSagtOppEllerRedusertStilling?.verdi,
      DatoBegrensning.TidligereDatoer
    );

  return (
    (valgtSagtOppEllerRedusertStilling &&
      harSkrevetBegrunnelse &&
      harValgtDato) ||
    sagtOppEllerRedusertStilling?.svarid === ESagtOppEllerRedusertStilling.nei
  );
};

export const hvisHarBarnMedSærligeTilsynMåHaFyltUtFritekst = (
  søknad: ISøknad
): boolean => {
  const { merOmDinSituasjon, person } = søknad;

  const harSvartJaPåHarBarnMedSærligeTilsyn =
    merOmDinSituasjon.gjelderDetteDeg.svarid.find(
      (v) => v === DinSituasjonType.harBarnMedSærligeBehov
    );
  const barnMedSærligeTilsyn = person.barn
    .filter((b) => b.særligeTilsynsbehov)
    .map((b) => b.særligeTilsynsbehov);

  return harSvartJaPåHarBarnMedSærligeTilsyn
    ? barnMedSærligeTilsyn.length > 0 &&
        barnMedSærligeTilsyn.every((v) => (v ? v.verdi.length > 0 : false))
    : true;
};

export const leggTilSærligeBehov = (
  barnMedSærligeBehov: IBarn,
  intl: IntlShape
) => {
  const barnetsNavn = hentBarnetsNavnEllerBeskrivelseMedGenetiv(
    barnMedSærligeBehov,
    intl
  );
  const formattertNavn = barnMedSærligeBehov.navn.verdi
    ? storeForbokstaver(barnetsNavn)
    : barnetsNavn;
  const oppdatertBarn = {
    ...barnMedSærligeBehov,
    særligeTilsynsbehov: {
      verdi: '',
      label: intl.formatMessage(
        { id: 'dinSituasjon.label.særligTilsyn' },
        {
          barnetsNavn: formattertNavn,
        }
      ),
    },
  };
  return oppdatertBarn;
};
