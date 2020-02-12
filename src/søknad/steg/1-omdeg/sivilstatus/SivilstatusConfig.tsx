import {
  IJaNeiSpørsmål,
  IMultiSpørsmål,
  ISvar,
  standardJaNeiSvar,
} from '../../../../models/spørsmal';

export const SeparasjonSpørsmål: IJaNeiSpørsmål = {
  spørsmål_id: 'søkerHarSøktSeparasjon',
  tekstid: 'sivilstatus.separasjon.harsøkersøkt',
  svaralternativer: standardJaNeiSvar,
};

export const søkerGiftIUtlandetSpørsmål: IJaNeiSpørsmål = {
  spørsmål_id: 'søkerGiftIUtlandet',
  tekstid: 'sivilstatus.spm.søkerGiftIUtlandet',
  lesmer: {
    åpneTekstid: 'sivilstatus.lesmer-åpne.søkerGiftIUtlandet',
    lukkeTekstid: '',
    innholdTekstid: 'sivilstatus.lesmer-innhold.søkerGiftIUtlandet',
  },
  svaralternativer: [
    {
      svar_tekstid: ISvar.JA,
      alert_tekstid: 'sivilstatus.dok.søkerGiftIUtlandet',
    },
    { svar_tekstid: ISvar.NEI },
  ],
};

export const søkerSeparertEllerSKiltIUtlandetSpørsmål: IJaNeiSpørsmål = {
  spørsmål_id: 'søkerSeparertEllerSkiltIUtlandet',
  tekstid: 'sivilstatus.spm.søkerSeparertEllerSkiltIUtlandet',
  svaralternativer: [
    {
      svar_tekstid: ISvar.JA,
      alert_tekstid: 'sivilstatus.dok.søkerSeparertEllerSkiltIUtlandet',
    },
    { svar_tekstid: ISvar.NEI },
  ],
};

export const BegrunnelseSpørsmål: IMultiSpørsmål = {
  spørsmål_id: 'begrunnelseForSøknad',
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
