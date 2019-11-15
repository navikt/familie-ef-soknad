import { Toggles } from '../models/toggles';

const brukToggles = process.env.REACT_APP_BRUK_TOGGLES === 'true';

export const checkToggle = (toggles: Toggles, toggleName: string) => {
  if (brukToggles) {
    return toggles[toggleName];
  }
  return true;
};
