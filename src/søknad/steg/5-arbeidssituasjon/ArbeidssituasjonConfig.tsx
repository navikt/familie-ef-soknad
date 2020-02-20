import { ISpørsmål } from '../../../models/spørsmal';
import { EArbeidssituasjonSvar } from '../../../models/arbeidssituasjon';

export const hvaErDinArbeidssituasjon: ISpørsmål = {
  spørsmål_id: 'arbeidssituasjon',
  tekstid: 'arbeidssituasjon.spm',
  svaralternativer: [
    {
      nøkkel: EArbeidssituasjonSvar.erHjemmeMedBarnUnderEttÅr,
      svar_tekstid: 'arbeidssituasjon.svar.erHjemmeMedBarnUnderEttÅr',
      alert_tekstid: '',
    },
    {
      nøkkel: EArbeidssituasjonSvar.erIArbeid,
      svar_tekstid: 'arbeidssituasjon.svar.erIArbeid',
      alert_tekstid: '',
    },
    {
      nøkkel: EArbeidssituasjonSvar.erSelvstendigNæringsdriveneEllerFrilanser,
      svar_tekstid:
        'arbeidssituasjon.svar.erSelvstendigNæringsdriveneEllerFrilanser',
      alert_tekstid: '',
    },
    {
      nøkkel: EArbeidssituasjonSvar.erAnsattIEgetAS,
      svar_tekstid: 'arbeidssituasjon.svar.erAnsattIEgetAS',
      alert_tekstid: '',
    },
    {
      nøkkel: EArbeidssituasjonSvar.etablererEgenVirksomhet,
      svar_tekstid: 'arbeidssituasjon.svar.etablererEgenVirksomhet',
      alert_tekstid: '',
    },
    {
      nøkkel: EArbeidssituasjonSvar.erArbeidssøker,
      svar_tekstid: 'arbeidssituasjon.svar.erArbeidssøker',
      alert_tekstid: '',
    },
    {
      nøkkel: EArbeidssituasjonSvar.tarUtdanning,
      svar_tekstid: 'arbeidssituasjon.svar.tarUtdanning',
      alert_tekstid: '',
    },
    {
      nøkkel: EArbeidssituasjonSvar.erHverkenIArbeidUtdanningEllerArbeidssøker,
      svar_tekstid:
        'arbeidssituasjon.svar.erHverkenIArbeidUtdanningEllerArbeidssøker',
      alert_tekstid: '',
    },
  ],
};
