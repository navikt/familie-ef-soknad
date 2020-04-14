import { ISpørsmål } from '../../../models/spørsmålogsvar';
import {
  DinSituasjonType,
  ESagtOppEllerRedusertStilling,
  ESituasjon,
} from '../../../models/steg/dinsituasjon/meromsituasjon';
import { EDokumentasjon, IDokumentasjon } from '../../../models/dokumentasjon';

// DOKUMENTASJON
export const DokumentasjonSykdom: IDokumentasjon = {
  id: EDokumentasjon.SYKDOM,
  spørsmålid: ESituasjon.gjelderDetteDeg,
  svarid: DinSituasjonType.erSyk,
  tittel: 'dokumentasjon.sykdom.tittel',
  beskrivelse: 'dokumentasjon.sykdom.beskrivelse',
  harSendtInn: false,
};

export const DokumentasjonSyktBarn: IDokumentasjon = {
  id: EDokumentasjon.SYKT_BARN,
  spørsmålid: ESituasjon.gjelderDetteDeg,
  svarid: DinSituasjonType.harSyktBarn,
  tittel: 'dokumentasjon.syktBarn.tittel',
  beskrivelse: 'dokumentasjon.syktBarn.beskrivelse',
  harSendtInn: false,
};

// SPØRSMÅL
export const gjelderNoeAvDetteDeg: ISpørsmål = {
  søknadid: ESituasjon.gjelderDetteDeg,
  tekstid: 'dinSituasjon.spm',
  flersvar: true,
  svaralternativer: [
    {
      id: DinSituasjonType.erSyk,
      svar_tekstid: 'dinSituasjon.svar.erSyk',
      dokumentasjonsbehov: DokumentasjonSykdom,
    },
    {
      id: DinSituasjonType.harSyktBarn,
      svar_tekstid: 'dinSituasjon.svar.harSyktBarn',
      dokumentasjonsbehov: DokumentasjonSyktBarn,
    },
    {
      id: DinSituasjonType.harSøktBarnepassOgVenterEnnå,
      svar_tekstid: 'dinSituasjon.svar.harSøktBarnepassOgVenterEnnå',
    },
    {
      id: DinSituasjonType.harBarnMedSærligeBehov,
      svar_tekstid: 'dinSituasjon.svar.harBarnMedSærligeBehov',
    },
    {
      id: DinSituasjonType.harFåttJobbTilbud,
      svar_tekstid: 'dinSituasjon.svar.harFåttJobbTilbud',
    },
    {
      id: DinSituasjonType.skalTaUtdanning,
      svar_tekstid: 'dinSituasjon.svar.skalTaUtdanning',
    },
  ],
};

export const SagtOppEllerRedusertStillingSpm: ISpørsmål = {
  søknadid: ESituasjon.sagtOppEllerRedusertStilling,
  tekstid: 'dinSituasjon.spm.sagtOppEllerRedusertStilling',
  flersvar: false,
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
