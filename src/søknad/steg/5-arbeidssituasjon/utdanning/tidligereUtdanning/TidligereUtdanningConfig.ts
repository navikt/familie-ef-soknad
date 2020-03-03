import { ISpørsmål, JaNeiSvar } from '../../../../../models/spørsmal';
import { EUtdanning } from '../../../../../models/arbeidssituasjon/utdanning';

export const utdanningEtterGrunnskolenSpm: ISpørsmål = {
  søknadid: EUtdanning.harTattUtdanningEtterGrunnskolen,
  tekstid: 'utdanning.spm.grunnskole',
  svaralternativer: JaNeiSvar,
};
