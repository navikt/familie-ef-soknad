import axios from 'axios';
import { IToggleName } from './types';

if (window.location.hostname.indexOf('nais.oera-q.local') > -1)
  axios.defaults.baseURL = 'https://familie-ef-soknad-api.nais.oera-q.local';
else if (window.location.hostname.indexOf('nais.oera.no') > -1)
  axios.defaults.baseURL = 'https://familie-ef-soknad-api.nais.oera.no';
else {
  axios.defaults.baseURL = 'http://localhost:8091/';
}

const hentToggles = () => {
  const toggleNames = Object.values(IToggleName).join('&feature=');
  return axios.get(`/api/feature?feature=${toggleNames}`).then((response) => {
    return response.data;
  });
};
// inject https://unleashproxy.nais.oera.no/api/

export default hentToggles;
