import axios from 'axios';

const sendInnSøknad = (soknad: string) =>
  axios
    .post(`https://familie-ef-soknad-api.nais.oera-q.local/api/ping`, soknad, {
      headers: { 'content-type': 'application/json;charset=utf-8' },
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      return response.data;
    });

export { sendInnSøknad };
