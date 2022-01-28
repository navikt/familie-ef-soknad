import { LocationStateSøknad } from '../models/søknad/søknad';

function erAvTypen<T>(
  given: unknown
): given is Partial<Record<keyof T, unknown>> {
  return typeof given === 'object' && given !== null;
}

export const kommerFraOppsummeringen = (stateValue: unknown) => {
  return (
    erAvTypen<LocationStateSøknad>(stateValue) &&
    'kommerFraOppsummering' in stateValue &&
    stateValue.kommerFraOppsummering === true
  );
};
