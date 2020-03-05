import { ISpørsmål } from '../../../models/spørsmal';
import { EDinSituasjon } from '../../../models/steg/meromsituasjon';

export const gjelderNoeAvDetteDeg: ISpørsmål = {
  søknadid: 'situasjon',
  tekstid: 'dinSituasjon.spm',
  svaralternativer: [
    {
      nøkkel: EDinSituasjon.erSyk,
      svar_tekstid: 'dinSituasjon.svar.erSyk',
    },
    {
      nøkkel: EDinSituasjon.harSyktBarn,
      svar_tekstid: 'dinSituasjon.svar.harSyktBarn',
    },
    {
      nøkkel: EDinSituasjon.harSøktBarnepassOgVenterEnnå,
      svar_tekstid: 'dinSituasjon.svar.harSøktBarnepassOgVenterEnnå',
    },
    {
      nøkkel: EDinSituasjon.harBarnMedSærligeBehov,
      svar_tekstid: 'dinSituasjon.svar.harBarnMedSærligeBehov',
    },
    {
      nøkkel: EDinSituasjon.harFåttJobbTilbud,
      svar_tekstid: 'dinSituasjon.svar.harFåttJobbTilbud',
    },
    {
      nøkkel: EDinSituasjon.skalTaUtdanning,
      svar_tekstid: 'dinSituasjon.svar.skalTaUtdanning',
    },
  ],
};
