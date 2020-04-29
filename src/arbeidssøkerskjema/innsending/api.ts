import axios from 'axios';
import Environment from '../../Environment';

export const sendInnSkjema = (skjema: object) => {
  return axios
    .post(`${Environment().apiUrl}/api/registrerarbeid`, skjema, {
      headers: { 'content-type': 'application/json;charset=utf-8' },
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      return response.data;
    });
};
