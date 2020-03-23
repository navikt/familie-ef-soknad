import Environment from '../Environment';
import axios from 'axios';
import { IntlShape } from 'react-intl';
import { ISpørsmål } from '../models/spørsmålogsvar';

export const hentPersonData = () => {
  return axios
    .get(`${Environment().apiUrl}/api/oppslag/sokerinfo`, {
      headers: {
        'content-type': 'application/json;charset=utf-8',
      },
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      return response && response.data;
    });
};

export const hentSivilstatus = (statuskode: string) => {
  switch (statuskode) {
    case 'GIFT':
      return 'Gift';

    case 'UGIF':
      return 'Ugift';

    case 'SAMB':
      return 'Samboer';

    case 'SEPA':
      return 'Separert';

    case 'SKIL':
      return 'Skilt';

    case 'ENKE':
      return 'Enke/ enkemann';

    default:
      return 'Annen sivilstatus enn GIFT, UGIF, SAMB, SEPA, SKIL';
  }
};

export const erValgtSvarLiktSomSvar = (
  valgtSvar: string | undefined,
  annetSvarTekstid: string,
  intl: IntlShape
) => {
  return valgtSvar === intl.formatMessage({ id: annetSvarTekstid });
};

export const hentTekst = (id: string, intl: IntlShape) => {
  return intl.formatMessage({ id: id });
};

export const fraStringTilTall = (tallAvTypenStreng: string) => {
  const parsed = Number.parseInt(tallAvTypenStreng, 10);
  if (Number.isNaN(parsed)) {
    return 0;
  }
  return parsed;
};

export const hentSvarAlertFraSpørsmål = (
  svarid: string,
  spørsmål: ISpørsmål
): string => {
  const hentetSvar = hentSvarFraSpørsmål(svarid, spørsmål);
  return hentetSvar?.alert_tekstid || 'Dette svaret har ikke alert';
};

export const hentSvarFraSpørsmål = (svarid: string, spørsmål: ISpørsmål) => {
  const hentetSvar = spørsmål.svaralternativer.find(
    (svar) => svar.nøkkel === svarid
  );
  return hentetSvar;
};
