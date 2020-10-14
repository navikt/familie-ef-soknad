import { IDokumentasjon } from '../../../models/steg/dokumentasjon';
import { ISpørsmål } from '../../../models/felles/spørsmålogsvar';
import {
  EBarnepass,
  ETypeBarnepassOrdning,
  EÅrsakBarnepass,
} from '../../models/barnepass';
import { ESøkerFraBestemtMåned } from '../../../models/steg/dinsituasjon/meromsituasjon';
import { DokumentasjonsConfig } from '../../../søknad/DokumentasjonsConfig';

// ----- DOKUMENTASJON

export const FakturaFraBarnepassordning: IDokumentasjon =
  DokumentasjonsConfig.FakturaFraBarnepassordning;
export const AvtaleMedBarnepasser: IDokumentasjon =
  DokumentasjonsConfig.AvtaleMedBarnepasser;

export const DokumentasjonTrengerMerPassEnnJevnaldrede: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonTrengerMerPassEnnJevnaldrede;
export const DokumentasjonUtenomVanligArbeidstid: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonUtenomVanligArbeidstid;
export const DokumentasjonMyeBortePgaJobb: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonMyeBortePgaJobb;

// --- SPØRSMÅL

export const årsakBarnepass: ISpørsmål = {
  søknadid: EBarnepass.årsakBarnepass,
  tekstid: 'barnepass.spm.årsak',
  flersvar: false,
  svaralternativer: [
    {
      id: EÅrsakBarnepass.trengerMerPassEnnJevnaldrede,
      svar_tekstid: 'barnepass.svar.trengerMerPassEnnJevnaldrede',
      alert_tekstid: 'barnepass.dokumentasjon.trengerMerPassEnnJevnaldrede',
      dokumentasjonsbehov: DokumentasjonTrengerMerPassEnnJevnaldrede,
    },
    {
      id: EÅrsakBarnepass.myeBortePgaJobb,
      svar_tekstid: 'barnepass.svar.myeBortePgaJobb',
      alert_tekstid: 'barnepass.dokumentasjon.arbeidstid',
      dokumentasjonsbehov: DokumentasjonMyeBortePgaJobb,
    },
    {
      id: EÅrsakBarnepass.utenomVanligArbeidstid,
      svar_tekstid: 'barnepass.svar.utenomVanligArbeidstid',
      alert_tekstid: 'barnepass.dokumentasjon.arbeidstid',
      dokumentasjonsbehov: DokumentasjonUtenomVanligArbeidstid,
    },
  ],
};

export const HvaSlagsBarnepassOrdningSpm: ISpørsmål = {
  søknadid: EBarnepass.hvaSlagsBarnepassOrdning,
  tekstid: 'barnepass.spm.hvaSlagsOrdning',
  flersvar: false,
  svaralternativer: [
    {
      id: ETypeBarnepassOrdning.barnehageOgLiknende,
      svar_tekstid: 'hvaSlagsOrdning.svar.barnehageOgLiknende',
      dokumentasjonsbehov: FakturaFraBarnepassordning,
    },
    {
      id: ETypeBarnepassOrdning.privat,
      svar_tekstid: 'hvaSlagsOrdning.svar.privat',
      dokumentasjonsbehov: AvtaleMedBarnepasser,
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
    },
    {
      id: ESøkerFraBestemtMåned.neiNavKanVurdere,
      svar_tekstid: 'søkerFraBestemtMåned.svar.neiNavKanVurdere',
    },
  ],
};
