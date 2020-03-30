import { ESvar, ISvar } from '../models/spørsmalogsvar';
import { IntlShape } from 'react-intl';
import { ISpørsmålListeFelt } from '../models/søknadsfelter';
import { hentTekst } from './søknad';

export const hentBooleanFraValgtSvar = (valgtSvar: ISvar) =>
  valgtSvar.id === ESvar.JA;

export const erValgtSvarLiktSomSvar = (
  valgtSvar: string | undefined,
  annetSvarTekstid: string,
  intl: IntlShape
) => {
  return valgtSvar === intl.formatMessage({ id: annetSvarTekstid });
};

export const returnerAvhukedeSvar = (
  spørsmålliste: ISpørsmålListeFelt,
  erHuketAv: boolean,
  svar: ISvar,
  intl: IntlShape
) => {
  let avhukedeSvar: string[] = spørsmålliste.verdi;
  let svarider: string[] = spørsmålliste.svarid;
  const svarTekst = hentTekst(svar.svar_tekstid, intl);
  console.log(spørsmålliste);

  if (erHuketAv) {
    avhukedeSvar = avhukedeSvar.filter((valgtSvar) => {
      return valgtSvar !== svarTekst;
    });
    svarider = svarider.filter((valgtSvar) => {
      return valgtSvar !== svar.id;
    });
  } else {
    avhukedeSvar.push(svarTekst);
    svarider.push(svar.id);
  }
  return { avhukedeSvar, svarider };
};
