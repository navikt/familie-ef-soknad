interface IEnvUrls {
  apiUrl: string;
}

const Environment = (): IEnvUrls => {
  if (window.location.hostname.indexOf('nais.oera-q.local') > -1) {
    return {
      apiUrl: 'https://familie-ef-soknad-api.nais.oera-q.local',
    };
  } else if (window.location.hostname.indexOf('nais.oera.no') > -1) {
    return {
      apiUrl: 'https://familie-ef-soknad-api.nais.oera.no',
    };
  } else {
    return {
      apiUrl: 'http://localhost:8091/',
    };
  }
};

export default Environment;
