import Environment from '../Environment';
import axios from 'axios';
import { IntlShape } from 'react-intl';
import { formatDate } from './dato';

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

export const verdiTilTekstsvar = (
  verdi: string | Date | boolean,
  intl: IntlShape
) => {
  if (typeof verdi === 'string') {
    return verdi;
  } else if (typeof verdi === 'boolean') {
    if (verdi === true) {
      return hentTekst('svar.ja', intl);
    } else {
      return hentTekst('svar.nei', intl);
    }
  } else if (verdi instanceof Date) {
    return formatDate(verdi);
  } else {
    return null;
  }
};

export const settLabelOgVerdi = (objekt: any, variabelTilLabel: any) => {
  const nyttObjekt: any = {};

  for (const [key, verdi] of Object.entries(objekt)) {
    const barnLabel = variabelTilLabel[key];

    if (barnLabel) {
      nyttObjekt[key] = {
        label: barnLabel,
        verdi: verdi,
      };
    } else {
      nyttObjekt[key] = verdi;
    }
  }

  return nyttObjekt;
};
