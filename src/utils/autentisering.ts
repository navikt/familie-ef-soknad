import axios, { AxiosError } from 'axios';
import Environment from '../Environment';

const er401Feil = (error: AxiosError) =>
  error && error.response && error.response.status === 401;

const loggInn = () =>
  process.env.NODE_ENV !== 'development' ||
  process.env.REACT_APP_BRUK_AUTENTISERING_I_DEV === 'true';

const getLoginUrl = () =>
  Environment().loginService + '?redirect=' + window.location.href;

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
    return pingApi().then((response) => {
      if (response && 200 === response.status) {
        settAutentisering(true);
      }
    });
  } else {
    settAutentisering(true);
  }
};

const pingApi = () => {
  return axios.get(`${Environment().apiUrl}/api/ping`, {
    withCredentials: true,
  });
};
