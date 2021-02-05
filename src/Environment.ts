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

  if (window.location.hostname.indexOf('www-q0') > -1) {
    return {
      veiviserUrl: 'https://www-q0.nav.no/familie/alene-med-barn/veiviser',
      apiUrl: 'https://www-q0.nav.no/familie/alene-med-barn/soknad-api',
      loginService: 'https://loginservice-q.nav.no/login?',
      dokumentUrl: 'https://familie-dokument.dev.nav.no/api/mapper/ANYTTHING', //Vil uansett gå til bucket "familievedlegg" enn så lenge
      mellomlagerUrl: 'https://familie-dokument.dev.nav.no/api/soknad/',
      sentryUrl: 'https://88f5ed8ed0fc42139eaf7061abfedb19@sentry.gc.nav.no/36',
      miljø: 'preprod',
      modellVersjon: modellVersjon,
    };
  } else if (window.location.hostname.indexOf('www') > -1) {
    return {
      veiviserUrl: 'https://www.nav.no/familie/alene-med-barn/veiviser',
      apiUrl: 'https://www.nav.no/familie/alene-med-barn/soknad-api',
      loginService: 'https://loginservice.nav.no/login?',
      dokumentUrl: 'https://familie-dokument.nav.no/api/mapper/ANYTTHING', //Vil uansett gå til bucket "familievedlegg" enn så lenge,
      mellomlagerUrl: 'https://familie-dokument.nav.no/api/soknad/',
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
