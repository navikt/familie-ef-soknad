import { ISpørsmål, JaNeiSvar } from '../../../../models/spørsmal';

export const oppholderSegINorge: ISpørsmål = {
  søknadid: 'søkerOppholderSegINorge',
  tekstid: 'medlemskap.spm.opphold',
  svaralternativer: JaNeiSvar,
};

export const bosattINorgeDeSisteTreÅr: ISpørsmål = {
  søknadid: 'søkerBosattINorgeSisteTreÅr',
  tekstid: 'medlemskap.spm.bosatt',
  lesmer: {
    åpneTekstid: 'medlemskap.hjelpetekst.bosatt.apne',
    lukkeTekstid: '',
    innholdTekstid: 'medlemskap.hjelpetekst.bosatt.innhold',
  },
  svaralternativer: JaNeiSvar,
};
