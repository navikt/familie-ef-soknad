import { IJaNeiSpørsmål, standardJaNeiSvar } from '../../../../models/spørsmal';

export const oppholderSegINorge: IJaNeiSpørsmål = {
  spørsmål_id: 'søkerOppholderSegINorge',
  tekstid: 'medlemskap.spm.opphold',
  svaralternativer: standardJaNeiSvar,
};

export const bosattINorgeDeSisteTreÅr: IJaNeiSpørsmål = {
  spørsmål_id: 'søkerBosattINorgeSisteTreÅr',
  tekstid: 'medlemskap.spm.bosatt',
  lesmer: {
    åpneTekstid: 'medlemskap.hjelpetekst.bosatt.apne',
    lukkeTekstid: '',
    innholdTekstid: 'medlemskap.hjelpetekst.bosatt.innhold',
  },
  svaralternativer: standardJaNeiSvar,
};
