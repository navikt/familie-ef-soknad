import axios from 'axios';

axios.defaults.baseURL = window.location.origin + '-api';

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
