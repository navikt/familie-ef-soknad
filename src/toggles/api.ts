import axios from 'axios';
import { IToggleName } from './types';

const hentToggles = () => {
  const toggleNames = Object.values(IToggleName).join('&feature=');
  return axios
    .get(`https://unleashproxy.nais.oera.no/api/feature?feature=${toggleNames}`)
    .then((response) => {
      return response.data;
    });
};
// inject https://unleashproxy.nais.oera.no/api/

export default hentToggles;
