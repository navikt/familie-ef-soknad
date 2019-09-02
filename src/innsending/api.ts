import axios from 'axios';

function sendInnSøknad(soknad: string) {
    return axios
        .post(`/rest/soknad/sendInn`, soknad, {
            headers: {"content-type": "application/json;charset=utf-8" },
            withCredentials: true
        })
        .then((response: { data: any; }) => {
            return response.data;
        });
}

export { sendInnSøknad };
