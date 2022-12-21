import { erLokaltMedMock } from './utils/miljø';

interface EnvironmentProps {
  veiviserUrl: string;
  apiUrl: string;
  wonderwallUrl: string;
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
      wonderwallUrl: 'https://familie.dev.nav.no/oauth2/login?',
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
      wonderwallUrl: 'https://familie.nav.no/oauth2/login?',
      dokumentUrl: `https://www.nav.no/familie/dokument/api/mapper/ANYTHING`, //Vil uansett gå til bucket "familievedlegg" enn så lenge,
      mellomlagerUrl: `https://www.nav.no/familie/dokument/api/soknad/`,
      sentryUrl: 'https://88f5ed8ed0fc42139eaf7061abfedb19@sentry.gc.nav.no/36',
      miljø: 'production',
      modellVersjon: modellVersjon,
    };
  } else if (erLokaltMedMock()) {
    return {
      veiviserUrl: '',
      apiUrl: '',
      wonderwallUrl: `http://localhost:8091/local/cookie?subject=21057822284&issuerId=idporten&audience=someaudience`, // forventet i api ved innsending (local) - syntetisk fnr
      dokumentUrl: `/api/dokument`,
      mellomlagerUrl: `/api/mellomlager/`,
      miljø: 'local',
      modellVersjon: modellVersjon,
    };
  } else {
    return {
      veiviserUrl: '',
      apiUrl: 'http://localhost:8091',
      wonderwallUrl: `http://localhost:8091/local/cookie?subject=21057822284&issuerId=idporten&audience=someaudience`, // forventet i api ved innsending (local) - syntetisk fnr
      dokumentUrl: `http://localhost:8082/api/mapper/ANYTHING`,
      mellomlagerUrl: `http://localhost:8082/api/soknad/`,
      miljø: 'local',
      modellVersjon: modellVersjon,
    };
  }
};

export default Environment;
