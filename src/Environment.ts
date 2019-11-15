interface IEnvUrls {
  veiviserUrl: string;
  apiUrl: string;
  loginService: string;
}

const Environment = (): IEnvUrls => {
  if (window.location.hostname.indexOf('www-q0') > -1) {
    return {
      veiviserUrl: 'https://www-q0.nav.no/familie/alene-med-barn/veiviser',
      apiUrl: 'https://www-q0.nav.no/familie/alene-med-barn/soknad-api',
      loginService: 'https://loginservice-q.nav.no/login',
    };
  } else if (window.location.hostname.indexOf('www') > -1) {
    return {
      veiviserUrl: 'https://www.nav.no/familie/alene-med-barn/veiviser',
      apiUrl: 'https://www.nav.no/familie/alene-med-barn/soknad-api',
      loginService: 'https://loginservice.nav.no/login',
    };
  } else {
    return {
      veiviserUrl: '',
      apiUrl: 'http://localhost:8091/familie/alene-med-barn/soknad-api',
      loginService: `http://localhost:8091/familie/alene-med-barn/soknad-api/local/cookie`,
    };
  }
};

export default Environment;
