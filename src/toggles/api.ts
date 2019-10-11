import axios from 'axios';
import Environment from '../Environment';

const hentToggles = () => {
  return axios
    .get(`${Environment().apiUrl}/api/featuretoggle`, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    });
};

export default hentToggles;
