import Environment from '../../Environment';
import axios from 'axios';
import { IMellomlagretSkolepengerSøknad } from '../models/mellomlagretSøknad';

export const hentMellomlagretSkolepengerFraDokument = () => {
  return axios
    .get(`${Environment().mellomlagerUrl + 'skolepenger'}`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    })
    .then((response: { data?: IMellomlagretSkolepengerSøknad }) => {
      return response.data;
    });
};

export const mellomlagreSkolepengerTilDokument = (
  søknad: IMellomlagretSkolepengerSøknad
) => {
  return axios.post(`${Environment().mellomlagerUrl + 'skolepenger'}`, søknad, {
    withCredentials: true,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });
};

export const nullstillMellomlagretSkolepengerTilDokument = (): Promise<any> => {
  return axios.delete(`${Environment().mellomlagerUrl + 'skolepenger'}`, {
    withCredentials: true,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });
};
