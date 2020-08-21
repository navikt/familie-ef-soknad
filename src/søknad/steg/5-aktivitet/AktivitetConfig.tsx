import { ESvar, ISpørsmål } from '../../../models/felles/spørsmålogsvar';
import {
  EAktivitet,
  EArbeidssituasjon,
} from '../../../models/steg/aktivitet/aktivitet';
import {
  AktivitetDokumentasjon,
  IDokumentasjon,
  SituasjonDokumentasjon,
} from '../../../models/steg/dokumentasjon';
import { ESituasjon } from '../../../models/steg/dinsituasjon/meromsituasjon';
import { EArbeidssøker } from '../../../models/steg/aktivitet/arbeidssøker';
import { EUtdanning } from '../../../models/steg/aktivitet/utdanning';

// --- DOKUMENTASJON

export const DokumentasjonUtgifterUtdanning: IDokumentasjon = {
  id: AktivitetDokumentasjon.UTGIFTER_UTDANNING,
  spørsmålid: EUtdanning.semesteravgift,
  svarid: EAktivitet.tarUtdanning,
  label: '',
  tittel: 'utdanning.label.utgifter',
  beskrivelse: 'utdanning.label.utgifter.dokumentasjon',
  harSendtInn: false,
};

export const DokumentasjonUtdanning: IDokumentasjon = {
  id: AktivitetDokumentasjon.UTDANNING,
  spørsmålid: EArbeidssituasjon.hvaErDinArbeidssituasjon,
  svarid: EAktivitet.tarUtdanning,
  label: '',
  tittel: 'dokumentasjon.utdanning.tittel',
  beskrivelse: 'dokumentasjon.utdanning.beskrivelse',
  harSendtInn: false,
};

const DokumentasjonArbeidskontrakt: IDokumentasjon = {
  id: SituasjonDokumentasjon.ARBEIDSKONTRAKT,
  spørsmålid: ESituasjon.gjelderDetteDeg,
  svarid: EAktivitet.harFåttJobbTilbud,
  label: '',
  tittel: 'dokumentasjon.arbeidskontrakt.tittel',
  beskrivelse: 'dokumentasjon.arbeidskontrakt.beskrivelse',
  harSendtInn: false,
};

export const DokumentasjonIkkeVilligTilArbeid: IDokumentasjon = {
  id: SituasjonDokumentasjon.IKKE_VILLIG_TIL_ARBEID,
  spørsmålid: EArbeidssøker.villigTilÅTaImotTilbudOmArbeid,
  svarid: ESvar.NEI,
  label: '',
  tittel: 'dokumentasjon.ikke.villig.til.arbeid.tittel',
  beskrivelse: 'dokumentasjon.ikke.villig.til.arbeid.beskrivelse',
  harSendtInn: false,
};

export const DokumentasjonOmVirksomhetenDuEtablerer: IDokumentasjon = {
  id: AktivitetDokumentasjon.OM_VIRKSOMHETEN_DU_ETABLERER,
  spørsmålid: EArbeidssituasjon.hvaErDinArbeidssituasjon,
  svarid: EAktivitet.etablererEgenVirksomhet,
  label: '',
  tittel: 'dokumentasjon.etablererEgenVirksomhet.tittel',
  beskrivelse: 'dokumentasjon.etablererEgenVirksomhet.beskrivelse',
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
      id: EAktivitet.harFåttJobbTilbud,
      svar_tekstid: 'arbeidssituasjon.svar.harFåttJobbTilbud',
      dokumentasjonsbehov: DokumentasjonArbeidskontrakt,
    },
    {
      id: EAktivitet.etablererEgenVirksomhet,
      svar_tekstid: 'arbeidssituasjon.svar.etablererEgenVirksomhet',
      dokumentasjonsbehov: DokumentasjonOmVirksomhetenDuEtablerer,
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
      id: EAktivitet.erHverkenIArbeidUtdanningEllerArbeidssøker,
      svar_tekstid:
        'arbeidssituasjon.svar.erHverkenIArbeidUtdanningEllerArbeidssøker',
    },
  ],
};
