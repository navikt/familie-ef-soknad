import { ISpørsmål } from '../../../../models/felles/spørsmålogsvar';
import { JaNeiSvar } from '../../../../helpers/svar';
import { EMedlemskap } from '../../../../models/steg/omDeg/medlemskap';
import { LokalIntlShape } from '../../../../language/typer';

export const oppholderSegINorge = (intl: LokalIntlShape): ISpørsmål => ({
  søknadid: EMedlemskap.søkerOppholderSegINorge,
  tekstid: 'medlemskap.spm.opphold',
  flersvar: false,

  svaralternativer: JaNeiSvar(intl),
});

export const søkersOppholdsland = (hierarki: string[]): ISpørsmål => ({
  søknadid: EMedlemskap.oppholdsland,
  tekstid: 'medlemskap.spm.oppholdsland',
  flersvar: false,

  svaralternativer: hierarki.map((land) => ({
    id: land,
    svar_tekst: land,
  })),
});

export const bosattINorgeDeSisteTreÅr = (intl: LokalIntlShape): ISpørsmål => ({
  søknadid: EMedlemskap.søkerBosattINorgeSisteTreÅr,
  tekstid: 'medlemskap.spm.bosatt',
  flersvar: false,

  svaralternativer: JaNeiSvar(intl),
});
