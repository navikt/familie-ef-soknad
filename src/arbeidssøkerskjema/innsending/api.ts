import axios from 'axios';
import Environment from '../../Environment';

export const sendInnSkjema = (skjema: object) => {
  return axios
    .post(`${Environment().apiProxyUrl}/api/registrerarbeid`, skjema, {
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      return response.data;
    });
};
