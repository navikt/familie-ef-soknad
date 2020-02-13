import { IJaNeiSpørsmål, standardJaNeiSvar, IMultiSpørsmål } from '../../../models/spørsmal';
import { EHarSamværMedBarn } from '../../../models/barnasbosted';

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

export const harAnnenForelderSamværMedBarn: IMultiSpørsmål = {
    spørsmål_id: 'harAnnenForelderSamværMedBarn',
    tekstid: 'barnasbosted.spm.harAnnenForelderSamværMedBarn',
    svaralternativer: [
      {
        nøkkel: EHarSamværMedBarn.jaKonkreteTidspunkt,
        svar_tekstid: 'barnasbosted.spm.jaKonkreteTidspunkt',
      },
      {
        nøkkel: EHarSamværMedBarn.jaIkkeKonkreteTidspunkt,
        svar_tekstid: 'barnasbosted.spm.jaIkkeKonkreteTidspunkt'
      },
      {
        nøkkel: EHarSamværMedBarn.nei,
        svar_tekstid: 'barnasbosted.spm.nei'
      }
    ],
  };
