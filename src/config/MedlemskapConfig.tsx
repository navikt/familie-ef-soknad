import { IJaNeiSpørsmål, ISvar } from '../models/spørsmal';

export const SpørsmålOgSvar: IJaNeiSpørsmål[] = [
  {
    spørsmål_id: 'søkerOppholderSegINorge',
    tekstid: 'medlemskap.spm.opphold',
    svaralternativer: [ISvar.JA, ISvar.NEI],
  },
  {
    spørsmål_id: 'søkerBosattINorgeSisteTreÅr',
    tekstid: 'medlemskap.spm.bosatt',
    lesmer: {
      åpneTekstid: 'medlemskap.hjelpetekst.bosatt.apne',
      lukkeTekstid: '',
      innholdTekstid: 'medlemskap.hjelpetekst.bosatt.innhold',
    },
    svaralternativer: [ISvar.JA, ISvar.NEI],
  },
  {
    spørsmål_id: 'søkerErFlyktning',
    tekstid: 'medlemskap.spm.flyktning',
    svaralternativer: [ISvar.JA, ISvar.NEI],
  },
];
