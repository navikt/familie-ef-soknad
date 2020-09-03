import { IDokumentasjon } from '../../../../models/steg/dokumentasjon';
import {
  EBegrunnelse,
  ESivilstatusSøknadid,
} from '../../../../models/steg/omDeg/sivilstatus';
import {
  ESvar,
  ESvarTekstid,
  ISpørsmål,
} from '../../../../models/felles/spørsmålogsvar';
import { NeiSvar } from '../../../../helpers/svar';
import { DokumentasjonsConfig } from '../../../DokumentasjonsConfig';

// DOKUMENTASJON CONFIG

const ErklæringSamlivsbrudd: IDokumentasjon =
  DokumentasjonsConfig.ErklæringSamlivsbrudd;

const DokumentasjonInngåttEkteskap: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonInngåttEkteskap;

const DokumentasjonUformeltSeparertEllerSkilt: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonUformeltSeparertEllerSkilt;

export const BekreftelseSeparasjonSøknad: IDokumentasjon =
  DokumentasjonsConfig.BekreftelseSeparasjonSøknad;

// SPØRSMÅL CONFIG

export const SeparasjonSpørsmål: ISpørsmål = {
  søknadid: ESivilstatusSøknadid.harSøktSeparasjon,
  tekstid: 'sivilstatus.spm.søktSeparasjon',
  flersvar: false,
  svaralternativer: [
    {
      id: ESvar.JA,
      svar_tekstid: ESvarTekstid.JA,
      dokumentasjonsbehov: BekreftelseSeparasjonSøknad,
    },
    NeiSvar,
  ],
};

export const erUformeltGiftSpørsmål: ISpørsmål = {
  søknadid: ESivilstatusSøknadid.erUformeltGift,
  tekstid: 'sivilstatus.spm.erUformeltGift',
  lesmer: {
    åpneTekstid: 'sivilstatus.lesmer-åpne.erUformeltGift',
    lukkeTekstid: '',
    innholdTekstid: 'sivilstatus.lesmer-innhold.erUformeltGift',
  },
  flersvar: false,
  svaralternativer: [
    {
      id: ESvar.JA,
      svar_tekstid: ESvarTekstid.JA,
      alert_tekstid: 'sivilstatus.alert.erUformeltGift',
      dokumentasjonsbehov: DokumentasjonInngåttEkteskap,
    },
    NeiSvar,
  ],
};

export const erUformeltSeparertEllerSkiltSpørsmål: ISpørsmål = {
  søknadid: ESivilstatusSøknadid.erUformeltSeparertEllerSkilt,
  tekstid: 'sivilstatus.spm.erUformeltSeparertEllerSkilt',
  flersvar: false,
  svaralternativer: [
    {
      id: ESvar.JA,
      svar_tekstid: ESvarTekstid.JA,
      alert_tekstid: 'sivilstatus.alert.erUformeltSeparertEllerSkilt',
      dokumentasjonsbehov: DokumentasjonUformeltSeparertEllerSkilt,
    },
    NeiSvar,
  ],
};

export const BegrunnelseSpørsmål: ISpørsmål = {
  søknadid: ESivilstatusSøknadid.årsakEnslig,
  tekstid: 'sivilstatus.spm.begrunnelse',
  flersvar: false,
  lesmer: {
    innholdTekstid: 'sivilstatus.hjelpetekst-innhold.begrunnelse',
    åpneTekstid: 'sivilstatus.hjelpetekst-åpne.begrunnelse',
    lukkeTekstid: '',
  },
  svaralternativer: [
    {
      id: EBegrunnelse.samlivsbruddForeldre,
      svar_tekstid: 'sivilstatus.svar.samlivsbruddForeldre',
      alert_tekstid: 'sivilstatus.alert.samlivsbrudd',
      dokumentasjonsbehov: ErklæringSamlivsbrudd,
    },
    {
      id: EBegrunnelse.samlivsbruddAndre,
      svar_tekstid: 'sivilstatus.svar.samlivsbruddAndre',
    },
    {
      id: EBegrunnelse.aleneFraFødsel,
      svar_tekstid: 'sivilstatus.svar.aleneFraFødsel',
    },
    {
      id: EBegrunnelse.endringISamværsordning,
      svar_tekstid: 'sivilstatus.svar.endringISamværsordning',
    },
    {
      id: EBegrunnelse.dødsfall,
      svar_tekstid: 'sivilstatus.svar.dødsfall',
      alert_tekstid: 'sivilstatus.alert.dødsfall',
    },
  ],
};
