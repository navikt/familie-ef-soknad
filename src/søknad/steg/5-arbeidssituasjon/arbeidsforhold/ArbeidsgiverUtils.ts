import {
  EArbeidsgiver,
  IArbeidsgiver,
} from '../../../../models/arbeidssituasjon';

export const hentEndretArbeidsforhold = (
  arbeidsforhold: IArbeidsgiver[],
  arbeidsgivernummer: number,
  objektnøkkel: EArbeidsgiver | string,
  label: string,
  verdi: any
) => {
  const endretArbeidsforhold = arbeidsforhold?.map((arbeidsgiver, index) => {
    if (index === arbeidsgivernummer) {
      if (
        objektnøkkel === EArbeidsgiver.harSluttDato &&
        verdi === false &&
        arbeidsgiver.sluttdato
      ) {
        const endretArbeidsgiver = arbeidsgiver;
        delete endretArbeidsgiver.sluttdato;

        return {
          ...endretArbeidsgiver,
          [objektnøkkel]: { label: label, verdi: verdi },
        };
      } else {
        return {
          ...arbeidsgiver,
          [objektnøkkel]: { label: label, verdi: verdi },
        };
      }
    } else return arbeidsgiver;
  });
  return endretArbeidsforhold;
};
