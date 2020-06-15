import { ISpørsmål } from '../../../models/spørsmålogsvar';
import {
  EAktivitet,
  EArbeidssituasjon,
} from '../../../models/steg/aktivitet/aktivitet';
import {
  AktivitetDokumentasjon,
  IDokumentasjon,
  SituasjonDokumentasjon,
} from '../../../models/dokumentasjon';
import { ESituasjon } from '../../../models/steg/dinsituasjon/meromsituasjon';

// --- DOKUMENTASJON

const DokumentasjonUtdanning: IDokumentasjon = {
  id: AktivitetDokumentasjon.UTDANNING,
  spørsmålid: EArbeidssituasjon.hvaErDinArbeidssituasjon,
  svarid: EAktivitet.tarUtdanning,
  tittel: 'dokumentasjon.utdanning.tittel',
  beskrivelse: 'dokumentasjon.utdanning.beskrivelse',
  harSendtInn: false,
};

const DokumentasjonArbeidskontrakt: IDokumentasjon = {
  id: SituasjonDokumentasjon.ARBEIDSKONTRAKT,
  spørsmålid: ESituasjon.gjelderDetteDeg,
  svarid: EAktivitet.harFåttJobbTilbud,
  tittel: 'dokumentasjon.arbeidskontrakt.tittel',
  beskrivelse: 'dokumentasjon.arbeidskontrakt.beskrivelse',
  harSendtInn: false,
};

// --- SPØRSMÅL

export const hvaErDinArbeidssituasjonSpm: ISpørsmål = {
  søknadid: EArbeidssituasjon.hvaErDinArbeidssituasjon,
  tekstid: 'arbeidssituasjon.spm',
  flersvar: true,
  svaralternativer: [
    {
      id: EAktivitet.erHjemmeMedBarnUnderEttÅr,
      svar_tekstid: 'arbeidssituasjon.svar.erHjemmeMedBarnUnderEttÅr',
    },
    {
      id: EAktivitet.erArbeidstaker,
      svar_tekstid: 'arbeidssituasjon.svar.erArbeidstaker',
    },
    {
      id: EAktivitet.erSelvstendigNæringsdriveneEllerFrilanser,
      svar_tekstid:
        'arbeidssituasjon.svar.erSelvstendigNæringsdriveneEllerFrilanser',
    },
    {
      id: EAktivitet.erAnsattIEgetAS,
      svar_tekstid: 'arbeidssituasjon.svar.erAnsattIEgetAS',
    },
    {
      id: EAktivitet.etablererEgenVirksomhet,
      svar_tekstid: 'arbeidssituasjon.svar.etablererEgenVirksomhet',
    },
    {
      id: EAktivitet.erArbeidssøker,
      svar_tekstid: 'arbeidssituasjon.svar.erArbeidssøker',
    },
    {
      id: EAktivitet.tarUtdanning,
      svar_tekstid: 'arbeidssituasjon.svar.tarUtdanning',
      dokumentasjonsbehov: DokumentasjonUtdanning,
    },
    {
      id: EAktivitet.harFåttJobbTilbud,
      svar_tekstid: 'dinSituasjon.svar.harFåttJobbTilbud',
      dokumentasjonsbehov: DokumentasjonArbeidskontrakt,
    },
    {
      id: EAktivitet.erHverkenIArbeidUtdanningEllerArbeidssøker,
      svar_tekstid:
        'arbeidssituasjon.svar.erHverkenIArbeidUtdanningEllerArbeidssøker',
    },
  ],
};
