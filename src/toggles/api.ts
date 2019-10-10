import axios from 'axios';
import { IToggleName } from './types';

const hentToggles = () => {
  const toggleNames = Object.values(IToggleName).join('&feature=');
  return axios.get(`/api/feature?feature=${toggleNames}`).then((response) => {
    return response.data;
  });
};

export default hentToggles;
