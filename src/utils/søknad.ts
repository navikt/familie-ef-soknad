import Environment from '../Environment';
import axios from 'axios';
import { IPerson, ISivilstand } from '../models/person';

export const hentPersonData = () => {
  return axios
    .get(`${Environment().apiUrl}/api/oppslag/sokerinfo`, {
      headers: {
        'content-type': 'application/json;charset=utf-8',
      },
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      return response.data;
    });
};

export const hentSivilstatus = (statuskode: string) => {
  switch (statuskode) {
    case 'GIFT':
      return 'Gift';

    case 'UGIF':
      return 'Ugift';

    default:
      return 'Annen sivilstatus enn GIFT og UGIF';
  }
};
