import { ESvarTekstid, ISpørsmål } from '../../../models/spørsmålogsvar';
import {
  DinSituasjonType,
  ESagtOppEllerRedusertStilling,
  ESituasjon,
  ESøkerFraBestemtMåned,
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
  label: '',
  tittel: 'dokumentasjon.sykdom.tittel',
  beskrivelse: 'dokumentasjon.sykdom.beskrivelse',
  harSendtInn: false,
};

export const DokumentasjonSyktBarn: IDokumentasjon = {
  id: SituasjonDokumentasjon.SYKT_BARN,
  spørsmålid: ESituasjon.gjelderDetteDeg,
  svarid: DinSituasjonType.harSyktBarn,
  label: '',
  tittel: 'dokumentasjon.syktBarn.tittel',
  beskrivelse: 'dokumentasjon.syktBarn.beskrivelse',
  harSendtInn: false,
};

export const DokumentasjonBarnepassMangel: IDokumentasjon = {
  id: SituasjonDokumentasjon.BARNEPASS,
  spørsmålid: ESituasjon.gjelderDetteDeg,
  svarid: DinSituasjonType.harSøktBarnepassOgVenterEnnå,
  label: '',
  tittel: 'dokumentasjon.barnepass.tittel',
  beskrivelse: 'dokumentasjon.barnepass.beskrivelse',
  harSendtInn: false,
};

export const DokumentasjonBarnetilsynBehov: IDokumentasjon = {
  id: SituasjonDokumentasjon.BARNETILSYN_BEHOV,
  spørsmålid: ESituasjon.gjelderDetteDeg,
  svarid: DinSituasjonType.harBarnMedSærligeBehov,
  label: '',
  tittel: 'dokumentasjon.barnetilsynsbehov.tittel',
  beskrivelse: 'dokumentasjon.barnetilsynsbehov.beskrivelse',
  harSendtInn: false,
};

export const ArbeidsforholdOgOppsigelsesårsak: IDokumentasjon = {
  id: SituasjonDokumentasjon.ARBEIDSFORHOLD_OPPSIGELSE,
  spørsmålid: ESituasjon.sagtOppEllerRedusertStilling,
  svarid: ESagtOppEllerRedusertStilling.sagtOpp,
  label: '',
  tittel: 'dokumentasjon.arbeidsforhold-oppsigelse.tittel',
  harSendtInn: false,
};

export const ArbeidsforholdOgRedusertArbeidstid: IDokumentasjon = {
  id: SituasjonDokumentasjon.ARBEIDSFORHOLD_REDUSERT_ARBEIDSTID,
  spørsmålid: ESituasjon.sagtOppEllerRedusertStilling,
  svarid: ESagtOppEllerRedusertStilling.redusertStilling,
  label: '',
  tittel: 'dokumentasjon.arbeidsforhold-redusert.tittel',
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
      id: DinSituasjonType.nei,
      svar_tekstid: 'dinSituasjon.svar.nei',
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
      dokumentasjonsbehov: ArbeidsforholdOgRedusertArbeidstid,
    },
    {
      id: ESagtOppEllerRedusertStilling.nei,
      svar_tekstid: 'svar.nei',
    },
  ],
};

export const SøkerFraBestemtMånedSpm: ISpørsmål = {
  søknadid: ESituasjon.søkerFraBestemtMåned,
  tekstid: 'dinSituasjon.spm.søkerFraBestemtMåned',
  flersvar: false,
  lesmer: {
    åpneTekstid: 'dinSituasjon.lesmer-åpne.overgangsstønad',
    innholdTekstid: 'dinSituasjon.lesmer-innhold.overgangsstønad',
    lukkeTekstid: '',
  },
  svaralternativer: [
    {
      id: ESøkerFraBestemtMåned.ja,
      svar_tekstid: ESvarTekstid.JA,
    },
    {
      id: ESøkerFraBestemtMåned.neiNavKanVurdere,
      svar_tekstid: 'dinSituasjon.svar.neiNavKanVurdere',
    },
  ],
};
