import { ISpørsmål } from '../../../models/spørsmålogsvar';
import {
  ArbeidssituasjonType,
  EArbeidssituasjon,
} from '../../../models/steg/aktivitet/aktivitet';
import {
  AktivitetDokumentasjon,
  IDokumentasjon,
} from '../../../models/dokumentasjon';

// --- DOKUMENTASJON

const DokumentasjonUtdanning: IDokumentasjon = {
  id: AktivitetDokumentasjon.UTDANNING,
  spørsmålid: EArbeidssituasjon.hvaErDinArbeidssituasjon,
  svarid: ArbeidssituasjonType.tarUtdanning,
  tittel: 'dokumentasjon.utdanning.tittel',
  beskrivelse: 'dokumentasjon.utdanning.beskrivelse',
  harSendtInn: false,
};

// --- SPØRSMÅL

export const hvaErDinArbeidssituasjonSpm: ISpørsmål = {
  søknadid: EArbeidssituasjon.hvaErDinArbeidssituasjon,
  tekstid: 'arbeidssituasjon.spm',
  flersvar: true,
  svaralternativer: [
    {
      id: ArbeidssituasjonType.erHjemmeMedBarnUnderEttÅr,
      svar_tekstid: 'arbeidssituasjon.svar.erHjemmeMedBarnUnderEttÅr',
    },
    {
      id: ArbeidssituasjonType.erArbeidstaker,
      svar_tekstid: 'arbeidssituasjon.svar.erArbeidstaker',
    },
    {
      id: ArbeidssituasjonType.erSelvstendigNæringsdriveneEllerFrilanser,
      svar_tekstid:
        'arbeidssituasjon.svar.erSelvstendigNæringsdriveneEllerFrilanser',
    },
    {
      id: ArbeidssituasjonType.erAnsattIEgetAS,
      svar_tekstid: 'arbeidssituasjon.svar.erAnsattIEgetAS',
    },
    {
      id: ArbeidssituasjonType.etablererEgenVirksomhet,
      svar_tekstid: 'arbeidssituasjon.svar.etablererEgenVirksomhet',
    },
    {
      id: ArbeidssituasjonType.erArbeidssøker,
      svar_tekstid: 'arbeidssituasjon.svar.erArbeidssøker',
    },
    {
      id: ArbeidssituasjonType.tarUtdanning,
      svar_tekstid: 'arbeidssituasjon.svar.tarUtdanning',
      dokumentasjonsbehov: DokumentasjonUtdanning,
    },
    {
      id: ArbeidssituasjonType.erHverkenIArbeidUtdanningEllerArbeidssøker,
      svar_tekstid:
        'arbeidssituasjon.svar.erHverkenIArbeidUtdanningEllerArbeidssøker',
    },
  ],
};
