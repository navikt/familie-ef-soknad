import amplitude from 'amplitude-js';

const amplitudeInstance = amplitude.getInstance();

amplitudeInstance.init('default', '', {
  apiEndpoint: 'amplitude.nav.no/collect-auto',
  saveEvents: false,
  includeUtm: true,
  includeReferrer: true,
  platform: window.location.toString(),
});

export function logEvent(eventName: string, eventProperties: any) {
  amplitudeInstance.logEvent(eventName, eventProperties);
}

export const logSidevisningOvergangsstonad = (side: string) => {
  logEvent('sidevisning', {
    side,
    team: 'familie',
    applikasjon: 'OS-soknadsdialog',
  });
};

export const logSidevisningArbeidssokerskjema = (side: string) => {
  logEvent('sidevisning', {
    side,
    team: 'familie',
    applikasjon: 'Arbeidssokerskjema',
  });
};

export const logSidevisningBarnetilsyn = (side: string) => {
  logEvent('sidevisning', {
    side,
    team: 'familie',
    applikasjon: 'BT-soknadsdialog',
  });
};

export const logSidevisningSkolepenger = (side: string) => {
  logEvent('sidevisning', {
    side,
    team: 'familie',
    applikasjon: 'SP-soknadsdialog',
  });
};
