interface EnvironmentProps {
  veiviserUrl: string;
  apiUrl: string;
  loginService: string;
  dokumentUrl: string;
  mellomlagerUrl: string;
  sentryUrl?: string;
  miljø: string;
  modellVersjon: IModellversjon;
}

interface IModellversjon {
  overgangsstønad: number;
  barnetilsyn: number;
  skolepenger: number;
}

const Environment = (): EnvironmentProps => {
  const modellVersjon = { overgangsstønad: 6, barnetilsyn: 1, skolepenger: 1 };

  const isQ0 = window.location.hostname.indexOf('www-q0.nav.no') > -1;
  const isDevSbs = window.location.hostname.indexOf('dev.nav.no') > -1;
  if (isQ0 || isDevSbs) {
    const testUrlPrefix = isQ0 ? 'www-q0.nav.no' : 'dev.nav.no';
    return {
      veiviserUrl: `https://${testUrlPrefix}/familie/alene-med-barn/veiviser`,
      apiUrl: `https://${testUrlPrefix}/familie/alene-med-barn/soknad-api`,
      loginService: `https://loginservice-q.nav.no/login?`,
      dokumentUrl: `https://${testUrlPrefix}/familie/alene-med-barn/mellomlagring/api/mapper/ANYTTHING`, //Vil uansett gå til bucket "familievedlegg" enn så lenge
      mellomlagerUrl: `https://${testUrlPrefix}/familie/alene-med-barn/mellomlagring/api/soknad/`,
      sentryUrl: 'https://88f5ed8ed0fc42139eaf7061abfedb19@sentry.gc.nav.no/36',
      miljø: 'preprod',
      modellVersjon: modellVersjon,
    };
  } else if (window.location.hostname.indexOf('www') > -1) {
    return {
      veiviserUrl: 'https://www.nav.no/familie/alene-med-barn/veiviser',
      apiUrl: 'https://www.nav.no/familie/alene-med-barn/soknad-api',
      loginService: 'https://loginservice.nav.no/login?',
      dokumentUrl:
        'https://www.nav.no/familie/alene-med-barn/mellomlagring/api/mapper/ANYTTHING', //Vil uansett gå til bucket "familievedlegg" enn så lenge,
      mellomlagerUrl:
        'https://www.nav.no/familie/alene-med-barn/mellomlagring/api/soknad/',
      sentryUrl: 'https://88f5ed8ed0fc42139eaf7061abfedb19@sentry.gc.nav.no/36',
      miljø: 'production',
      modellVersjon: modellVersjon,
    };
  } else {
    return {
      veiviserUrl: '',
      apiUrl: 'http://localhost:8091',
      loginService: `http://localhost:8091/local/cookie?subject=21057822284`, // forventet i api ved innsending (local) - syntetisk fnr
      dokumentUrl: `http://localhost:8082/api/mapper/ANYTTHING`,
      mellomlagerUrl: `http://localhost:8082/api/soknad/`,
      miljø: 'local',
      modellVersjon: modellVersjon,
    };
  }
};

export default Environment;
