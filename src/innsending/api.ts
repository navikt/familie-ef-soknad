import axios from 'axios';

function sendInnSøknad(soknad: string) {
    return axios
        .post(`/familie-ef-soknad-api/api`, soknad, {
            withCredentials: true
        })
        .then((response: { data: any; }) => {
            return response.data;
        });
}

export { sendInnSøknad };
