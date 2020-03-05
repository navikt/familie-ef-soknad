import { ISpørsmål, JaNeiSvar } from '../../../../models/spørsmal';
import {
  EArbeidsgiver,
  EStilling,
} from '../../../../models/steg/arbeidssituasjon/arbeidsgiver';

export const hvaSlagsStilling: ISpørsmål = {
  søknadid: EArbeidsgiver.fastStilling,
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
  søknadid: EArbeidsgiver.harSluttDato,
  tekstid: 'arbeidsforhold.label.sluttdato',
  svaralternativer: JaNeiSvar,
};
