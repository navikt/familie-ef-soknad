import axios from 'axios';
import Environment from '../Environment';

const sendInnSøknad = (søknad: string, bearerInput: string) => {
  return axios
    .post(`${Environment().apiUrl}/api/soknad/sendInn`, søknad, {
      headers: {
        'content-type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${bearerInput}`,
      },
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      return response.data;
    });
};

export default sendInnSøknad;
