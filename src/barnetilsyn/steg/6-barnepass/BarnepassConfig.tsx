import {
  BarnetilsynDokumentasjon,
  IDokumentasjon,
} from '../../../models/dokumentasjon';
import { ESvar, ISpørsmål } from '../../../models/spørsmålogsvar';
import { ErIArbeid } from '../../../models/steg/aktivitet/aktivitet';
import { EBarnepass } from '../../models/barnepass';
import { ESøkerFraBestemtMåned } from '../../../models/steg/dinsituasjon/meromsituasjon';

// ----- DOKUMENTASJON

export const TidligereFakturaer: IDokumentasjon = {
  id: BarnetilsynDokumentasjon.TIDLIGERE_FAKTURAER,
  spørsmålid: EBarnepass.søkerFraBestemtMåned,
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
    { id: ErIArbeid.JA, svar_tekstid: 'svar.ja' },
    { id: ErIArbeid.NeiFordiJegErSyk, svar_tekstid: 'erDuIArbeid.svar.nei' },
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
