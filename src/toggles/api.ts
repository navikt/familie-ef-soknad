import axios from 'axios';
import Environment from '../Environment';

const hentToggles = (settToggles: any) => {
  return axios
    .get(`${Environment().apiUrl}/api/featuretoggle`, {
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      console.log('resdata ' + JSON.stringify(response));
      settToggles(response.data);
    });
};

export default hentToggles;
