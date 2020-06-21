import { ESvar, ESvarTekstid, ISpørsmål } from '../../../models/spørsmålogsvar';
import {
  EHarSamværMedBarn,
  EHarSkriftligSamværsavtale,
  EBorAnnenForelderISammeHus,
  EHvorMyeSammen,
  ESkalBarnetBoHosSøker,
  EHvorforIkkeOppgi,
} from '../../../models/steg/barnasbosted';
import {
  BarnasBostedDokumentasjon,
  IDokumentasjon,
} from '../../../models/dokumentasjon';

import { EForelder } from '../../../models/forelder';
import { JaNeiSvar, NeiSvar } from '../../../helpers/svar';

// --- Dokumentasjon

const DokumentasjonBarnBorHosDeg: IDokumentasjon = {
  id: BarnasBostedDokumentasjon.BARN_BOR_HOS_SØKER,
  spørsmålid: EForelder.skalBarnetBoHosSøker,
  svarid: ESkalBarnetBoHosSøker.jaMenSamarbeiderIkke,
  tittel: 'dokumentasjon.barnBorHosSøker.tittel',
  beskrivelse: 'dokumentasjon.barnBorHosSøker.beskrivelse',
  harSendtInn: false,
};

const AvtaleOmDeltBosted: IDokumentasjon = {
  id: BarnasBostedDokumentasjon.DELT_BOSTED,
  spørsmålid: EForelder.avtaleOmDeltBosted,
  svarid: ESvar.JA,
  tittel: 'dokumentasjon.deltBosted.tittel',
  beskrivelse: 'dokumentasjon.deltBosted.beskrivelse',
  harSendtInn: false,
};

const SamværsavtaleMedKonkreteTidspunkter: IDokumentasjon = {
  id: BarnasBostedDokumentasjon.SAMVÆRSAVTALE,
  spørsmålid: EForelder.harDereSkriftligSamværsavtale,
  svarid: EHarSkriftligSamværsavtale.jaKonkreteTidspunkter,
  tittel: 'dokumentasjon.samværsavtale.tittel',
  harSendtInn: false,
};

const SamværsavtaleUtenKonkreteTidspunkter: IDokumentasjon = {
  id: BarnasBostedDokumentasjon.SAMVÆRSAVTALE,
  spørsmålid: EForelder.harDereSkriftligSamværsavtale,
  svarid: EHarSkriftligSamværsavtale.jaIkkeKonkreteTidspunkter,
  tittel: 'dokumentasjon.samværsavtale.tittel',
  harSendtInn: false,
};
// --- Spørsmål

export const borINorge: ISpørsmål = {
  søknadid: EForelder.borINorge,
  tekstid: 'barnasbosted.borinorge',
  flersvar: false,
  svaralternativer: JaNeiSvar,
};

export const avtaleOmDeltBosted: ISpørsmål = {
  søknadid: EForelder.avtaleOmDeltBosted,
  tekstid: 'barnasbosted.avtale',
  flersvar: false,
  lesmer: {
    åpneTekstid: 'barnasbosted.hjelpetekst.bosted.apne',
    lukkeTekstid: '',
    innholdTekstid: 'barnasbosted.hjelpetekst.bosted.innhold',
  },
  svaralternativer: [
    {
      id: ESvar.JA,
      svar_tekstid: ESvarTekstid.JA,
      alert_tekstid: 'barnasbosted.alert-advarsel.avtaleDeltBosted',
      dokumentasjonsbehov: AvtaleOmDeltBosted,
    },
    NeiSvar,
  ],
};

export const boddSammenFør: ISpørsmål = {
  søknadid: 'boddSammenFør',
  tekstid: 'barnasbosted.spm.boddsammenfør',
  flersvar: false,
  svaralternativer: JaNeiSvar,
};

