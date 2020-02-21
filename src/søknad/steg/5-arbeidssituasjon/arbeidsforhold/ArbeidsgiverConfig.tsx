import { ISpørsmål, JaNeiSvar } from '../../../../models/spørsmal';
import { EStilling } from '../../../../models/arbeidssituasjon';

export const hvaSlagsStilling: ISpørsmål = {
  spørsmål_id: 'fastEllerMidlertidig',
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
  spørsmål_id: 'sluttdato',
  tekstid: 'arbeidsforold.label.sluttdato',
  svaralternativer: JaNeiSvar,
};
