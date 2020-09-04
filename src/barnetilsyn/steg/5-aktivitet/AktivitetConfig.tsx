import { ISpørsmål } from '../../../models/felles/spørsmålogsvar';
import {
  EAktivitet,
  EArbeidssituasjon,
  ErIArbeid,
} from '../../../models/steg/aktivitet/aktivitet';
import { IDokumentasjon } from '../../../models/steg/dokumentasjon';
import { DokumentasjonsConfig } from '../../../søknad/DokumentasjonsConfig';

// --- DOKUMENTASJON

export const DokumentasjonSyk: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonSyk;

export const DokumentasjonOmVirksomhetenDuEtablerer: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonOmVirksomhetenDuEtablerer;

// --- SPØRSMÅL

export const ErDuIArbeidSpm: ISpørsmål = {
  søknadid: EArbeidssituasjon.erDuIArbeid,
  tekstid: 'erDuIArbeid.spm',
  flersvar: false,
  lesmer: {
    åpneTekstid: '',
    lukkeTekstid: '',
    innholdTekstid: 'erDuIArbeid.hjelpetekst',
  },
  svaralternativer: [
    { id: ErIArbeid.JA, svar_tekstid: 'svar.ja' },
    {
      id: ErIArbeid.NeiFordiJegErSyk,
      svar_tekstid: 'erDuIArbeid.svar.nei',
      dokumentasjonsbehov: DokumentasjonSyk,
    },
  ],
};

export const hvaErDinArbeidssituasjonSpm: ISpørsmål = {
  søknadid: EArbeidssituasjon.hvaErDinArbeidssituasjon,
  tekstid: 'arbeidssituasjon.spm',
  lesmer: {
    åpneTekstid: '',
    lukkeTekstid: '',
    innholdTekstid: 'arbeidssituasjon.spm.hjelpetekst',
  },
  flersvar: true,
  svaralternativer: [
    {
      id: EAktivitet.erArbeidstaker,
      svar_tekstid: 'arbeidssituasjon.svar.erArbeidstaker',
    },
    {
      id: EAktivitet.erSelvstendigNæringsdriveneEllerFrilanser,
      svar_tekstid:
        'arbeidssituasjon.svar.erSelvstendigNæringsdriveneEllerFrilanser',
    },
    {
      id: EAktivitet.erAnsattIEgetAS,
      svar_tekstid: 'arbeidssituasjon.svar.erAnsattIEgetAS',
    },
    {
      id: EAktivitet.etablererEgenVirksomhet,
      svar_tekstid: 'arbeidssituasjon.svar.etablererEgenVirksomhet',
      dokumentasjonsbehov: DokumentasjonOmVirksomhetenDuEtablerer,
    },
  ],
};
