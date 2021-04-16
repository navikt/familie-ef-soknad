import Environment from '../Environment';
import axios from 'axios';
import { IntlShape } from 'react-intl';
import { hentUid } from './autentiseringogvalidering/uuid';
import { ISpørsmål } from '../models/felles/spørsmålogsvar';
import * as Sentry from '@sentry/browser';
import { Severity } from '@sentry/browser';
import { MellomlagredeStønadstyper } from '../models/søknad/stønadstyper';
import { IDokumentasjon } from '../models/steg/dokumentasjon';
import { standardLabelsBarn } from '../helpers/labels';
import { IBarn } from '../models/steg/barn';

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

export const hentPersonDataArbeidssoker = () => {
  return axios
    .get(`${Environment().apiUrl}/api/oppslag/sokerminimum`, {
      headers: {
        'content-type': 'application/json;charset=utf-8',
      },
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      return response && response.data;
    });
};

export const hentMeldingMottatt = (søknadId: string) => {
  return axios
    .get(`${Environment().apiUrl}/api/dokumentasjonsbehov/${søknadId}`, {
      headers: {
        'content-type': 'application/json;charset=utf-8',
      },
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      return response && response.data;
    });
};

export const hentMellomlagretSøknadFraDokument = <T>(
  stønadstype: MellomlagredeStønadstyper
): Promise<T | undefined> => {
  return axios
    .get(`${Environment().mellomlagerUrl + stønadstype}`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    })
    .then((response: { data?: T }) => {
      return response.data;
    });
};

export const mellomlagreSøknadTilDokument = <T>(
  søknad: T,
  stønadstype: MellomlagredeStønadstyper
): Promise<T> => {
  return axios.post(`${Environment().mellomlagerUrl + stønadstype}`, søknad, {
    withCredentials: true,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });
};

export const nullstillMellomlagretSøknadTilDokument = (
  stønadstype: MellomlagredeStønadstyper
): Promise<any> => {
  return axios.delete(`${Environment().mellomlagerUrl + stønadstype}`, {
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
    skalHaBarnepass: { label: 'Med i søknaden', verdi: false },
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

      Sentry.captureEvent({
        message: `Oppdatering av barnefelt feilet med key=${key} og verdi=${verdi} uten tilhørende label.`,
        level: Severity.Warning,
      });
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

export const unikeDokumentasjonsbehov = (
  behov: IDokumentasjon,
  index: number,
  alle: IDokumentasjon[]
) => {
  return alle.findIndex((item) => item.id === behov.id) === index;
};

export const oppdaterBarnMedLabel = (barneliste: IBarn[]) =>
  barneliste.map((barn: any) => {
    const barnMedLabel = settLabelOgVerdi(barn, standardLabelsBarn);
    barnMedLabel['ident'] = barnMedLabel['fnr'];
    delete barnMedLabel.fnr;
    return barnMedLabel;
  });
