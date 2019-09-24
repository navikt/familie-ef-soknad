import axios from 'axios';

const sendInnSøknad = (soknad: string) => axios
    .post(`https://familie-ef-soknad-api.nais.oera-q.local/api/ping`, soknad, {
        headers: {"content-type": "application/json;charset=utf-8"},
        withCredentials: true
    })
    .then((response: { data: any }) => {
      return response.data;
    });

const pingApi = () => axios
    .get(`https://familie-ef-soknad-api.nais.oera-q.local/api/ping`,  {
        withCredentials: true
    })
    .then((response: { data: any }) => {
        return response.data;
    });

export { sendInnSøknad, pingApi };


//     .get(`https://familie-ef-soknad-api.nais.oera-q.local/api/soknad/sendInn`,  {
//         withCredentials: true
// })

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