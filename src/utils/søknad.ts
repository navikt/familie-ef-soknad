import Environment from '../Environment';
import axios from 'axios';
import { IntlShape } from 'react-intl';
import { formatDate } from './dato';
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

export const hentSvarAlertFraSpørsmål = (
  svarid: string,
  spørsmål: ISpørsmål
): string => {
  const hentetSvar = hentSvarFraSpørsmål(svarid, spørsmål);
  return hentetSvar?.alert_tekstid || 'Dette svaret har ikke alert';
};

export const hentSvarFraSpørsmål = (svarid: string, spørsmål: ISpørsmål) => {
  const hentetSvar = spørsmål.svaralternativer.find(
    (svar) => svar.id === svarid
  );
  return hentetSvar;
};

export const hentFeltObjekt = (
  tekstid: string,
  verdi: any,
  intl: IntlShape
) => {
  return { label: hentTekst(tekstid, intl), verdi: verdi };
};
