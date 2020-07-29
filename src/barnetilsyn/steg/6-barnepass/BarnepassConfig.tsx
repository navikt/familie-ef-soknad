import {
  BarnetilsynDokumentasjon,
  IDokumentasjon,
} from '../../../models/dokumentasjon';
import { ESvar, ISpørsmål } from '../../../models/spørsmålogsvar';
import { EBarnepass, ETypeBarnepassOrdning } from '../../models/barnepass';
import { ESøkerFraBestemtMåned } from '../../../models/steg/dinsituasjon/meromsituasjon';

// ----- DOKUMENTASJON

export const TidligereFakturaer: IDokumentasjon = {
  id: BarnetilsynDokumentasjon.TIDLIGERE_FAKTURAER,
  spørsmålid: EBarnepass.søkerFraBestemtMåned,
  label: '',
  svarid: ESvar.JA,
  tittel: 'dokumentasjon.tidligereFakturaer.tittel',
  beskrivelse: 'dokumentasjon.tidligereFakturaer.beskrivelse',
  harSendtInn: false,
};

// --- SPØRSMÅL

export const HvaSlagsBarnepassOrdningSpm: ISpørsmål = {
  søknadid: EBarnepass.hvaSlagsBarnepassOrdning,
  tekstid: 'barnepass.spm.hvaSlagsOrdning',
  flersvar: false,
  svaralternativer: [
    {
      id: ETypeBarnepassOrdning.barnehageOgLiknende,
      svar_tekstid: 'hvaSlagsOrdning.svar.barnehageOgLiknende',
    },
    {
      id: ETypeBarnepassOrdning.privat,
      svar_tekstid: 'hvaSlagsOrdning.svar.privat',
    },
  ],
};
export const SøkerDuStønadFraBestemtMndSpm: ISpørsmål = {
  søknadid: EBarnepass.søkerFraBestemtMåned,
  tekstid: 'søkerFraBestemtMåned.spm.barnepass',
  flersvar: false,
  lesmer: {
    åpneTekstid: 'søkerFraBestemtMåned.hjelpetekst-åpne.barnepass',
    innholdTekstid: 'søkerFraBestemtMåned.hjelpetekst-innhold.barnepass',
    lukkeTekstid: '',
  },
  svaralternativer: [
    {
      id: ESøkerFraBestemtMåned.ja,
      svar_tekstid: 'svar.ja',
      alert_tekstid: 'barnepass.dokumentasjon.søkerStønadFraBestemtMnd',
      dokumentasjonsbehov: TidligereFakturaer,
    },
    {
      id: ESøkerFraBestemtMåned.neiNavKanVurdere,
      svar_tekstid: 'søkerFraBestemtMåned.svar.neiNavKanVurdere',
    },
  ],
};
