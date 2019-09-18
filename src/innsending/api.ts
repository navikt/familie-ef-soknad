import axios from 'axios';

const sendInnSøknad = (soknad: string) =>
  axios
    .post(`/api/soknad/sendInn`, soknad, {
      headers: { 'content-type': 'application/json;charset=utf-8' },
      withCredentials: true
    })
    .then((response: { data: any }) => {
      return response.data;
    });

export { sendInnSøknad };
