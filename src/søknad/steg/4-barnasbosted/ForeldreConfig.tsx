import { ISpørsmål } from '../../../models/felles/spørsmålogsvar';
import {
  EBorAnnenForelderISammeHus,
  EHarSamværMedBarn,
  EHarSkriftligSamværsavtale,
  EHvorforIkkeOppgi,
  EHvorMyeSammen,
  ESkalBarnetBoHosSøker,
} from '../../../models/steg/barnasbosted';
import { IDokumentasjon } from '../../../models/steg/dokumentasjon';

import { EForelder } from '../../../models/steg/forelder';
import { JaNeiSvar, JaSvar, NeiSvar } from '../../../helpers/svar';
import { DokumentasjonsConfig } from '../../DokumentasjonsConfig';
import { IntlShape } from 'react-intl';

// --- Dokumentasjon

const DokumentasjonBarnBorHosDeg: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonBarnBorHosDeg;

const AvtaleOmDeltBosted: IDokumentasjon =
  DokumentasjonsConfig.AvtaleOmDeltBosted;

const SamværsavtaleMedKonkreteTidspunkter: IDokumentasjon =
  DokumentasjonsConfig.SamværsavtaleMedKonkreteTidspunkter;

const SamværsavtaleUtenKonkreteTidspunkter: IDokumentasjon =
  DokumentasjonsConfig.SamværsavtaleUtenKonkreteTidspunkter;
// --- Spørsmål

export const borINorge = (intl: IntlShape): ISpørsmål => ({
  søknadid: EForelder.borINorge,
  tekstid: 'barnasbosted.borinorge',
  flersvar: false,
  svaralternativer: JaNeiSvar(intl),
});

export const avtaleOmDeltBosted = (
  intl: IntlShape,
  født: Boolean
): ISpørsmål => ({
  søknadid: EForelder.avtaleOmDeltBosted,
  tekstid: født ? 'barnasbosted.avtale' : 'barnasbosted.avtale.ufødt',
  flersvar: false,
  lesmer: {
    åpneTekstid: '',
    lukkeTekstid: '',
    innholdTekstid: 'barnasbosted.hjelpetekst.bosted.innhold',
  },
  svaralternativer: [
    {
      ...JaSvar(intl),
      alert_tekstid: 'barnasbosted.alert-advarsel.avtaleDeltBosted',
      dokumentasjonsbehov: AvtaleOmDeltBosted,
    },
    NeiSvar(intl),
  ],
});

export const boddSammenFør = (intl: IntlShape): ISpørsmål => ({
  søknadid: 'boddSammenFør',
  tekstid: 'barnasbosted.spm.boddsammenfør',
  flersvar: false,
  svaralternativer: JaNeiSvar(intl),
});

export const hvorforIkkeOppgi = (intl: IntlShape): ISpørsmål => ({
  søknadid: EForelder.hvorforIkkeOppgi,
  tekstid: 'barnasbosted.spm.hvorforikkeoppgi',
  flersvar: false,
  svaralternativer: [
    {
      id: EHvorforIkkeOppgi.donorbarn,
      svar_tekst: intl.formatMessage({ id: 'barnasbosted.spm.donorbarn' }),
    },
    {
      id: EHvorforIkkeOppgi.annet,
      svar_tekst: intl.formatMessage({ id: 'barnasbosted.spm.annet' }),
    },
  ],
});

export const harAnnenForelderSamværMedBarn = (intl: IntlShape): ISpørsmål => ({
  søknadid: EForelder.harAnnenForelderSamværMedBarn,
  tekstid: 'barnasbosted.spm.harAnnenForelderSamværMedBarn',
  flersvar: false,
  lesmer: {
    åpneTekstid: '',
    lukkeTekstid: '',
    innholdTekstid: 'barnasbosted.hjelpetekst.samvær.innhold',
  },
  svaralternativer: [
    {
      id: EHarSamværMedBarn.jaIkkeMerEnnVanlig,
      svar_tekst: intl.formatMessage({
        id: 'barnasbosted.spm.jaIkkeMerEnnVanlig',
      }),
    },
    {
      id: EHarSamværMedBarn.jaMerEnnVanlig,
      svar_tekst: intl.formatMessage({ id: 'barnasbosted.spm.jaMerEnnVanlig' }),
    },
    {
      id: EHarSamværMedBarn.nei,
      svar_tekst: intl.formatMessage({
        id: 'barnasbosted.spm.andreForelderenSamværNei',
      }),
    },
  ],
});

