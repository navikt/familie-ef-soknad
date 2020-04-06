import {
  ISpørsmål,
  ESvar,
  ESvarTekstid,
} from '../../../../models/spørsmalogsvar';
import { JaNeiSvar, NeiSvar } from '../../../../helpers/svar';
import { EBegrunnelse } from '../../../../models/steg/omDeg/sivilstatus';

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
      id: EBegrunnelse.samlivsbruddForeldre,
      svar_tekstid: 'sivilstatus.svar.samlivsbruddForeldre',
      alert_tekstid: 'sivilstatus.alert.samlivsbrudd',
    },
    {
      id: EBegrunnelse.samlivsbruddAndre,
      svar_tekstid: 'sivilstatus.svar.samlivsbruddAndre',
    },

    {
      id: EBegrunnelse.aleneFraFødsel,
      svar_tekstid: 'sivilstatus.svar.aleneFraFødsel',
    },
    {
      id: EBegrunnelse.endringISamværsordning,
      svar_tekstid: 'sivilstatus.svar.endringISamværsordning',
    },
    {
      id: EBegrunnelse.dødsfall,
      svar_tekstid: 'sivilstatus.svar.dødsfall',
      alert_tekstid: 'sivilstatus.alert.dødsfall',
    },
    { id: EBegrunnelse.annet, svar_tekstid: 'sivilstatus.svar.annet' },
  ],
};
