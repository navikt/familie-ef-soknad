import { ESvarTekstid, ISpørsmål } from '../../../models/felles/spørsmålogsvar';
import {
  DinSituasjonType,
  ESagtOppEllerRedusertStilling,
  ESituasjon,
  ESøkerFraBestemtMåned,
} from '../../../models/steg/dinsituasjon/meromsituasjon';
import { IDokumentasjon } from '../../../models/steg/dokumentasjon';
import { DokumentasjonsConfig } from '../../DokumentasjonsConfig';

// DOKUMENTASJON
export const DokumentasjonSykdom: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonSykdom;

export const DokumentasjonSyktBarn: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonSyktBarn;

export const DokumentasjonBarnepassMangel: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonBarnepassMangel;

export const DokumentasjonBarnetilsynBehov: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonBarnetilsynBehov;

export const ArbeidsforholdOgOppsigelsesårsak: IDokumentasjon =
  DokumentasjonsConfig.ArbeidsforholdOgOppsigelsesårsak;

export const ArbeidsforholdOgRedusertArbeidstid: IDokumentasjon =
  DokumentasjonsConfig.ArbeidsforholdOgRedusertArbeidstid;

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
  tekstid: 'søkerFraBestemtMåned.spm.overgangsstønad',
  flersvar: false,
  lesmer: {
    åpneTekstid: 'søkerFraBestemtMåned.hjelpetekst-åpne',
    innholdTekstid: 'søkerFraBestemtMåned.hjelpetekst-innhold.overgangsstønad',
    lukkeTekstid: '',
  },
  svaralternativer: [
    {
      id: ESøkerFraBestemtMåned.ja,
      svar_tekstid: ESvarTekstid.JA,
    },
    {
      id: ESøkerFraBestemtMåned.neiNavKanVurdere,
      svar_tekstid: 'søkerFraBestemtMåned.svar.neiNavKanVurdere',
    },
  ],
};
