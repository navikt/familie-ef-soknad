import { ESvar, ISpørsmål } from '../../../models/felles/spørsmålogsvar';
import {
  EAktivitet,
  EArbeidssituasjon,
  ErIArbeid,
} from '../../../models/steg/aktivitet/aktivitet';
import {
  AktivitetDokumentasjon,
  IDokumentasjon,
  SituasjonDokumentasjon,
} from '../../../models/steg/dokumentasjon';
import { EArbeidssøker } from '../../../models/steg/aktivitet/arbeidssøker';

// --- DOKUMENTASJON

export const DokumentasjonIkkeVilligTilArbeid: IDokumentasjon = {
  id: SituasjonDokumentasjon.IKKE_VILLIG_TIL_ARBEID,
  spørsmålid: EArbeidssøker.villigTilÅTaImotTilbudOmArbeid,
  svarid: ESvar.NEI,
  label: '',
  tittel: 'dokumentasjon.ikke.villig.til.arbeid.tittel',
  beskrivelse: 'dokumentasjon.ikke.villig.til.arbeid.beskrivelse',
  harSendtInn: false,
};

export const DokumentasjonSyk: IDokumentasjon = {
  id: AktivitetDokumentasjon.FOR_SYK_TIL_Å_JOBBE,
  spørsmålid: EArbeidssituasjon.erDuIArbeid,
  svarid: ESvar.NEI,
  label: '',
  tittel: 'dokumentasjon.syk.tittel',
  beskrivelse: 'dokumentasjon.syk.beskrivelse',
  harSendtInn: false,
};

// --- SPØRSMÅL

export const ErDuIArbeidSpm: ISpørsmål = {
  søknadid: EArbeidssituasjon.erDuIArbeid,
  tekstid: 'erDuIArbeid.spm',
  flersvar: false,
  svaralternativer: [
    { id: ErIArbeid.JA, svar_tekstid: 'svar.ja' },
    {
      id: ErIArbeid.NeiFordiJegErSyk,
      svar_tekstid: 'erDuIArbeid.svar.nei',
      dokumentasjonsbehov: DokumentasjonSyk,
    },
  ],
};

export const hvaErDinArbeidssituasjonSpm: ISpørsmål = {
  søknadid: EArbeidssituasjon.hvaErDinArbeidssituasjon,
  tekstid: 'arbeidssituasjon.spm',
  lesmer: {
    åpneTekstid: '',
    lukkeTekstid: '',
    innholdTekstid: 'arbeidssituasjon.spm.hjelpetekst',
  },
  flersvar: true,
  svaralternativer: [
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
  ],
};
