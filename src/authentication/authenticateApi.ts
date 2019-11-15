import pingApi from './pingApi';

const verifiserAtBrukerErAutentisert = (
  settAutentisering: (autentisering: boolean) => void
) => {
  return pingApi().then((response) => {
    if (response && 200 === response.status) {
      settAutentisering(true);
    }
  });
};

export default verifiserAtBrukerErAutentisert;
