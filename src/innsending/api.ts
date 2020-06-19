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

export const hentFiltrerBarn = (barn: IBarn[]): IBarn[] => {
  const filtrerteBarn = barn.map((barn) => {
    if (barn.lagtTil) {
      const endretBarn = barn;
      if (endretBarn.ident.verdi === '') delete endretBarn.ident;
      console.log(
        'if endretBarn.fødselsdato is udnefined',
        !endretBarn.fødselsdato.verdi,
        endretBarn.fødselsdato
      );
      if (!endretBarn.fødselsdato.verdi) delete endretBarn.fødselsdato;
      return endretBarn;
    } else {
      return barn;
    }
  });
  return filtrerteBarn;
};
