import {
  ESvar,
  ESvarTekstid,
  ISpørsmål,
} from '../../../models/felles/spørsmålogsvar';
import { EBarn } from '../../../models/steg/barn';
import { JaNeiSvar, JaSvar } from '../../../helpers/svar';
import { IDokumentasjon } from '../../../models/steg/dokumentasjon';
import { DokumentasjonsConfig } from '../../DokumentasjonsConfig';

// --- Dokumentasjon
const Terminbekreftelse: IDokumentasjon =
  DokumentasjonsConfig.Terminbekreftelse;

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
