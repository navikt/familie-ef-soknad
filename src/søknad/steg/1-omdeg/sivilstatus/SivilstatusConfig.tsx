import { ISpørsmål, ESvar } from '../../../../models/spørsmålogsvar';
import { JaNeiSvar, NeiSvar } from '../../../../helpers/standardSvar';
import {
  EDokumentasjon,
  IDokumentasjon,
} from '../../../../models/dokumentasjon';
import {
  EBegrunnelseForSøknad,
  ESivilstatusSøknadid,
} from '../../../../models/steg/omDeg/sivilstatus';

// DOKUMENTASJON CONFIG

export const DokumentasjonInngåttEkteskap: IDokumentasjon = {
  id: EDokumentasjon.INNGÅTT_EKTESKAP,
  spørsmålid: 'erUformeltGift',
  svarid: [ESvar.JA],
  tittel: 'dokumentasjon.inngåttEkteskap.tittel',
  beskrivelse: 'dokumentasjon.inngåttEkteskap.beskrivelse',
  harSendtInn: false,
};

export const DokumentasjonSeparertEllerSkilt: IDokumentasjon = {
  id: EDokumentasjon.SEPARASJON_ELLER_SKILSMISSE,
  spørsmålid: ESivilstatusSøknadid.erUformeltSeparertEllerSkilt,
  svarid: [ESvar.JA],
  tittel: 'dokumentasjon.inngåttEkteskap.tittel',
  beskrivelse: 'dokumentasjon.inngåttEkteskap.beskrivelse',
  harSendtInn: false,
};

// SPØRSMÅL CONFIG

export const SeparasjonSpørsmål: ISpørsmål = {
  søknadid: ESivilstatusSøknadid.harSøktSeparasjon,
  tekstid: 'sivilstatus.spm.søktSeparasjon',
  svaralternativer: JaNeiSvar,
};

export const erUformeltGiftSpørsmål: ISpørsmål = {
  søknadid: ESivilstatusSøknadid.erUformeltGift,
  tekstid: 'sivilstatus.spm.erUformeltGift',
  lesmer: {
    åpneTekstid: 'sivilstatus.lesmer-åpne.erUformeltGift',
    lukkeTekstid: '',
    innholdTekstid: 'sivilstatus.lesmer-innhold.erUformeltGift',
  },
  svaralternativer: [
    {
      nøkkel: ESvar.JA,
      svar_tekstid: ESvar.JA,
      alert_tekstid: 'sivilstatus.alert.erUformeltGift',
      dokumentasjonsbehov: DokumentasjonInngåttEkteskap,
    },
    NeiSvar,
  ],
};

export const erUformeltSeparertEllerSkiltSpørsmål: ISpørsmål = {
  søknadid: 'erUformeltSeparertEllerSkilt',
  tekstid: 'sivilstatus.spm.erUformeltSeparertEllerSkilt',
  svaralternativer: [
    {
      nøkkel: ESvar.JA,
      svar_tekstid: ESvar.JA,
      alert_tekstid: 'sivilstatus.alert.erUformeltSeparertEllerSkilt',
      dokumentasjonsbehov: DokumentasjonSeparertEllerSkilt,
    },
    NeiSvar,
  ],
};

export const BegrunnelseSpørsmål: ISpørsmål = {
  søknadid: ESivilstatusSøknadid.begrunnelseForSøknad,
  tekstid: 'sivilstatus.spm.begrunnelse',
  svaralternativer: [
    {
      nøkkel: EBegrunnelseForSøknad.samlivsbruddForeldre,
      svar_tekstid: 'sivilstatus.svar.samlivsbruddForeldre',
      alert_tekstid: 'sivilstatus.alert.samlivsbrudd',
    },
    {
      nøkkel: EBegrunnelseForSøknad.samlivsbruddAndre,
      svar_tekstid: 'sivilstatus.svar.samlivsbruddAndre',
    },
    {
      nøkkel: EBegrunnelseForSøknad.aleneFraFødsel,
      svar_tekstid: 'sivilstatus.svar.aleneFraFødsel',
    },
    {
      nøkkel: EBegrunnelseForSøknad.endringISamværsordning,
      svar_tekstid: 'sivilstatus.svar.endringISamværsordning',
    },
    {
      nøkkel: EBegrunnelseForSøknad.dødsfall,
      svar_tekstid: 'sivilstatus.svar.dødsfall',
      alert_tekstid: 'sivilstatus.alert.dødsfall',
    },
    {
      nøkkel: EBegrunnelseForSøknad.annet,
      svar_tekstid: 'sivilstatus.svar.annet',
    },
  ],
};
