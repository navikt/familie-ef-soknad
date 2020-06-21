import {
  IDokumentasjon,
  OmDegDokumentasjon,
} from '../../../../models/dokumentasjon';
import {
  EBegrunnelse,
  ESivilstatusSøknadid,
} from '../../../../models/steg/omDeg/sivilstatus';
import {
  ESvar,
  ESvarTekstid,
  ISpørsmål,
} from '../../../../models/spørsmålogsvar';
import { NeiSvar } from '../../../../helpers/svar';

// DOKUMENTASJON CONFIG

const ErklæringSamlivsbrudd: IDokumentasjon = {
  id: OmDegDokumentasjon.SAMLIVSBRUDD,
  spørsmålid: ESivilstatusSøknadid.årsakEnslig,
  svarid: EBegrunnelse.samlivsbruddForeldre,
  tittel: 'dokumentasjon.begrunnelse.tittel',
  beskrivelse: 'dokumentasjon.begrunnelse.beskrivelse',
  harSendtInn: false,
};

const DokumentasjonInngåttEkteskap: IDokumentasjon = {
  id: OmDegDokumentasjon.INNGÅTT_EKTESKAP,
  spørsmålid: ESivilstatusSøknadid.erUformeltGift,
  svarid: ESvar.JA,
  tittel: 'dokumentasjon.inngåttEkteskap.tittel',
  beskrivelse: 'dokumentasjon.inngåttEkteskap.beskrivelse',
  harSendtInn: false,
};

const DokumentasjonUformeltSeparertEllerSkilt: IDokumentasjon = {
  id: OmDegDokumentasjon.UFORMELL_SEPARASJON_ELLER_SKILSMISSE,
  spørsmålid: ESivilstatusSøknadid.erUformeltSeparertEllerSkilt,
  svarid: ESvar.JA,
  tittel: 'dokumentasjon.separasjonEllerSkilsmisse.tittel',
  beskrivelse: 'dokumentasjon.separasjonEllerSkilsmisse.beskrivelse',
  harSendtInn: false,
};

export const BekreftelseSeparasjonSøknad: IDokumentasjon = {
  id: OmDegDokumentasjon.SEPARASJON_ELLER_SKILSMISSE,
  spørsmålid: ESivilstatusSøknadid.harSøktSeparasjon,
  svarid: ESvar.JA,
  tittel: 'dokumentasjon.søktSeparasjon.tittel',
  beskrivelse: 'dokumentasjon.søktSeparasjon.beskrivelse',
  harSendtInn: false,
};

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
