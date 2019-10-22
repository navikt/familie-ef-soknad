import Environment from '../Environment';
import pingApi from './pingApi';
import { response } from 'express';

const autentiserBruker = (
  settAutentisering: (autentisering: boolean) => void,
  context: { useAuthentication: boolean; useToggles: boolean }
) => {
  return pingApi()
    .then((response) => {
      if (200 === response.status) {
        settAutentisering(true);
      }
      return;
    })
    .catch((error) => {
      if (error && error.response && 401 === error.response.status) {
        window.location.href =
          Environment().loginService + '?redirect=' + window.location.href;
      }
      return error;
    });
};

export default autentiserBruker;
