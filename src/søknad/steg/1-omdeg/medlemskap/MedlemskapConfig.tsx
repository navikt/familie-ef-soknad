import { ISpørsmål } from '../../../../models/spørsmålogsvar';
import { JaNeiSvar } from '../../../../helpers/svar';
import { EMedlemskap } from '../../../../models/steg/omDeg/medlemskap';

export const oppholderSegINorge: ISpørsmål = {
  søknadid: EMedlemskap.søkerOppholderSegINorge,
  tekstid: 'medlemskap.spm.opphold',
  flersvar: false,

  svaralternativer: JaNeiSvar,
};

export const bosattINorgeDeSisteTreÅr: ISpørsmål = {
  søknadid: EMedlemskap.søkerBosattINorgeSisteTreÅr,
  tekstid: 'medlemskap.spm.bosatt',
  flersvar: false,

  svaralternativer: JaNeiSvar,
};
