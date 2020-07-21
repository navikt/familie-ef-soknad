import { ISpørsmål } from '../../../../models/spørsmålogsvar';
import {
  EArbeidsgiver,
  EStilling,
} from '../../../../models/steg/aktivitet/arbeidsgiver';
import { JaNeiSvar } from '../../../../helpers/svar';
import {
  AktivitetDokumentasjon,
  IDokumentasjon,
} from '../../../../models/dokumentasjon';

// DOKUMENTASJON
const DokumentasjonLærling: IDokumentasjon = {
  id: AktivitetDokumentasjon.LÆRLING,
  spørsmålid: EArbeidsgiver.ansettelsesforhold,
  svarid: EStilling.lærling,
  label: '',
  tittel: 'dokumentasjon.lærling.tittel',
  harSendtInn: false,
};

// SPØRSMÅL
export const hvaSlagsStilling: ISpørsmål = {
  søknadid: EArbeidsgiver.ansettelsesforhold,
  tekstid: 'arbeidsforhold.label.ansettelsesforhold',
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
      dokumentasjonsbehov: DokumentasjonLærling,
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