export const hvorforIkkeOppgi: ISpørsmål = {
  søknadid: EForelder.hvorforIkkeOppgi,
  tekstid: 'barnasbosted.spm.hvorforikkeoppgi',
  flersvar: false,
  svaralternativer: [
    {
      id: EHvorforIkkeOppgi.donorbarn,
      svar_tekstid: 'barnasbosted.spm.donorbarn',
    },
    {
      id: EHvorforIkkeOppgi.annet,
      svar_tekstid: 'barnasbosted.spm.annet',
    },
  ],
};

export const harAnnenForelderSamværMedBarn: ISpørsmål = {
  søknadid: EForelder.harAnnenForelderSamværMedBarn,
  tekstid: 'barnasbosted.spm.harAnnenForelderSamværMedBarn',
  flersvar: false,
  lesmer: {
    åpneTekstid: 'barnasbosted.hjelpetekst.samvær.apne',
    lukkeTekstid: '',
    innholdTekstid: 'barnasbosted.hjelpetekst.samvær.innhold',
  },
  svaralternativer: [
    {
      id: EHarSamværMedBarn.jaIkkeMerEnnVanlig,
      svar_tekstid: 'barnasbosted.spm.jaIkkeMerEnnVanlig',
    },
    {
      id: EHarSamværMedBarn.jaMerEnnVanlig,
      svar_tekstid: 'barnasbosted.spm.jaMerEnnVanlig',
    },
    {
      id: EHarSamværMedBarn.nei,
      svar_tekstid: 'barnasbosted.spm.andreForelderenSamværNei',
    },
  ],
};

export const harDereSkriftligSamværsavtale: ISpørsmål = {
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
      svar_tekstid: 'barnasbosted.spm.jaKonkreteTidspunkt',
      dokumentasjonsbehov: SamværsavtaleMedKonkreteTidspunkter,
    },
    {
      id: EHarSkriftligSamværsavtale.jaIkkeKonkreteTidspunkter,
      svar_tekstid: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt',
      dokumentasjonsbehov: SamværsavtaleUtenKonkreteTidspunkter,
    },
    {
      id: EHarSkriftligSamværsavtale.nei,
      svar_tekstid: 'barnasbosted.spm.nei',
    },
  ],
};

export const borAnnenForelderISammeHus: ISpørsmål = {
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
      svar_tekstid: 'barnasbosted.spm.ja',
    },
    {
      id: EBorAnnenForelderISammeHus.nei,
      svar_tekstid: 'barnasbosted.spm.nei',
    },
    {
      id: EBorAnnenForelderISammeHus.vetikke,
      svar_tekstid: 'barnasbosted.spm.vetikke',
    },
  ],
};

export const hvorMyeSammen: ISpørsmål = {
  søknadid: 'hvorMyeSammen',
  tekstid: 'barnasbosted.spm.hvorMyeSammen',
  flersvar: false,
  svaralternativer: [
    {
      id: EHvorMyeSammen.møtesIkke,
      svar_tekstid: 'barnasbosted.spm.møtesIkke',
    },
    {
      id: EHvorMyeSammen.kunNårLeveres,
      svar_tekstid: 'barnasbosted.spm.kunNårLeveres',
    },
    {
      id: EHvorMyeSammen.møtesUtenom,
      svar_tekstid: 'barnasbosted.spm.møtesUtenom',
    },
  ],
};

export const skalBarnetBoHosSøker: ISpørsmål = {
  søknadid: EForelder.skalBarnetBoHosSøker,
  tekstid: 'barnasbosted.spm.skalBarnetBoHosSøker',
  flersvar: false,
  svaralternativer: [
    {
      id: ESkalBarnetBoHosSøker.ja,
      svar_tekstid: 'barnasbosted.spm.jaFolkeregistrert',
    },
    {
      id: ESkalBarnetBoHosSøker.jaMenSamarbeiderIkke,
      svar_tekstid: 'barnasbosted.spm.jaMenSamarbeiderIkke',
      dokumentasjonsbehov: DokumentasjonBarnBorHosDeg,
    },
    {
      id: ESkalBarnetBoHosSøker.nei,
      svar_tekstid: 'barnasbosted.spm.nei',
    },
  ],
};
