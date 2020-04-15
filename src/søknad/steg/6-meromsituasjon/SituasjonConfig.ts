import { ISpørsmål } from '../../../models/spørsmålogsvar';
import {
  DinSituasjonType,
  ESagtOppEllerRedusertStilling,
  ESituasjon,
} from '../../../models/steg/dinsituasjon/meromsituasjon';
import {
  IDokumentasjon,
  SituasjonDokumentasjon,
} from '../../../models/dokumentasjon';

// DOKUMENTASJON
export const DokumentasjonSykdom: IDokumentasjon = {
  id: SituasjonDokumentasjon.SYKDOM,
  spørsmålid: ESituasjon.gjelderDetteDeg,
  svarid: DinSituasjonType.erSyk,
  tittel: 'dokumentasjon.sykdom.tittel',
  beskrivelse: 'dokumentasjon.sykdom.beskrivelse',
  harSendtInn: false,
};

export const DokumentasjonSyktBarn: IDokumentasjon = {
  id: SituasjonDokumentasjon.SYKT_BARN,
  spørsmålid: ESituasjon.gjelderDetteDeg,
  svarid: DinSituasjonType.harSyktBarn,
  tittel: 'dokumentasjon.syktBarn.tittel',
  beskrivelse: 'dokumentasjon.syktBarn.beskrivelse',
  harSendtInn: false,
};

export const DokumentasjonBarnepassMangel: IDokumentasjon = {
  id: SituasjonDokumentasjon.BARNEPASS,
  spørsmålid: ESituasjon.gjelderDetteDeg,
  svarid: DinSituasjonType.harSøktBarnepassOgVenterEnnå,
  tittel: 'dokumentasjon.barnepass.tittel',
  beskrivelse: 'dokumentasjon.barnepass.beskrivelse',
  harSendtInn: false,
};

export const DokumentasjonBarnetilsynBehov: IDokumentasjon = {
  id: SituasjonDokumentasjon.BARNETILSYN_BEHOV,
  spørsmålid: ESituasjon.gjelderDetteDeg,
  svarid: DinSituasjonType.harBarnMedSærligeBehov,
  tittel: 'dokumentasjon.barnetilsynsbehov.tittel',
  beskrivelse: 'dokumentasjon.barnetilsynsbehov.beskrivelse',
  harSendtInn: false,
};
export const DokumentasjonArbeidskontrakt: IDokumentasjon = {
  id: SituasjonDokumentasjon.ARBEIDSKONTRAKT,
  spørsmålid: ESituasjon.gjelderDetteDeg,
  svarid: DinSituasjonType.harFåttJobbTilbud,
  tittel: 'dokumentasjon.arbeidskontrakt.tittel',
  beskrivelse: 'dokumentasjon.arbeidskontrakt.beskrivelse',
  harSendtInn: false,
};
export const DokumentasjonUtdanning: IDokumentasjon = {
  id: SituasjonDokumentasjon.UTDANNING,
  spørsmålid: ESituasjon.gjelderDetteDeg,
  svarid: DinSituasjonType.skalTaUtdanning,
  tittel: 'dokumentasjon.utdanning.tittel',
  beskrivelse: 'dokumentasjon.utdanning.beskrivelse',
  harSendtInn: false,
};

export const ArbeidsforholdOgOppsigelsesårsak: IDokumentasjon = {
  id: SituasjonDokumentasjon.ARBEIDSFORHOLD_OPPSIGELSE,
  spørsmålid: ESituasjon.sagtOppEllerRedusertStilling,
  svarid: ESagtOppEllerRedusertStilling.sagtOpp,
  tittel: 'dokumentasjon.arbeidsforhold-oppsigelse.tittel',
  beskrivelse: 'dokumentasjon.arbeidsforhold-oppsigelse.beskrivelse',
  harSendtInn: false,
};

export const ArbeidsforholdOgRedusertArbedistid: IDokumentasjon = {
  id: SituasjonDokumentasjon.ARBEIDSFORHOLD_REDUSERT_ARBEIDSTID,
  spørsmålid: ESituasjon.sagtOppEllerRedusertStilling,
  svarid: ESagtOppEllerRedusertStilling.redusertStilling,
  tittel: 'dokumentasjon.arbeidsforhold-.tittel',
  beskrivelse: 'dokumentasjon.arbeidsforhold-.beskrivelse',
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
      dokumentasjonsbehov: DokumentasjonBarnepassMangel,
    },
    {
      id: DinSituasjonType.harBarnMedSærligeBehov,
      svar_tekstid: 'dinSituasjon.svar.harBarnMedSærligeBehov',
      dokumentasjonsbehov: DokumentasjonBarnetilsynBehov,
    },
    {
      id: DinSituasjonType.harFåttJobbTilbud,
      svar_tekstid: 'dinSituasjon.svar.harFåttJobbTilbud',
      dokumentasjonsbehov: DokumentasjonArbeidskontrakt,
    },
    {
      id: DinSituasjonType.skalTaUtdanning,
      svar_tekstid: 'dinSituasjon.svar.skalTaUtdanning',
      dokumentasjonsbehov: DokumentasjonUtdanning,
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
      dokumentasjonsbehov: ArbeidsforholdOgOppsigelsesårsak,
    },
    {
      id: ESagtOppEllerRedusertStilling.redusertStilling,
      svar_tekstid: 'dinSituasjon.svar.redusertStilling',
      alert_tekstid: 'dinSituasjon.alert.redusertStilling',
      dokumentasjonsbehov: ArbeidsforholdOgRedusertArbedistid,
    },
    {
      id: ESagtOppEllerRedusertStilling.nei,
      svar_tekstid: 'svar.nei',
    },
  ],
};
