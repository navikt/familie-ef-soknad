import { IJaNeiSpørsmål, standardJaNeiSvar, IMultiSpørsmål } from '../../../models/spørsmal';
import { EHarSamværMedBarn, EHarSkriftligSamværsavtale, EBorISammeHus, EHvorMyeSammen } from '../../../models/barnasbosted';

export const borINorge: IJaNeiSpørsmål = {
    spørsmål_id: 'borINorge',
    tekstid: 'barnasbosted.borinorge',
    svaralternativer: standardJaNeiSvar,
};

export const avtaleOmDeltBosted: IJaNeiSpørsmål = {
    spørsmål_id: 'avtaleOmDeltBosted',
    tekstid: 'barnasbosted.avtale',
    lesmer: {
      åpneTekstid: 'barnasbosted.hjelpetekst.bosted.apne',
      lukkeTekstid: '',
      innholdTekstid: 'barnasbosted.hjelpetekst.bosted.innhold',
    },
    svaralternativer: standardJaNeiSvar,
};

export const boddSammenFør: IJaNeiSpørsmål = {
  spørsmål_id: 'boddSammenFør',
  tekstid: 'barnasbosted.spm.boddsammenfør',
  svaralternativer: standardJaNeiSvar,
}

export const harAnnenForelderSamværMedBarn: IMultiSpørsmål = {
    spørsmål_id: 'harAnnenForelderSamværMedBarn',
    tekstid: 'barnasbosted.spm.harAnnenForelderSamværMedBarn',
    lesmer: {
      åpneTekstid: 'barnasbosted.hjelpetekst.samvær.apne',
      lukkeTekstid: '',
      innholdTekstid: 'barnasbosted.hjelpetekst.samvær.innhold',
    },
    svaralternativer: [
      {
        nøkkel: EHarSamværMedBarn.jaIkkeMerEnnVanlig,
        svar_tekstid: 'barnasbosted.spm.jaIkkeMerEnnVanlig',
      },
      {
        nøkkel: EHarSamværMedBarn.jaMerEnnVanlig,
        svar_tekstid: 'barnasbosted.spm.jaMerEnnVanlig'
      },
      {
        nøkkel: EHarSamværMedBarn.nei,
        svar_tekstid: 'barnasbosted.spm.andreForelderenSamværNei'
      }
    ],
  };

export const harDereSkriftligSamværsavtale: IMultiSpørsmål = {
  spørsmål_id: 'harDereSkriftligSamværsavtale',
  tekstid: 'barnasbosted.spm.harDereSkriftligSamværsavtale',
  svaralternativer: [
    {
      nøkkel: EHarSkriftligSamværsavtale.jaKonkreteTidspunkter,
      svar_tekstid: 'barnasbosted.spm.jaKonkreteTidspunkt',
    },
    {
      nøkkel: EHarSkriftligSamværsavtale.jaIkkeKonkreteTidspunkter,
      svar_tekstid: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt'
    },
    {
      nøkkel: EHarSkriftligSamværsavtale.nei,
      svar_tekstid: 'barnasbosted.spm.nei'
    }
  ],
};

export const borISammeHus: IMultiSpørsmål = {
  spørsmål_id: 'borISammeHus',
  tekstid: 'barnasbosted.spm.borISammeHus',
  lesmer: {
    åpneTekstid: 'barnasbosted.hjelpetekst.borisammehus.apne',
    lukkeTekstid: '',
    innholdTekstid: 'barnasbosted.hjelpetekst.borisammehus.innhold',
  },
  svaralternativer: [
    {
      nøkkel: EBorISammeHus.ja,
      svar_tekstid: 'barnasbosted.spm.ja',
    },
    {
      nøkkel: EBorISammeHus.nei,
      svar_tekstid: 'barnasbosted.spm.nei'
    },
    {
      nøkkel: EBorISammeHus.vetikke,
      svar_tekstid: 'barnasbosted.spm.vetikke'
    }
  ],
}

export const hvorMyeSammen: IMultiSpørsmål = {
  spørsmål_id: 'hvorMyeSammen',
  tekstid: 'barnasbosted.spm.hvorMyeSammen',
  svaralternativer: [
    {
      nøkkel: EHvorMyeSammen.møtesIkke,
      svar_tekstid: 'barnasbosted.spm.møtesIkke',
    },
    {
      nøkkel: EHvorMyeSammen.kunNårLeveres,
      svar_tekstid: 'barnasbosted.spm.kunNårLeveres'
    },
    {
      nøkkel: EHvorMyeSammen.møtesUtenom,
      svar_tekstid: 'barnasbosted.spm.møtesUtenom'
    }
  ],  
}