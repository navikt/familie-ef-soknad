import Environment from '../../Environment';
import axios from 'axios';
import { IMellomlagretBarnetilsynSøknad } from '../models/mellomlagretSøknad';

export const hentMellomlagretBarnetilsynFraDokument = () => {
  return axios
    .get(`${Environment().mellomlagerUrl + 'barnetilsyn'}`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
      },
    })
    .then((response: { data?: IMellomlagretBarnetilsynSøknad }) => {
      return response.data;
    });
};

export const mellomlagreBarnetilsynTilDokument = (
  søknad: IMellomlagretBarnetilsynSøknad
) => {
  return axios.post(`${Environment().mellomlagerUrl + 'barnetilsyn'}`, søknad, {
    withCredentials: true,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });
};

export const nullstillMellomlagretBarnetilsynTilDokument = (): Promise<any> => {
  return axios.delete(`${Environment().mellomlagerUrl + 'barnetilsyn'}`, {
    withCredentials: true,
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  });
};
