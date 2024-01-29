import { erLokaltMedMock } from './utils/miljø';

interface EnvironmentProps {
  veiviserUrl: string;
  apiProxyUrl: string;
  wonderwallUrl: string;
  dokumentProxyUrl: string;
  mellomlagerProxyUrl: string;
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
      veiviserUrl:
        'https://familie.ekstern.dev.nav.no/familie/alene-med-barn/veiviser',
      apiProxyUrl:
        'https://familie.ekstern.dev.nav.no/familie/alene-med-barn/soknad/api',
      wonderwallUrl:
        'https://familie.ekstern.dev.nav.no/familie/alene-med-barn/soknad/oauth2/login?redirect=',
      dokumentProxyUrl:
        'https://familie.ekstern.dev.nav.no/familie/alene-med-barn/soknad/dokument/api/mapper/ANYTHING', //Vil uansett gå til bucket "familievedlegg" enn så lenge
      mellomlagerProxyUrl:
        'https://familie.ekstern.dev.nav.no/familie/alene-med-barn/soknad/dokument/api/soknad/',
      sentryUrl: 'https://88f5ed8ed0fc42139eaf7061abfedb19@sentry.gc.nav.no/36',
      miljø: 'preprod',
      modellVersjon: modellVersjon,
    };
  } else if (window.location.hostname.indexOf('www') > -1) {
    return {
      veiviserUrl: 'https://www.nav.no/familie/alene-med-barn/veiviser',
      apiProxyUrl: 'https://www.nav.no/familie/alene-med-barn/soknad/api',
      wonderwallUrl:
        'https://www.nav.no/familie/alene-med-barn/soknad/oauth2/login?redirect=',
      dokumentProxyUrl: `https://www.nav.no/familie/alene-med-barn/soknad/dokument/api/mapper/ANYTHING`, //Vil uansett gå til bucket "familievedlegg" enn så lenge,
      mellomlagerProxyUrl: `https://www.nav.no/familie/alene-med-barn/soknad/dokument/api/soknad/`,
      sentryUrl: 'https://88f5ed8ed0fc42139eaf7061abfedb19@sentry.gc.nav.no/36',
      miljø: 'production',
      modellVersjon: modellVersjon,
    };
  } else if (erLokaltMedMock()) {
    return {
      veiviserUrl: '',
      apiProxyUrl: '',
      wonderwallUrl: `http://localhost:8091/local/cookie?subject=21057822284&issuerId=tokenx&audience=familie-app&redirect=`, // forventet i api ved innsending (local) - syntetisk fnr
      dokumentProxyUrl: `/api/dokument`,
      mellomlagerProxyUrl: `/api/mellomlager/`,
      miljø: 'local',
      modellVersjon: modellVersjon,
    };
  } else {
    return {
      veiviserUrl: '',
      apiProxyUrl: 'http://localhost:8091',
      wonderwallUrl: `http://localhost:8091/local/cookie?subject=21057822284&issuerId=tokenx&audience=familie-app&redirect=`, // forventet i api ved innsending (local) - syntetisk fnr
      dokumentProxyUrl: `http://localhost:8082/api/mapper/ANYTHING`,
      mellomlagerProxyUrl: `http://localhost:8082/api/soknad/`,
      miljø: 'local',
      modellVersjon: modellVersjon,
    };
  }
};

export default Environment;
