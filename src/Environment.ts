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
  const modellVersjon = { overgangsstønad: 7, barnetilsyn: 2, skolepenger: 2 };

  if (window.location.hostname.indexOf('dev.nav.no') > -1) {
    return {
      veiviserUrl: 'https://familie.dev.nav.no/familie/alene-med-barn/veiviser',
      apiUrl: 'https://familie.dev.nav.no/familie/alene-med-barn/soknad-api',
      loginService: 'https://loginservice.dev.nav.no/login?',
      dokumentUrl:
        'https://familie.dev.nav.no/familie/dokument/api/mapper/ANYTTHING', //Vil uansett gå til bucket "familievedlegg" enn så lenge
      mellomlagerUrl: 'https://familie.dev.nav.no/familie/dokument/api/soknad/',
      sentryUrl: 'https://88f5ed8ed0fc42139eaf7061abfedb19@sentry.gc.nav.no/36',
      miljø: 'preprod',
      modellVersjon: modellVersjon,
    };
  } else if (window.location.hostname.indexOf('www') > -1) {
    return {
      veiviserUrl: 'https://www.nav.no/familie/alene-med-barn/veiviser',
      apiUrl: 'https://www.nav.no/familie/alene-med-barn/soknad-api',
      loginService: 'https://loginservice.nav.no/login?',
      dokumentUrl: `https://www.nav.no/familie/dokument/api/mapper/ANYTTHING`, //Vil uansett gå til bucket "familievedlegg" enn så lenge,
      mellomlagerUrl: `https://www.nav.no/familie/dokument/api/soknad/`,
      sentryUrl: 'https://88f5ed8ed0fc42139eaf7061abfedb19@sentry.gc.nav.no/36',
      miljø: 'production',
      modellVersjon: modellVersjon,
    };
  } else {
    return {
      veiviserUrl: '',
      apiUrl: '',
      loginService: `http://localhost:8091/local/cookie?subject=21057822284&issuerId=selvbetjening&audience=aud-localhost`, // forventet i api ved innsending (local) - syntetisk fnr
      dokumentUrl: `/api/dokument`,
      mellomlagerUrl: `/api/mellomlager/`,
      miljø: 'local',
      modellVersjon: modellVersjon,
    };
  }
};

export default Environment;
