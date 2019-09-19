import axios from 'axios';

const sendInnSøknad = (soknad: string) => axios
    .post(`https://https://familie-ef-soknad-api.nais.oera-q.no/api/soknad/sendInn`,
        soknad, {
        headers: {"content-type": "application/json;charset=utf-8"},
        withCredentials: true
    })
    .then((response: { data: any; }) => {
        return response.data;
    });

export { sendInnSøknad };

// .post(`/api/soknad/sendInn`, soknad, {
//     headers: {"content-type": "application/json;charset=utf-8"},
//     withCredentials: true
// })

// .get(`https://soknad-kontantstotte-api-q.nav.no/api/tekster`,  {
//     withCredentials: true
// })
//
// .get(`https://familie-ef-soknad-api-q.nav.no/internal/status/isAlive`,  {
//     withCredentials: true
// })