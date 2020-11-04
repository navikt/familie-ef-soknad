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
