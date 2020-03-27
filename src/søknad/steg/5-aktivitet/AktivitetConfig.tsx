import { ISpørsmål } from '../../../models/spørsmalogsvar';
import { EArbeidssituasjon } from '../../../models/steg/aktivitet/aktivitet';

export const hvaErDinArbeidssituasjonSpm: ISpørsmål = {
  søknadid: 'hvaErDinArbeidssituasjon',
  tekstid: 'arbeidssituasjon.spm',
  svaralternativer: [
    {
      id: EArbeidssituasjon.erHjemmeMedBarnUnderEttÅr,
      svar_tekstid: 'arbeidssituasjon.svar.erHjemmeMedBarnUnderEttÅr',
    },
    {
      id: EArbeidssituasjon.erArbeidstaker,
      svar_tekstid: 'arbeidssituasjon.svar.erArbeidstaker',
    },
    {
      id: EArbeidssituasjon.erSelvstendigNæringsdriveneEllerFrilanser,
      svar_tekstid:
        'arbeidssituasjon.svar.erSelvstendigNæringsdriveneEllerFrilanser',
    },
    {
      id: EArbeidssituasjon.erAnsattIEgetAS,
      svar_tekstid: 'arbeidssituasjon.svar.erAnsattIEgetAS',
    },
    {
      id: EArbeidssituasjon.etablererEgenVirksomhet,
      svar_tekstid: 'arbeidssituasjon.svar.etablererEgenVirksomhet',
    },
    {
      id: EArbeidssituasjon.erArbeidssøker,
      svar_tekstid: 'arbeidssituasjon.svar.erArbeidssøker',
    },
    {
      id: EArbeidssituasjon.tarUtdanning,
      svar_tekstid: 'arbeidssituasjon.svar.tarUtdanning',
    },
    {
      id: EArbeidssituasjon.erHverkenIArbeidUtdanningEllerArbeidssøker,
      svar_tekstid:
        'arbeidssituasjon.svar.erHverkenIArbeidUtdanningEllerArbeidssøker',
    },
  ],
};
