import {
  ESvar,
  ESvarTekstid,
  ISpørsmål,
} from '../../../models/felles/spørsmålogsvar';
import { EBarn } from '../../../models/steg/barn';
import { JaNeiSvar, JaSvar } from '../../../helpers/svar';
import {
  BarnDokumentasjon,
  IDokumentasjon,
} from '../../../models/steg/dokumentasjon';

// --- Dokumentasjon
const Terminbekreftelse: IDokumentasjon = {
  id: BarnDokumentasjon.TERMINBEKREFTELSE,
  spørsmålid: EBarn.født,
  svarid: ESvar.NEI,
  label: '',
  tittel: 'dokumentasjon.terminbekreftelse.tittel',
  harSendtInn: false,
};

// --- Spørsmål

export const barnetFødt: ISpørsmål = {
  søknadid: EBarn.født,
  tekstid: 'barnekort.spm.født',
  flersvar: false,
  svaralternativer: [
    JaSvar,
    {
      id: ESvar.NEI,
      svar_tekstid: ESvarTekstid.NEI,
      dokumentasjonsbehov: Terminbekreftelse,
    },
  ],
};

export const skalBarnetBoHosSøker: ISpørsmål = {
  søknadid: EBarn.skalBarnetBoHosSøker,
  tekstid: 'barnekort.spm.skalBarnetBoHosSøker',
  flersvar: false,
  svaralternativer: JaNeiSvar,
};

export const borBarnetHosDeg: ISpørsmål = {
  søknadid: EBarn.skalBarnetBoHosSøker,
  tekstid: 'barnekort.spm.skalBarnetBoHosSøker',
  flersvar: false,
  svaralternativer: JaNeiSvar,
};
