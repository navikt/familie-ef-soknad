import { ISpørsmål } from '../../../models/spørsmal';
import { EDinSituasjon } from '../../../models/steg/meromsituasjon';

export const gjelderNoeAvDetteDeg: ISpørsmål = {
  søknadid: 'situasjon',
  tekstid: 'arbeidssituasjon.spm',
  svaralternativer: [
    {
      nøkkel: EDinSituasjon.erSyk,
      svar_tekstid: 'dinSituasjon.svar.erSyk',
    },
  ],
};
