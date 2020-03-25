import { ISpørsmål } from '../../../models/spørsmalogsvar';
import {
  EHarSamværMedBarn,
  EHarSkriftligSamværsavtale,
  EBorISammeHus,
  EHvorMyeSammen,
  ESkalBarnBoHosDeg,
} from '../../../models/steg/barnasbosted';
import { JaNeiSvar } from '../../../helpers/svar';

export const borINorge: ISpørsmål = {
  søknadid: 'borINorge',
  tekstid: 'barnasbosted.borinorge',
  svaralternativer: JaNeiSvar,
};

export const avtaleOmDeltBosted: ISpørsmål = {
  søknadid: 'avtaleOmDeltBosted',
  tekstid: 'barnasbosted.avtale',
  lesmer: {
    åpneTekstid: 'barnasbosted.hjelpetekst.bosted.apne',
    lukkeTekstid: '',
    innholdTekstid: 'barnasbosted.hjelpetekst.bosted.innhold',
  },
  svaralternativer: JaNeiSvar,
};

export const boddSammenFør: ISpørsmål = {
  søknadid: 'boddSammenFør',
  tekstid: 'barnasbosted.spm.boddsammenfør',
  svaralternativer: JaNeiSvar,
};

export const harAnnenForelderSamværMedBarn: ISpørsmål = {
  søknadid: 'harAnnenForelderSamværMedBarn',
  tekstid: 'barnasbosted.spm.harAnnenForelderSamværMedBarn',
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
  søknadid: 'harDereSkriftligSamværsavtale',
  tekstid: 'barnasbosted.spm.harDereSkriftligSamværsavtale',
  svaralternativer: [
    {
      id: EHarSkriftligSamværsavtale.jaKonkreteTidspunkter,
      svar_tekstid: 'barnasbosted.spm.jaKonkreteTidspunkt',
    },
    {
      id: EHarSkriftligSamværsavtale.jaIkkeKonkreteTidspunkter,
      svar_tekstid: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt',
    },
    {
      id: EHarSkriftligSamværsavtale.nei,
      svar_tekstid: 'barnasbosted.spm.nei',
    },
  ],
};

export const borISammeHus: ISpørsmål = {
  søknadid: 'borISammeHus',
  tekstid: 'barnasbosted.spm.borISammeHus',
  lesmer: {
    åpneTekstid: 'barnasbosted.hjelpetekst.borisammehus.apne',
    lukkeTekstid: '',
    innholdTekstid: 'barnasbosted.hjelpetekst.borisammehus.innhold',
  },
  svaralternativer: [
    {
      id: EBorISammeHus.ja,
      svar_tekstid: 'barnasbosted.spm.ja',
    },
    {
      id: EBorISammeHus.nei,
      svar_tekstid: 'barnasbosted.spm.nei',
    },
    {
      id: EBorISammeHus.vetikke,
      svar_tekstid: 'barnasbosted.spm.vetikke',
    },
  ],
};

export const hvorMyeSammen: ISpørsmål = {
  søknadid: 'hvorMyeSammen',
  tekstid: 'barnasbosted.spm.hvorMyeSammen',
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

export const skalBarnBoHosDeg: ISpørsmål = {
  søknadid: 'skalBarnBoHosDeg',
  tekstid: 'barnasbosted.spm.skalBarnBoHosDeg',
  svaralternativer: [
    {
      id: ESkalBarnBoHosDeg.ja,
      svar_tekstid: 'barnasbosted.spm.jaFolkeregistrert',
    },
    {
      id: ESkalBarnBoHosDeg.jaMenSamarbeiderIkke,
      svar_tekstid: 'barnasbosted.spm.jaMenSamarbeiderIkke',
    },
    {
      id: ESkalBarnBoHosDeg.nei,
      svar_tekstid: 'barnasbosted.spm.nei',
    },
  ],
};