export const harDereSkriftligSamværsavtale = (intl: IntlShape): ISpørsmål => ({
  søknadid: EForelder.harDereSkriftligSamværsavtale,
  tekstid: 'barnasbosted.spm.harDereSkriftligSamværsavtale',
  flersvar: false,
  lesmer: {
    innholdTekstid:
      'barnasbosted.hjelpetekst-innhold.harDereSkriftligSamværsavtale',
    åpneTekstid: 'barnasbosted.hjelpetekst-åpne.harDereSkriftligSamværsavtale',
    lukkeTekstid: '',
  },
  svaralternativer: [
    {
      id: EHarSkriftligSamværsavtale.jaKonkreteTidspunkter,
      svar_tekst: intl.formatMessage({
        id: 'barnasbosted.spm.jaKonkreteTidspunkt',
      }),
      dokumentasjonsbehov: SamværsavtaleMedKonkreteTidspunkter,
    },
    {
      id: EHarSkriftligSamværsavtale.jaIkkeKonkreteTidspunkter,
      svar_tekst: intl.formatMessage({
        id: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt',
      }),
      dokumentasjonsbehov: SamværsavtaleUtenKonkreteTidspunkter,
    },
    {
      id: EHarSkriftligSamværsavtale.nei,
      svar_tekst: intl.formatMessage({ id: 'barnasbosted.spm.nei' }),
    },
  ],
});

export const borAnnenForelderISammeHus = (intl: IntlShape): ISpørsmål => ({
  søknadid: 'borAnnenForelderISammeHus',
  tekstid: 'barnasbosted.spm.borAnnenForelderISammeHus',
  lesmer: {
    åpneTekstid: 'barnasbosted.hjelpetekst.borAnnenForelderISammeHus.apne',
    lukkeTekstid: '',
    innholdTekstid:
      'barnasbosted.hjelpetekst.borAnnenForelderISammeHus.innhold',
  },
  flersvar: false,
  svaralternativer: [
    {
      id: EBorAnnenForelderISammeHus.ja,
      svar_tekst: intl.formatMessage({ id: 'barnasbosted.spm.ja' }),
    },
    {
      id: EBorAnnenForelderISammeHus.nei,
      svar_tekst: intl.formatMessage({ id: 'barnasbosted.spm.nei' }),
    },
    {
      id: EBorAnnenForelderISammeHus.vetikke,
      svar_tekst: intl.formatMessage({ id: 'barnasbosted.spm.vetikke' }),
    },
  ],
});

export const hvorMyeSammen = (intl: IntlShape): ISpørsmål => ({
  søknadid: 'hvorMyeSammen',
  tekstid: 'barnasbosted.spm.hvorMyeSammen',
  flersvar: false,
  lesmer: {
    åpneTekstid: 'barnasbosted.lesmer-åpne.hvorMyeSammen',
    lukkeTekstid: '',
    innholdTekstid: 'barnasbosted.lesmer-innhold.hvorMyeSammen',
  },
  svaralternativer: [
    {
      id: EHvorMyeSammen.møtesIkke,
      svar_tekst: intl.formatMessage({ id: 'barnasbosted.spm.møtesIkke' }),
    },
    {
      id: EHvorMyeSammen.kunNårLeveres,
      svar_tekst: intl.formatMessage({ id: 'barnasbosted.spm.kunNårLeveres' }),
    },
    {
      id: EHvorMyeSammen.møtesUtenom,
      svar_tekst: intl.formatMessage({ id: 'barnasbosted.spm.møtesUtenom' }),
    },
  ],
});

export const skalBarnetBoHosSøker = (intl: IntlShape): ISpørsmål => ({
  søknadid: EForelder.skalBarnetBoHosSøker,
  tekstid: 'barnasbosted.spm.skalBarnetBoHosSøker',
  flersvar: false,
  svaralternativer: [
    {
      id: ESkalBarnetBoHosSøker.ja,
      svar_tekst: intl.formatMessage({
        id: 'barnasbosted.spm.jaFolkeregistrert',
      }),
    },
    {
      id: ESkalBarnetBoHosSøker.jaMenSamarbeiderIkke,
      svar_tekst: intl.formatMessage({
        id: 'barnasbosted.spm.jaMenSamarbeiderIkke',
      }),
      dokumentasjonsbehov: DokumentasjonBarnBorHosDeg,
    },
    {
      id: ESkalBarnetBoHosSøker.nei,
      svar_tekst: intl.formatMessage({ id: 'barnasbosted.spm.nei' }),
    },
  ],
});
