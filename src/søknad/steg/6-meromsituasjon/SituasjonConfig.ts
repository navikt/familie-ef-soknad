import { ISpørsmål } from '../../../models/spørsmalogsvar';
import {
  EDinSituasjon,
  ESagtOppEllerRedusertStilling,
} from '../../../models/steg/dinsituasjon/meromsituasjon';

export const gjelderNoeAvDetteDeg: ISpørsmål = {
  søknadid: 'gjelderDetteDeg',
  tekstid: 'dinSituasjon.spm',
  svaralternativer: [
    {
      id: EDinSituasjon.erSyk,
      svar_tekstid: 'dinSituasjon.svar.erSyk',
    },
    {
      id: EDinSituasjon.harSyktBarn,
      svar_tekstid: 'dinSituasjon.svar.harSyktBarn',
    },
    {
      id: EDinSituasjon.harSøktBarnepassOgVenterEnnå,
      svar_tekstid: 'dinSituasjon.svar.harSøktBarnepassOgVenterEnnå',
    },
    {
      id: EDinSituasjon.harBarnMedSærligeBehov,
      svar_tekstid: 'dinSituasjon.svar.harBarnMedSærligeBehov',
    },
    {
      id: EDinSituasjon.harFåttJobbTilbud,
      svar_tekstid: 'dinSituasjon.svar.harFåttJobbTilbud',
    },
    {
      id: EDinSituasjon.skalTaUtdanning,
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
      id: ESagtOppEllerRedusertStilling.sagtOpp,
      svar_tekstid: 'dinSituasjon.svar.sagtOpp',
      alert_tekstid: 'dinSituasjon.alert.sagtOpp',
    },
    {
      id: ESagtOppEllerRedusertStilling.redusertStilling,
      svar_tekstid: 'dinSituasjon.svar.redusertStilling',
      alert_tekstid: 'dinSituasjon.alert.redusertStilling',
    },
    {
      id: ESagtOppEllerRedusertStilling.nei,
      svar_tekstid: 'svar.nei',
    },
  ],
};
