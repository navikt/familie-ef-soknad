import { ISpørsmål } from '../../../models/spørsmal';
import { EArbeidssituasjon } from '../../../models/steg/aktivitet/aktivitet';

export const hvaErDinArbeidssituasjonSpm: ISpørsmål = {
  søknadid: 'hvaErDinArbeidssituasjon',
  tekstid: 'arbeidssituasjon.spm',
  svaralternativer: [
    {
      nøkkel: EArbeidssituasjon.erHjemmeMedBarnUnderEttÅr,
      svar_tekstid: 'arbeidssituasjon.svar.erHjemmeMedBarnUnderEttÅr',
    },
    {
      nøkkel: EArbeidssituasjon.erArbeidstaker,
      svar_tekstid: 'arbeidssituasjon.svar.erArbeidstaker',
    },
    {
      nøkkel: EArbeidssituasjon.erSelvstendigNæringsdriveneEllerFrilanser,
      svar_tekstid:
        'arbeidssituasjon.svar.erSelvstendigNæringsdriveneEllerFrilanser',
    },
    {
      nøkkel: EArbeidssituasjon.erAnsattIEgetAS,
      svar_tekstid: 'arbeidssituasjon.svar.erAnsattIEgetAS',
    },
    {
      nøkkel: EArbeidssituasjon.etablererEgenVirksomhet,
      svar_tekstid: 'arbeidssituasjon.svar.etablererEgenVirksomhet',
    },
    {
      nøkkel: EArbeidssituasjon.erArbeidssøker,
      svar_tekstid: 'arbeidssituasjon.svar.erArbeidssøker',
    },
    {
      nøkkel: EArbeidssituasjon.tarUtdanning,
      svar_tekstid: 'arbeidssituasjon.svar.tarUtdanning',
    },
    {
      nøkkel: EArbeidssituasjon.erHverkenIArbeidUtdanningEllerArbeidssøker,
      svar_tekstid:
        'arbeidssituasjon.svar.erHverkenIArbeidUtdanningEllerArbeidssøker',
    },
  ],
};
