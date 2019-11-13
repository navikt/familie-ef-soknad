import { ISpørsmål, ISvar } from '../models/spørsmal';

export const SpørsmålOgSvar: ISpørsmål[] = [
  {
    spørsmål_id: 'søkerOppholderSegINorge',
    tekstid: 'medlemskap.spm.opphold',
    svaralternativer: [ISvar.JA, ISvar.NEI],
  },
  {
    spørsmål_id: 'søkerBosattINorgeSisteTreÅr',
    tekstid: 'medlemskap.spm.bosatt',
    svaralternativer: [ISvar.JA, ISvar.NEI],
  },
  {
    spørsmål_id: 'søkerErFlyktning',
    tekstid: 'medlemskap.spm.flyktning',
    svaralternativer: [ISvar.JA, ISvar.NEI],
  },
];
