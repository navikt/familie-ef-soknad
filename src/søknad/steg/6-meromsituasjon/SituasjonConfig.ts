import { ISpørsmål } from '../../../models/spørsmal';
import {
  EDinSituasjon,
  ESagtOppEllerRedusertStilling,
} from '../../../models/steg/dinsituasjon/meromsituasjon';

export const gjelderNoeAvDetteDeg: ISpørsmål = {
  søknadid: 'gjelderDetteDeg',
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
    åpneTekstid: 'dinSituasjon.lesmer-åpne',
    innholdTekstid: 'dinSituasjon.lesmer-innhold',
    lukkeTekstid: '',
  },
  svaralternativer: [
    {
      nøkkel: ESagtOppEllerRedusertStilling.sagtOpp,
      svar_tekstid: 'dinSituasjon.svar.sagtOpp',
      alert_tekstid: 'dinSituasjon.alert.sagtOpp',
    },
    {
      nøkkel: ESagtOppEllerRedusertStilling.redusertStilling,
      svar_tekstid: 'dinSituasjon.svar.redusertStilling',
      alert_tekstid: 'dinSituasjon.alert.redusertStilling',
    },
    {
      nøkkel: ESagtOppEllerRedusertStilling.nei,
      svar_tekstid: 'svar.nei',
    },
  ],
};
