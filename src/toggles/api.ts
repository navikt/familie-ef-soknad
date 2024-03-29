import axios from 'axios';
import Environment from '../Environment';
import { Toggles } from '../models/søknad/toggles';

const hentToggles = (settToggles: (toggles: Toggles) => void) => {
  return axios
    .get(`${Environment().apiProxyUrl}/api/featuretoggle`, {
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      settToggles(response.data);
    });
};

export default hentToggles;
