import axios from 'axios';
import Environment from '../Environment';
import { IBarn } from '../models/barn';

export const sendInnSøknad = (søknad: object) => {
  return axios
    .post(`${Environment().apiUrl}/api/soknad`, søknad, {
      headers: { 'content-type': 'application/json;charset=utf-8' },
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      return response.data;
    });
};

export const sendInnBarnetilsynSøknad = (søknad: object) => {
  return axios
    .post(`${Environment().apiUrl}/api/soknadbarnetilsyn`, søknad, {
      headers: { 'content-type': 'application/json;charset=utf-8' },
      withCredentials: true,
    })
    .then((response: { data: any }) => {
      return response.data;
    });
};

export const mapBarnTilEntenIdentEllerFødselsdato = (barn: IBarn[]) => {
  const filtrerteBarn = barn.map((barn) => {
    if (barn.lagtTil) {
      if (barn.fødselsdato && !barn.fødselsdato.verdi) {
        const endretBarn: IBarn = {
          ...barn,
          fødselsdato: { ...barn.fødselsdato, verdi: '' },
        };
        return endretBarn;
      }
    }
    return barn;
  });
  return filtrerteBarn;
};
