interface IEnvUrls {
  apiUrl: string;
  loginService: string;
}

const Environment = (): IEnvUrls => {
  if (window.location.hostname.indexOf('nais.oera-q.local') > -1) {
    return {
      apiUrl: 'https://familie-ef-soknad-api.nais.oera-q.local',
      loginService: 'https://loginservice-q.nav.no/login',
    };
  } else if (window.location.hostname.indexOf('nais.oera.no') > -1) {
    return {
      apiUrl: 'https://familie-ef-soknad-api.nais.oera.no',
      loginService: 'https://loginservice.nav.no/login',
    };
  } else {
    return {
      apiUrl: 'http://localhost:8091',
      loginService: 'http://localhost:8091/local/cookie',
    };
  }
};

export default Environment;
