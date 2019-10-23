import axios from 'axios';
import Environment from '../Environment';

const sendInnSøknad = (søknad: string) => {
  return axios
    .post(`${Environment().apiUrl}/api/soknad/sendInn`, søknad, {
      headers: {
        'content-type': 'application/json;charset=utf-8',
      },
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      return response.data;
    });
};

export default sendInnSøknad;
