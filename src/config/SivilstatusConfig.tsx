import { IJaNeiSpørsmål, IMultiSpørsmål, ISvar } from '../models/spørsmal';

export const SeparasjonSpørsmål: IJaNeiSpørsmål = {
  spørsmål_id: 'søkerHarSøktSeparasjon',
  tekstid: 'sivilstatus.separasjon.harsøkersøkt',
  svaralternativer: [ISvar.JA, ISvar.NEI],
};

export const SkiltEllerEnkeSpørsmål: IJaNeiSpørsmål[] = [
  {
    spørsmål_id: 'søkerGiftIUtlandet',
    tekstid: 'sivilstatus.gift.utlandet',
    svaralternativer: [ISvar.JA, ISvar.NEI],
  },
  {
    spørsmål_id: 'søkerSeparertEllerSkiltIUtlandet',
    tekstid: 'sivilstatus.separertEllerSkilt.utlandet',
    svaralternativer: [ISvar.JA, ISvar.NEI],
  },
];

export const BegrunnelseSpørsmål: IMultiSpørsmål = {
  spørsmål_id: 'begrunnelseForSøknad',
  tekstid: 'sivilstatus.begrunnelse',
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
