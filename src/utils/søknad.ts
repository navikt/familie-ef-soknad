import { preferredAxios } from '../api/axios';

export const hentPersonData = () => {
  return preferredAxios
    .get(`/api/oppslag/sokerinfo`, {
      headers: {
        'content-type': 'application/json;charset=utf-8',
      },
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      return response && response.data;
    });
};

export const hentSivilstatus = (statuskode: string) => {
  switch (statuskode) {
    case 'GIFT':
      return 'Gift';

    case 'UGIF':
      return 'Ugift';

    case 'SAMB':
      return 'Samboer';

    case 'SEPA':
      return 'Separert';

    case 'SKIL':
      return 'Skilt';

    case 'ENKE':
      return 'Enke/ enkemann';

    default:
      return 'Annen sivilstatus enn GIFT, UGIF, SAMB, SEPA, SKIL';
  }
};
