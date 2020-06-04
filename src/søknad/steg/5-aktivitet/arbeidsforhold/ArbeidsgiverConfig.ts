import { ISpørsmål } from '../../../../models/spørsmålogsvar';
import {
  EArbeidsgiver,
  EStilling,
} from '../../../../models/steg/aktivitet/arbeidsgiver';
import { JaNeiSvar } from '../../../../helpers/svar';

export const hvaSlagsStilling: ISpørsmål = {
  søknadid: EArbeidsgiver.fastStilling,
  tekstid: 'arbeidsforhold.label.fastEllerMidlertidig',
  flersvar: false,
  svaralternativer: [
    {
      id: EStilling.fast,
      svar_tekstid: 'arbeidsforhold.svar.fast',
    },
    {
      id: EStilling.midlertidig,
      svar_tekstid: 'arbeidsforhold.svar.midlertidig',
    },
    {
      id: EStilling.lærling,
      svar_tekstid: 'arbeidsforhold.svar.lærling',
    },
    {
      id: EStilling.tilkallingsvakt,
      svar_tekstid: 'arbeidsforhold.svar.tilkallingsvakt',
    },
  ],
};

export const harDuSluttdato: ISpørsmål = {
  søknadid: EArbeidsgiver.harSluttDato,
  tekstid: 'arbeidsforhold.label.sluttdato',
  flersvar: false,
  svaralternativer: JaNeiSvar,
};
