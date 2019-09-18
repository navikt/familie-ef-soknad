import axios from 'axios';

const sendInnSøknad = (soknad: string) => axios
    .get(`https://soknad-kontantstotte-api-q.nav.no/api/tekster`,  {
        withCredentials: true
    })
    .then((response: { data: any; }) => {
        return response.data;
    });

export { sendInnSøknad };

//
// .post(`https://soknad-kontantstotte-api-q.nav.no/api/tekster`, soknad, {
//     headers: {"content-type": "application/json;charset=utf-8"},
//     withCredentials: true
// })