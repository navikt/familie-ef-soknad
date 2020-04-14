import { NeiSvar } from '../../../../helpers/standardSvar';
import {
  EDokumentasjon,
  IDokumentasjon,
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

// DOKUMENTASJON CONFIG

export const DokumentasjonInngåttEkteskap: IDokumentasjon = {
  id: EDokumentasjon.INNGÅTT_EKTESKAP,
  spørsmålid: 'erUformeltGift',
  svarid: ESvar.JA,
  tittel: 'dokumentasjon.inngåttEkteskap.tittel',
  beskrivelse: 'dokumentasjon.inngåttEkteskap.beskrivelse',
  harSendtInn: false,
};

export const DokumentasjonSeparertEllerSkilt: IDokumentasjon = {
  id: EDokumentasjon.SEPARASJON_ELLER_SKILSMISSE,
  spørsmålid: ESivilstatusSøknadid.erUformeltSeparertEllerSkilt,
  svarid: ESvar.JA,
  tittel: 'dokumentasjon.separasjonEllerSkilsmisse.tittel',
  beskrivelse: 'dokumentasjon.separasjonEllerSkilsmisse.beskrivelse',
  harSendtInn: false,
};

export const BekreftelseSeparasjonSøknad: IDokumentasjon = {
  id: EDokumentasjon.SEPARASJON_ELLER_SKILSMISSE,
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
      dokumentasjonsbehov: DokumentasjonSeparertEllerSkilt,
    },
    NeiSvar,
  ],
};

export const BegrunnelseSpørsmål: ISpørsmål = {
  søknadid: ESivilstatusSøknadid.begrunnelseForSøknad,
  tekstid: 'sivilstatus.spm.begrunnelse',
  flersvar: false,
  svaralternativer: [
    {
      id: EBegrunnelse.samlivsbruddForeldre,
      svar_tekstid: 'sivilstatus.svar.samlivsbruddForeldre',
      alert_tekstid: 'sivilstatus.alert.samlivsbrudd',
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
    {
      id: EBegrunnelse.annet,
      svar_tekstid: 'sivilstatus.svar.annet',
    },
  ],
};
