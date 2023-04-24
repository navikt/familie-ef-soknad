import { ISpørsmål } from '../../../../models/felles/spørsmålogsvar';
import { JaNeiSvar } from '../../../../helpers/svar';
import {
  EMedlemskap,
  ILandMedKode,
} from '../../../../models/steg/omDeg/medlemskap';
import { LocaleType, LokalIntlShape } from '../../../../language/typer';
import CountryData from '@navikt/land-verktoy';

export const oppholderSegINorge = (intl: LokalIntlShape): ISpørsmål => ({
  søknadid: EMedlemskap.søkerOppholderSegINorge,
  tekstid: 'medlemskap.spm.opphold',
  flersvar: false,

  svaralternativer: JaNeiSvar(intl),
});

export const søkersOppholdsland = (land: ILandMedKode[]): ISpørsmål => ({
  søknadid: EMedlemskap.oppholdsland,
  tekstid: 'medlemskap.spm.oppholdsland',
  flersvar: false,

  svaralternativer: land.map((land) => ({
    id: land.landkode,
    svar_tekst: land.label,
  })),
});

export const bosattINorgeDeSisteTreÅr = (intl: LokalIntlShape): ISpørsmål => ({
  søknadid: EMedlemskap.søkerBosattINorgeSisteTreÅr,
  tekstid: 'medlemskap.spm.bosatt',
  flersvar: false,

  svaralternativer: JaNeiSvar(intl),
});

export const utenlandsoppholdLand = (land: ILandMedKode[]): ISpørsmål => ({
  søknadid: EMedlemskap.utenlandsoppholdLand,
  tekstid: 'medlemskap.periodeBoddIUtlandet.land',
  flersvar: false,

  svaralternativer: land.map((land) => ({
    id: land.landkode,
    svar_tekst: land.label,
  })),
});

export const hentLand = (språk: LocaleType): ILandMedKode[] => {
  const land = CountryData.getCountryInstance(språk).countries;
  return land.map((land: { alpha3: string; label: string }) => {
    return {
      landkode: land.alpha3,
      label: land.label,
    };
  });
};
