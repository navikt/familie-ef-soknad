import { EDinSituasjon } from '../../../models/steg/dinsituasjon/meromsituasjon';
import { IntlShape } from 'react-intl';
import { ISøknad } from '../../../models/søknad';
import { IArbeidsgiver } from '../../../models/steg/aktivitet/arbeidsgiver';
import { fraStringTilTall } from '../../../utils/søknad';

export const erSituasjonIAvhukedeSvar = (
  situasjon: EDinSituasjon,
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
  const { firma, underUtdanning, arbeidsforhold } = søknad.aktivitet;

  let totalArbeidsmengde: number = 0;
  if (firma?.arbeidsmengde)
    totalArbeidsmengde += fraStringTilTall(firma.arbeidsmengde.verdi);
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
