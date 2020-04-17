import { ISpørsmål } from '../../../../models/spørsmålogsvar';
import { JaNeiSvar } from '../../../../helpers/svar';

export const oppholderSegINorge: ISpørsmål = {
  søknadid: 'søkerOppholderSegINorge',
  tekstid: 'medlemskap.spm.opphold',
  flersvar: false,

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
  flersvar: false,

  svaralternativer: JaNeiSvar,
};
