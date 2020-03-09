import { ISpørsmål } from '../../../models/spørsmal';
import {
  EDinSituasjon,
  ESagtOppEllerRedusertStilling,
} from '../../../models/steg/dinsituasjon/meromsituasjon';

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

export const SagtOppEllerRedusertStillingSpm: ISpørsmål = {
  søknadid: 'sagtOppEllerRedusertStilling',
  tekstid: 'dinSituasjon.spm.sagtOppEllerRedusertStilling',
  lesmer: {
    åpneTekstid: 'sagtOppEllerRedusertStilling.lesmer-åpne',
    innholdTekstid: 'sagtOppEllerRedusertStilling.lesmer-innhold',
    lukkeTekstid: '',
  },
  svaralternativer: [
    {
      nøkkel: ESagtOppEllerRedusertStilling.jaHarRedusertArbeidstiden,
      svar_tekstid: 'sagtOppEllerRedusertStilling.svar.sagtOpp',
    },
    {
      nøkkel: ESagtOppEllerRedusertStilling.jaHarSagtOppJobben,
      svar_tekstid: 'sagtOppEllerRedusertStilling.svar.redusertstilling',
    },
    {
      nøkkel: ESagtOppEllerRedusertStilling.nei,
      svar_tekstid: 'svar.nei',
    },
  ],
};
