import { IJaNeiSpørsmål, standardJaNeiSvar, IMultiSpørsmål } from '../../../models/spørsmal';
import { EHarSamværMedBarn, EHarSkriftligSamværsavtale } from '../../../models/barnasbosted';

export const borINorge: IJaNeiSpørsmål = {
    spørsmål_id: 'borINorge',
    tekstid: 'barnasbosted.borinorge',
    svaralternativer: standardJaNeiSvar,
};

export const avtaleOmDeltBosted: IJaNeiSpørsmål = {
    spørsmål_id: 'avtaleOmdeltBosted',
    tekstid: 'barnasbosted.avtale',
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
        svar_tekstid: 'barnasbosted.spm.nei'
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
