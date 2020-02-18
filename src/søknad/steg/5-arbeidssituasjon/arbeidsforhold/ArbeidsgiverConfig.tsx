import { ISpørsmål, JaNeiSvar } from '../../../../models/spørsmal';
import { EStillingSvar } from '../../../../models/arbeidssituasjon';

export const hvaSlagsStilling: ISpørsmål = {
  spørsmål_id: 'fastEllerMidlertidig',
  tekstid: 'arbeidsforhold.label.fastEllerMidlertidig',
  svaralternativer: [
    {
      nøkkel: EStillingSvar.fast,
      svar_tekstid: 'arbeidsforhold.svar.fast',
      alert_tekstid: '',
    },
    {
      nøkkel: EStillingSvar.midlertidig,
      svar_tekstid: 'arbeidsforhold.svar.midlertidig',
    },
  ],
};

export const harDuSluttdato: ISpørsmål = {
  spørsmål_id: 'sluttdato',
  tekstid: 'arbeidsforold.label.sluttdato',
  svaralternativer: JaNeiSvar,
};
