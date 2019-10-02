import axios from 'axios';

if (window.location.hostname.indexOf('nais.oera-q.local') > -1)
  axios.defaults.baseURL = 'https://familie-ef-soknad-api.nais.oera-q.local';
else if (window.location.hostname.indexOf('nais.oera.no') > -1)
  axios.defaults.baseURL = 'https://familie-ef-soknad-api.nais.oera.no/';
else {
  axios.defaults.baseURL = 'localhost:8081/';
}
const sendInnSøknad = (soknad: string) =>
  axios
    .post(`/api/ping`, soknad, {
      headers: { 'content-type': 'application/json;charset=utf-8' },
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      return response.data;
    });

export { sendInnSøknad };
