import axios, { AxiosError } from 'axios';
import Environment from '../Environment';

export function er401Feil(error: any) {
  return error && error.response && error.response.status === 401;
}

export const authInterceptor = (
  brukAutentisering: any,
  settAutentisering: any
) => {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (er401Feil(error) && brukAutentisering) {
        settAutentisering(false);
        window.location.href =
          Environment().loginService + '?redirect=' + window.location.href;
      } else {
        return error;
      }
    }
  );
};
