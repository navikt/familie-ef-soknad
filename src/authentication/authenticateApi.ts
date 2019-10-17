import Environment from '../Environment';
import pingApi from './pingApi';

const autentiserBruker = (
  settAutentisering: (autentisering: boolean) => void
) => {
  return pingApi()
    .then((response) => {
      if (200 === response.status) {
        settAutentisering(true);
      }
      return;
    })
    .catch((error) => {
      if (401 === error.response.status) {
        window.location.href =
          Environment().loginService + '?redirect=' + window.location.href;
      }
    });
};

export default autentiserBruker;
