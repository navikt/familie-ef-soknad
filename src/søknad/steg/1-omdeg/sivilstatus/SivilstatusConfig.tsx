import { IDokumentasjon } from '../../../../models/steg/dokumentasjon';
import {
  EBegrunnelse,
  ESivilstatusSøknadid,
} from '../../../../models/steg/omDeg/sivilstatus';
import { ISpørsmål } from '../../../../models/felles/spørsmålogsvar';
import { JaSvar, NeiSvar } from '../../../../helpers/svar';
import { DokumentasjonsConfig } from '../../../DokumentasjonsConfig';
import { LokalIntlShape } from '../../../../language/typer';

const ErklæringSamlivsbrudd: IDokumentasjon =
  DokumentasjonsConfig.ErklæringSamlivsbrudd;

const DokumentasjonInngåttEkteskap: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonInngåttEkteskap;

const DokumentasjonUformeltSeparertEllerSkilt: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonUformeltSeparertEllerSkilt;

export const BekreftelseSeparasjonSøknad: IDokumentasjon =
  DokumentasjonsConfig.BekreftelseSeparasjonSøknad;

export const harSøktSeparasjonSpørsmål = (intl: LokalIntlShape): ISpørsmål => ({
  søknadid: ESivilstatusSøknadid.harSøktSeparasjon,
  tekstid: 'sivilstatus.spm.søktSeparasjon',
  flersvar: false,
  svaralternativer: [
    { ...JaSvar(intl), dokumentasjonsbehov: BekreftelseSeparasjonSøknad },
    NeiSvar(intl),
  ],
});

export const erUformeltGiftSpørsmål = (intl: LokalIntlShape): ISpørsmål => ({
  søknadid: ESivilstatusSøknadid.erUformeltGift,
  tekstid: 'sivilstatus.spm.erUformeltGift',
  lesmer: {
    headerTekstid: 'sivilstatus.lesmer-åpne.erUformeltGift',
    innholdTekstid: 'sivilstatus.lesmer-innhold.erUformeltGift',
  },
  flersvar: false,
  svaralternativer: [
    {
      ...JaSvar(intl),
      alert_tekstid: 'sivilstatus.alert.erUformeltGift',
      dokumentasjonsbehov: DokumentasjonInngåttEkteskap,
    },
    NeiSvar(intl),
  ],
});

export const erUformeltSeparertEllerSkiltSpørsmål = (
  intl: LokalIntlShape
): ISpørsmål => ({
  søknadid: ESivilstatusSøknadid.erUformeltSeparertEllerSkilt,
  tekstid: 'sivilstatus.spm.erUformeltSeparertEllerSkilt',
  flersvar: false,
  svaralternativer: [
    {
      ...JaSvar(intl),
      alert_tekstid: 'sivilstatus.alert.erUformeltSeparertEllerSkilt',
      dokumentasjonsbehov: DokumentasjonUformeltSeparertEllerSkilt,
    },
    NeiSvar(intl),
  ],
});

export const begrunnelseSpørsmål = (intl: LokalIntlShape): ISpørsmål => ({
  søknadid: ESivilstatusSøknadid.årsakEnslig,
  tekstid: 'sivilstatus.spm.begrunnelse',
  flersvar: false,
  lesmer: {
    innholdTekstid: 'sivilstatus.hjelpetekst-innhold.begrunnelse',
    headerTekstid: 'sivilstatus.hjelpetekst-åpne.begrunnelse',
  },
  svaralternativer: [
    {
      id: EBegrunnelse.samlivsbruddForeldre,
      svar_tekst: intl.formatMessage({
        id: 'sivilstatus.svar.samlivsbruddForeldre',
      }),
      alert_tekstid: 'sivilstatus.alert.samlivsbrudd',
      dokumentasjonsbehov: ErklæringSamlivsbrudd,
    },
    {
      id: EBegrunnelse.samlivsbruddAndre,
      svar_tekst: intl.formatMessage({
        id: 'sivilstatus.svar.samlivsbruddAndre',
      }),
    },
    {
      id: EBegrunnelse.aleneFraFødsel,
      svar_tekst: intl.formatMessage({ id: 'sivilstatus.svar.aleneFraFødsel' }),
    },
    {
      id: EBegrunnelse.endringISamværsordning,
      svar_tekst: intl.formatMessage({
        id: 'sivilstatus.svar.endringISamværsordning',
      }),
    },
    {
      id: EBegrunnelse.dødsfall,
      svar_tekst: intl.formatMessage({ id: 'sivilstatus.svar.dødsfall' }),
      alert_tekstid: 'sivilstatus.alert.dødsfall',
    },
  ],
});
