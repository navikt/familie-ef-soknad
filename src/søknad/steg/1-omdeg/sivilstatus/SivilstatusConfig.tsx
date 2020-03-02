import { ISpørsmål, ESvar, JaNeiSvar } from '../../../../models/spørsmal';

export const SeparasjonSpørsmål: ISpørsmål = {
  søknadid: 'søkerHarSøktSeparasjon',
  tekstid: 'sivilstatus.separasjon.harsøkersøkt',
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
      svar_tekstid: ESvar.JA,
      alert_tekstid: 'sivilstatus.dok.søkerGiftIUtlandet',
    },
    { svar_tekstid: ESvar.NEI },
  ],
};

export const søkerSeparertEllerSKiltIUtlandetSpørsmål: ISpørsmål = {
  søknadid: 'søkerSeparertEllerSkiltIUtlandet',
  tekstid: 'sivilstatus.spm.søkerSeparertEllerSkiltIUtlandet',
  svaralternativer: [
    {
      svar_tekstid: ESvar.JA,
      alert_tekstid: 'sivilstatus.dok.søkerSeparertEllerSkiltIUtlandet',
    },
    { svar_tekstid: ESvar.NEI },
  ],
};

export const BegrunnelseSpørsmål: ISpørsmål = {
  søknadid: 'begrunnelseForSøknad',
  tekstid: 'sivilstatus.spm.begrunnelse',
  svaralternativer: [
    {
      svar_tekstid: 'sivilstatus.svar.samlivsbruddForeldre',
      alert_tekstid: 'sivilstatus.alert.samlivsbrudd',
    },
    {
      svar_tekstid: 'sivilstatus.svar.samlivsbruddAndre',
      alert_tekstid: 'sivilstatus.alert.samlivsbrudd',
    },
    { svar_tekstid: 'sivilstatus.svar.aleneFraFødsel' },
    { svar_tekstid: 'sivilstatus.svar.endringISamværsordning' },
    { svar_tekstid: 'sivilstatus.svar.annet' },
  ],
};
