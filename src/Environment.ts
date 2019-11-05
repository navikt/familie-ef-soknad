interface IEnvUrls {
  apiUrl: string;
}

const Environment = (): IEnvUrls => {
  if (window.location.hostname.indexOf('www-q0') > -1) {
    return {
      apiUrl: 'https://www-q0.nav.no/familie/alene-med-barn/soknad-api',
    };
  } else if (window.location.hostname.indexOf('www') > -1) {
    return {
      apiUrl: 'https://www.nav.no/familie/alene-med-barn/soknad-api',
    };
  } else {
    return {
      apiUrl: 'http://localhost:8091/familie/alene-med-barn/soknad-api',
    };
  }
};

export default Environment;
