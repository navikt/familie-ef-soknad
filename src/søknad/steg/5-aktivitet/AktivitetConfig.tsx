import { ISpørsmål } from '../../../models/felles/spørsmålogsvar';
import {
  EAktivitet,
  EArbeidssituasjon,
} from '../../../models/steg/aktivitet/aktivitet';
import { IDokumentasjon } from '../../../models/steg/dokumentasjon';
import { DokumentasjonsConfig } from '../../DokumentasjonsConfig';
import { IntlShape } from 'react-intl';

// --- DOKUMENTASJON

export const DokumentasjonUtgifterUtdanning: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonUtgifterUtdanning;

export const DokumentasjonUtdanning: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonUtdanning;

const DokumentasjonArbeidskontrakt: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonArbeidskontrakt;

export const DokumentasjonIkkeVilligTilArbeid: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonIkkeVilligTilArbeid;

export const DokumentasjonOmVirksomhetenDuEtablerer: IDokumentasjon =
  DokumentasjonsConfig.DokumentasjonOmVirksomhetenDuEtablerer;

// --- SPØRSMÅL

export const hvaErDinArbeidssituasjonSpm = (intl: IntlShape): ISpørsmål => ({
  søknadid: EArbeidssituasjon.hvaErDinArbeidssituasjon,
  tekstid: 'arbeidssituasjon.spm',
  flersvar: true,
  svaralternativer: [
    {
      id: EAktivitet.erHjemmeMedBarnUnderEttÅr,
      svar_tekst: intl.formatMessage({
        id: 'arbeidssituasjon.svar.erHjemmeMedBarnUnderEttÅr',
      }),
    },
    {
      id: EAktivitet.erArbeidstaker,
      svar_tekst: intl.formatMessage({
        id: 'arbeidssituasjon.svar.erArbeidstaker',
      }),
    },
    {
      id: EAktivitet.erSelvstendigNæringsdriveneEllerFrilanser,
      svar_tekst: intl.formatMessage({
        id: 'arbeidssituasjon.svar.erSelvstendigNæringsdriveneEllerFrilanser',
      }),
    },
    {
      id: EAktivitet.erAnsattIEgetAS,
      svar_tekst: intl.formatMessage({
        id: 'arbeidssituasjon.svar.erAnsattIEgetAS',
      }),
    },
    {
      id: EAktivitet.harFåttJobbTilbud,
      svar_tekst: intl.formatMessage({
        id: 'arbeidssituasjon.svar.harFåttJobbTilbud',
      }),
      dokumentasjonsbehov: DokumentasjonArbeidskontrakt,
    },
    {
      id: EAktivitet.etablererEgenVirksomhet,
      svar_tekst: intl.formatMessage({
        id: 'arbeidssituasjon.svar.etablererEgenVirksomhet',
      }),
      dokumentasjonsbehov: DokumentasjonOmVirksomhetenDuEtablerer,
    },
    {
      id: EAktivitet.erArbeidssøker,
      svar_tekst: intl.formatMessage({
        id: 'arbeidssituasjon.svar.erArbeidssøker',
      }),
    },
    {
      id: EAktivitet.tarUtdanning,
      svar_tekst: intl.formatMessage({
        id: 'arbeidssituasjon.svar.tarUtdanning',
      }),
      dokumentasjonsbehov: DokumentasjonUtdanning,
    },
    {
      id: EAktivitet.erHverkenIArbeidUtdanningEllerArbeidssøker,
      svar_tekst: intl.formatMessage({
        id: 'arbeidssituasjon.svar.erHverkenIArbeidUtdanningEllerArbeidssøker',
      }),
    },
  ],
});
