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

export const logSpørsmålBesvart = (
  skjemanavn: string,
  skjemaId: number,
  spørsmål: string,
  svar: string,
  props?: any
) => {
  logEvent('skjema_spørsmål_besvart', {
    skjemanavn,
    skjemaId,
    spørsmål,
    svar,
    ...props,
  });
};

export const logSpørsmålBesvartOvergangsstønad = (
  spørsmål: string,
  svar: string
) => {
  const skjemanavn = 'Overgangsstønad';
  const skjemaId = 150001;
  logSpørsmålBesvart(skjemanavn, skjemaId, spørsmål, svar);
};

export const logSpørsmålBesvartArbeidssokerskjema = (
  spørsmål: string,
  svar: string
) => {
  const skjemanavn = 'Arbeidssøker';
  const skjemaId = 150801;
  logSpørsmålBesvart(skjemanavn, skjemaId, spørsmål, svar);
};

export const logSpørsmålBesvartBarnetilsyn = (
  spørsmål: string,
  svar: string
) => {
  const skjemanavn = 'Barnetilsyn';
  const skjemaId = 150002;
  logSpørsmålBesvart(skjemanavn, skjemaId, spørsmål, svar);
};

export const logSpørsmålBesvartSkolepenger = (
  spørsmål: string,
  svar: string
) => {
  const skjemanavn = 'Skolepenger';
  const skjemaId = 150004;
  logSpørsmålBesvart(skjemanavn, skjemaId, spørsmål, svar);
};

export const logSidevisningOvergangsstonad = (side: string) => {
  logEvent('sidevisning', {
    side,
    team_id: 'familie',
    applikasjon: 'OS-soknadsdialog',
    skjemanavn: 'Overgangsstønad',
  });
};

export const logSidevisningArbeidssokerskjema = (side: string) => {
  logEvent('sidevisning', {
    side,
    team_id: 'familie',
    applikasjon: 'Arbeidssokerskjema',
    skjemanavn: 'Arbeidssøker',
  });
};

export const logSidevisningBarnetilsyn = (side: string) => {
  logEvent('sidevisning', {
    side,
    team_id: 'familie',
    applikasjon: 'BT-soknadsdialog',
    skjemanavn: 'Barnetilsyn',
  });
};

export const logSidevisningSkolepenger = (side: string) => {
  logEvent('sidevisning', {
    side,
    team_id: 'familie',
    applikasjon: 'SP-soknadsdialog',
    skjemanavn: 'Skolepenger',
  });
};
