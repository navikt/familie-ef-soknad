import axios from 'axios';
import Environment from '../Environment';
import { Toggles } from '../models/toggles';

const hentToggles = (settToggles: (toggles: Toggles) => void) => {
  return axios
    .get(`${Environment().apiUrl}/api/featuretoggle`, {
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      settToggles(response.data);
    });
};

export default hentToggles;
