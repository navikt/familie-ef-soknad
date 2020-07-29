import Environment from '../../Environment';
import axios from 'axios';
import { IntlShape } from 'react-intl';
import { hentUid } from '../../utils/uuid';
import { ISpørsmål } from '../../models/spørsmålogsvar';
import { IMellomlagretBarnetilsynSøknad } from '../models/mellomlagretSøknad';

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

export const hentMellomlagretBarnetilsynFraDokument = () => {
  return axios
    .get(`${Environment().mellomlagerUrl + 'barnetilsyn'}`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    })
    .then((response: { data?: IMellomlagretBarnetilsynSøknad }) => {
      return response.data;
    });
};

export const mellomlagreBarnetilsynTilDokument = (
  søknad: IMellomlagretBarnetilsynSøknad
) => {
  return axios.post(`${Environment().mellomlagerUrl + 'barnetilsyn'}`, søknad, {
    withCredentials: true,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });
};

export const nullstillMellomlagretBarnetilsynTilDokument = (): Promise<any> => {
  return axios.delete(`${Environment().mellomlagerUrl + 'barnetilsyn'}`, {
    withCredentials: true,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
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

export const settLabelOgVerdi = (objekt: any, variabelTilLabel: any) => {
  const nyttObjekt: any = {
    id: hentUid(),
    født: {
      label: 'Født',
      verdi: true,
    },
  };

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
