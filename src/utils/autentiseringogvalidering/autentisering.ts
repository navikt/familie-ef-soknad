import axios, { AxiosError } from 'axios';
import Environment from '../../Environment';
import {
  arbeidssøkerSkjemaForsideUrl,
  erUrlArbeidssøkerSkjema,
} from '../../arbeidssøkerskjema/routes/routesArbeidssokerskjema';
import { overgangsstønadForsideUrl } from '../../overgangsstønad/routing/routesOvergangsstonad';
import { erLokaltMedMock } from '../miljø';
import {
  barnetilsynForsideUrl,
  erUrlBarnetilsyn,
} from '../../barnetilsyn/routing/routesBarnetilsyn';
import {
  erUrlSkolepenger,
  skolepengerForsideUrl,
} from '../../skolepenger/routing/routes';

const er401Feil = (error: AxiosError) =>
  error && error.response && error.response.status === 401;

const loggInn = () => !erLokaltMedMock();

const getLoginUrl = () => {
  return Environment().redirectVedPålogging
    ? Environment().wonderwallUrl + '?redirect=' + getRedirectUrl()
    : Environment().wonderwallUrl;
};

const getRedirectUrl = () => {
  if (erUrlArbeidssøkerSkjema()) {
    return arbeidssøkerSkjemaForsideUrl();
  } else if (erUrlBarnetilsyn()) {
    return barnetilsynForsideUrl();
  } else if (erUrlSkolepenger()) {
    return skolepengerForsideUrl();
  }
  return overgangsstønadForsideUrl();
};

export const autentiseringsInterceptor = () => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (er401Feil(error) && loggInn()) {
        window.location.href = getLoginUrl();
      } else {
        throw error;
      }
    }
  );
};

export const verifiserAtBrukerErAutentisert = (
  settAutentisering: (autentisering: boolean) => void
) => {
  if (loggInn()) {
    return verifiserInnloggetApi().then((response) => {
      if (response && 200 === response.status) {
        settAutentisering(true);
      }
    });
  } else {
    settAutentisering(true);
  }
};

const verifiserInnloggetApi = () => {
  return axios.get(`${Environment().apiUrl}/api/innlogget`, {
    withCredentials: true,
  });
};
