import { Toggles } from '../models/toggles';
import { preferredAxios } from './axios';

const hentToggles = (settToggles: (toggles: Toggles) => void) => {
  return preferredAxios
    .get('/api/featuretoggle', {
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      settToggles(response.data);
    });
};

export default hentToggles;
