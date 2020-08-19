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
  const { firmaer, underUtdanning, arbeidsforhold } = søknad.aktivitet;

  let totalArbeidsmengde: number = 0;
  if (firmaer)
    totalArbeidsmengde += firmaer.reduce((initiell, firma) => {
      return firma.arbeidsmengde?.verdi
        ? initiell + fraStringTilTall(firma.arbeidsmengde?.verdi)
        : initiell;
    }, 0);
  if (underUtdanning?.arbeidsmengde)
    totalArbeidsmengde += fraStringTilTall(underUtdanning.arbeidsmengde.verdi);
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
  return totalArbeidsmengde < 50 || totalArbeidsmengde === 50;
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
  const harValgtDato = datoSagtOppEllerRedusertStilling?.verdi !== undefined;

  return (
    (valgtSagtOppEllerRedusertStilling &&
      harSkrevetBegrunnelse &&
      harValgtDato) ||
    sagtOppEllerRedusertStilling?.svarid === ESagtOppEllerRedusertStilling.nei
  );
};
