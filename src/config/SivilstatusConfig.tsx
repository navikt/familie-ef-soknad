import { ISpørsmål, ISvar } from '../models/spørsmal';

export const SeparasjonSpørsmål: ISpørsmål = {
  spørsmål_id: 'søkerHarSøktSeparasjon',
  tekstid: 'sivilstatus.separasjon.harsøkersøkt',
  svaralternativer: [ISvar.JA, ISvar.NEI],
};

export const SkiltEllerEnkeSpørsmål: ISpørsmål[] = [
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
