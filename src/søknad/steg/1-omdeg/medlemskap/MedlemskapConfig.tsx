import { IJaNeiSpørsmål, standardJaNeiSvar } from '../../../../models/spørsmal';

export const SpørsmålOgSvar: IJaNeiSpørsmål[] = [
  {
    spørsmål_id: 'søkerOppholderSegINorge',
    tekstid: 'medlemskap.spm.opphold',
    svaralternativer: standardJaNeiSvar,
  },
  {
    spørsmål_id: 'søkerBosattINorgeSisteTreÅr',
    tekstid: 'medlemskap.spm.bosatt',
    lesmer: {
      åpneTekstid: 'medlemskap.hjelpetekst.bosatt.apne',
      lukkeTekstid: '',
      innholdTekstid: 'medlemskap.hjelpetekst.bosatt.innhold',
    },
    svaralternativer: standardJaNeiSvar,
  },
];

export const registrertSomFlykting: IJaNeiSpørsmål = {
  spørsmål_id: 'søkerErFlyktning',
  tekstid: 'medlemskap.spm.flyktning',
  svaralternativer: standardJaNeiSvar,
};
