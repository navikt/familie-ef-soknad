import { ISpørsmål } from '../../../models/felles/spørsmålogsvar';
import {
  EAktivitet,
  EArbeidssituasjon,
} from '../../../models/steg/aktivitet/aktivitet';
import { IDokumentasjon } from '../../../models/steg/dokumentasjon';
import { DokumentasjonsConfig } from '../../DokumentasjonsConfig';

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

export const hvaErDinArbeidssituasjonSpm: ISpørsmål = {
  søknadid: EArbeidssituasjon.hvaErDinArbeidssituasjon,
  tekstid: 'arbeidssituasjon.spm',
  flersvar: true,
  svaralternativer: [
    {
      id: EAktivitet.erHjemmeMedBarnUnderEttÅr,
      svar_tekstid: 'arbeidssituasjon.svar.erHjemmeMedBarnUnderEttÅr',
    },
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
      id: EAktivitet.harFåttJobbTilbud,
      svar_tekstid: 'arbeidssituasjon.svar.harFåttJobbTilbud',
      dokumentasjonsbehov: DokumentasjonArbeidskontrakt,
    },
    {
      id: EAktivitet.etablererEgenVirksomhet,
      svar_tekstid: 'arbeidssituasjon.svar.etablererEgenVirksomhet',
      dokumentasjonsbehov: DokumentasjonOmVirksomhetenDuEtablerer,
    },
    {
      id: EAktivitet.erArbeidssøker,
      svar_tekstid: 'arbeidssituasjon.svar.erArbeidssøker',
    },
    {
      id: EAktivitet.tarUtdanning,
      svar_tekstid: 'arbeidssituasjon.svar.tarUtdanning',
      dokumentasjonsbehov: DokumentasjonUtdanning,
    },
    {
      id: EAktivitet.erHverkenIArbeidUtdanningEllerArbeidssøker,
      svar_tekstid:
        'arbeidssituasjon.svar.erHverkenIArbeidUtdanningEllerArbeidssøker',
    },
  ],
};
