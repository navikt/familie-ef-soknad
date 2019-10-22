import axios from 'axios';
import Environment from '../Environment';
import Cookies from 'js-cookie';

const sendInnSøknad = (søknad: string) => {
  let selvbetjenings = Cookies.get('selvbetjening-idtoken');
  Cookies.set('localhost-idtoken', '');
  console.log('TOKEN: ', selvbetjenings);

  return axios
    .post(`${Environment().apiUrl}/api/soknad/sendInn`, søknad, {
      headers: {
        'content-type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${selvbetjenings}`,
      },
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      return response.data;
    });
};

export default sendInnSøknad;

//
