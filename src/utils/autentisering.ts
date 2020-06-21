import axios, { AxiosError } from 'axios';
import Environment from '../Environment';
import {
  arbeidssøkerSkjemaForsideUrl,
  erUrlArbeidssøkerSkjema,
} from '../arbeidssøkerskjema/routes/Routes';
import { overgangsstønadForsideUrl } from '../routing/Routes';
import { erLokaltMedMock } from './miljø';

const er401Feil = (error: AxiosError) =>
  error && error.response && error.response.status === 401;

const loggInn = () => !erLokaltMedMock();

const getLoginUrl = () => {
  return erUrlArbeidssøkerSkjema()
    ? Environment().loginService + '&redirect=' + arbeidssøkerSkjemaForsideUrl()
    : Environment().loginService + '&redirect=' + overgangsstønadForsideUrl();
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
