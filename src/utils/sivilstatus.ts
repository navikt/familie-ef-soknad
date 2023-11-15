import { ESivilstand, ISivilstatus } from '../models/steg/omDeg/sivilstatus';
import { ISpørsmål } from '../models/felles/spørsmålogsvar';

export const erSøkerGift = (sivilstand?: string) =>
  sivilstand === ESivilstand.GIFT ||
  sivilstand === ESivilstand.REPA ||
  sivilstand === ESivilstand.REGISTRERT_PARTNER;

export const erSøkerUgift = (sivilstand?: string) =>
  sivilstand === ESivilstand.UGIF ||
  sivilstand === ESivilstand.UGIFT ||
  sivilstand === ESivilstand.UOPPGITT ||
  sivilstand === null ||
  sivilstand === 'NULL';

export const erSøkerEnke = (sivilstand?: string) =>
  sivilstand === ESivilstand.ENKE ||
  sivilstand === ESivilstand.GJPA ||
  sivilstand === ESivilstand.ENKE_ELLER_ENKEMANN ||
  sivilstand === ESivilstand.GJENLEVENDE_PARTNER;

export const erSøkerSeparert = (sivilstand?: string) =>
  sivilstand === ESivilstand.SEPA ||
  sivilstand === ESivilstand.SEPR ||
  sivilstand === ESivilstand.SEPARERT ||
  sivilstand === ESivilstand.SEPARERT_PARTNER;

export const erSøkerSkilt = (sivilstand?: string) =>
  sivilstand === ESivilstand.SKIL ||
  sivilstand === ESivilstand.SKPA ||
  sivilstand === ESivilstand.SKILT ||
  sivilstand === ESivilstand.SKILT_PARTNER;

export const hentValgtSvar = (
  spørsmål: ISpørsmål,
  sivilstatus: ISivilstatus
) => {
  for (const [key, value] of Object.entries(sivilstatus)) {
    if (key === spørsmål.søknadid && value !== undefined && value !== null) {
      return value.verdi;
    }
  }
};
