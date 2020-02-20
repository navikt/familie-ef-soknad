import { ISpørsmål } from '../../../models/spørsmal';
import { EArbeidssituasjonSvar } from '../../../models/arbeidssituasjon';

export const hvaErDinArbeidssituasjon: ISpørsmål = {
  spørsmål_id: 'arbeidssituasjon',
  tekstid: 'arbeidssituasjon.spm',
  svaralternativer: [
    {
      nøkkel: EArbeidssituasjonSvar.erHjemmeMedBarnUnderEttÅr,
      svar_tekstid: 'arbeidssituasjon.svar.erHjemmeMedBarnUnderEttÅr',
    },
    {
      nøkkel: EArbeidssituasjonSvar.erArbeidstaker,
      svar_tekstid: 'arbeidssituasjon.svar.erArbeidstaker',
    },
    {
      nøkkel: EArbeidssituasjonSvar.erSelvstendigNæringsdriveneEllerFrilanser,
      svar_tekstid:
        'arbeidssituasjon.svar.erSelvstendigNæringsdriveneEllerFrilanser',
    },
    {
      nøkkel: EArbeidssituasjonSvar.erAnsattIEgetAS,
      svar_tekstid: 'arbeidssituasjon.svar.erAnsattIEgetAS',
    },
    {
      nøkkel: EArbeidssituasjonSvar.etablererEgenVirksomhet,
      svar_tekstid: 'arbeidssituasjon.svar.etablererEgenVirksomhet',
    },
    {
      nøkkel: EArbeidssituasjonSvar.erArbeidssøker,
      svar_tekstid: 'arbeidssituasjon.svar.erArbeidssøker',
    },
    {
      nøkkel: EArbeidssituasjonSvar.tarUtdanning,
      svar_tekstid: 'arbeidssituasjon.svar.tarUtdanning',
    },
    {
      nøkkel: EArbeidssituasjonSvar.erHverkenIArbeidUtdanningEllerArbeidssøker,
      svar_tekstid:
        'arbeidssituasjon.svar.erHverkenIArbeidUtdanningEllerArbeidssøker',
    },
  ],
};
