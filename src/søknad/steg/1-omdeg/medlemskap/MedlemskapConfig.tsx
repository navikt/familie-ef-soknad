import { ISpørsmål } from '../../../../models/spørsmålogsvar';
import { JaNeiSvar } from '../../../../helpers/standardSvar';

export const oppholderSegINorge: ISpørsmål = {
  søknadid: 'søkerOppholderSegINorge',
  tekstid: 'medlemskap.spm.opphold',
  svaralternativer: JaNeiSvar,
};

export const bosattINorgeDeSisteTreÅr: ISpørsmål = {
  søknadid: 'søkerBosattINorgeSisteTreÅr',
  tekstid: 'medlemskap.spm.bosatt',
  lesmer: {
    åpneTekstid: 'medlemskap.hjelpetekst-åpne.bosatt',
    lukkeTekstid: '',
    innholdTekstid: 'medlemskap.hjelpetekst-innhold.bosatt',
  },
  svaralternativer: JaNeiSvar,
};
