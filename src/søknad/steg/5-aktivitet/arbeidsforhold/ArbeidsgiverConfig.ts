import { ISpørsmål } from '../../../../models/spørsmålogsvar';
import {
  EArbeidsgiver,
  EStilling,
} from '../../../../models/steg/aktivitet/arbeidsgiver';
import { JaNeiSvar } from '../../../../helpers/standardSvar';

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
