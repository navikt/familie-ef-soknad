import { ESvar, ESvarTekstid, ISpørsmål } from '../../../models/spørsmålogsvar';
import { JaNeiSvar } from '../../../helpers/standardSvar';
import { EBarn } from '../../../models/barn';
import { NeiSvar } from '../../../helpers/svar';
import { Barn, IDokumentasjon } from '../../../models/dokumentasjon';

// --- Dokumentasjon
const Terminbekreftelse: IDokumentasjon = {
  id: Barn.TERMINBEKREFTELSE,
  spørsmålid: EBarn.født,
  svarid: ESvar.JA,
  tittel: 'dokumentasjon.terminbekreftelse.tittel',
  beskrivelse: 'dokumentasjon.terminbekreftelse.beskrivelse',
  harSendtInn: false,
};

// --- Spørsmål

export const barnetFødt: ISpørsmål = {
  søknadid: EBarn.født,
  tekstid: 'barnekort.spm.født',
  flersvar: false,
  svaralternativer: [
    {
      id: ESvar.JA,
      svar_tekstid: ESvarTekstid.JA,
      dokumentasjonsbehov: Terminbekreftelse,
    },
    NeiSvar,
  ],
};

export const skalBarnBoHosDeg: ISpørsmål = {
  søknadid: EBarn.skalBarnBoHosDeg,
  tekstid: 'barnekort.spm.skalBarnBoHosDeg',
  flersvar: false,
  svaralternativer: JaNeiSvar,
};

export const borBarnetHosDeg: ISpørsmål = {
  søknadid: EBarn.skalBarnBoHosDeg,
  tekstid: 'barnekort.spm.skalBarnBoHosDeg',
  flersvar: false,
  svaralternativer: JaNeiSvar,
};
