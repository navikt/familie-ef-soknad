import { ISpørsmål, JaNeiSvar } from '../../../../models/spørsmal';
import { EArbeidsgiver, EStilling } from '../../../../models/arbeidssituasjon';

export const hvaSlagsStilling: ISpørsmål = {
  spørsmål_id: EArbeidsgiver.fastStilling,
  tekstid: 'arbeidsforhold.label.fastEllerMidlertidig',
  svaralternativer: [
    {
      nøkkel: EStilling.fast,
      svar_tekstid: 'arbeidsforhold.svar.fast',
      alert_tekstid: '',
    },
    {
      nøkkel: EStilling.midlertidig,
      svar_tekstid: 'arbeidsforhold.svar.midlertidig',
    },
  ],
};

export const harDuSluttdato: ISpørsmål = {
  spørsmål_id: EArbeidsgiver.harSluttDato,
  tekstid: 'arbeidsforhold.label.sluttdato',
  svaralternativer: JaNeiSvar,
};
