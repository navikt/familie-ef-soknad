import {
  ISpørsmål,
  ESvar,
  ESvarTekstid,
} from '../../../../models/spørsmalogsvar';
import { JaNeiSvar, NeiSvar } from '../../../../helpers/svar';

export const SeparasjonSpørsmål: ISpørsmål = {
  søknadid: 'søkerHarSøktSeparasjon',
  tekstid: 'sivilstatus.spm.søktSeparasjon',
  svaralternativer: JaNeiSvar,
};

export const søkerGiftIUtlandetSpørsmål: ISpørsmål = {
  søknadid: 'søkerGiftIUtlandet',
  tekstid: 'sivilstatus.spm.søkerGiftIUtlandet',
  lesmer: {
    åpneTekstid: 'sivilstatus.lesmer-åpne.søkerGiftIUtlandet',
    lukkeTekstid: '',
    innholdTekstid: 'sivilstatus.lesmer-innhold.søkerGiftIUtlandet',
  },
  svaralternativer: [
    {
      id: ESvar.JA,
      svar_tekstid: ESvarTekstid.JA,
      alert_tekstid: 'sivilstatus.alert.søkerGiftIUtlandet',
    },
    NeiSvar,
  ],
};

export const søkerSeparertEllerSKiltIUtlandetSpørsmål: ISpørsmål = {
  søknadid: 'søkerSeparertEllerSkiltIUtlandet',
  tekstid: 'sivilstatus.spm.søkerSeparertEllerSkiltIUtlandet',
  svaralternativer: [
    {
      id: ESvar.JA,
      svar_tekstid: ESvarTekstid.JA,
      alert_tekstid: 'sivilstatus.alert.søkerSeparertEllerSkiltIUtlandet',
    },
    { id: ESvar.NEI, svar_tekstid: ESvarTekstid.NEI },
  ],
};

export const BegrunnelseSpørsmål: ISpørsmål = {
  søknadid: 'begrunnelseForSøknad',
  tekstid: 'sivilstatus.spm.begrunnelse',
  svaralternativer: [
    {
      id: '',
      svar_tekstid: 'sivilstatus.svar.samlivsbruddForeldre',
      alert_tekstid: 'sivilstatus.alert.samlivsbrudd',
    },
    {
      id: '',
      svar_tekstid: 'sivilstatus.svar.samlivsbruddAndre',
    },

    { id: '', svar_tekstid: 'sivilstatus.svar.aleneFraFødsel' },
    { id: '', svar_tekstid: 'sivilstatus.svar.endringISamværsordning' },
    {
      id: '',

      svar_tekstid: 'sivilstatus.svar.dødsfall',
      alert_tekstid: 'sivilstatus.alert.dødsfall',
    },
    { id: '', svar_tekstid: 'sivilstatus.svar.annet' },
  ],
};
