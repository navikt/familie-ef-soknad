import { ISpørsmål } from '../../../../models/spørsmalogsvar';
import {
  EArbeidsgiver,
  EStilling,
} from '../../../../models/steg/aktivitet/arbeidsgiver';
import { JaNeiSvar } from '../../../../helpers/svar';

export const hvaSlagsStilling: ISpørsmål = {
  søknadid: EArbeidsgiver.fastStilling,
  tekstid: 'arbeidsforhold.label.fastEllerMidlertidig',
  svaralternativer: [
    {
      id: EStilling.fast,
      svar_tekstid: 'arbeidsforhold.svar.fast',
      alert_tekstid: '',
    },
    {
      id: EStilling.midlertidig,
      svar_tekstid: 'arbeidsforhold.svar.midlertidig',
    },
  ],
};

export const harDuSluttdato: ISpørsmål = {
  søknadid: EArbeidsgiver.harSluttDato,
  tekstid: 'arbeidsforhold.label.sluttdato',
  svaralternativer: JaNeiSvar,
};
