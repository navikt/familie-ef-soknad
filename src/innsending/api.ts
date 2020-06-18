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

export const hentFiltrerBarn = (barn: IBarn[]) => {
  const filtrerteBarn = barn.map((barn) => {
    if (barn.lagtTil) {
      const endretBarn = barn;
      if (barn.født?.verdi || endretBarn.ident.verdi === '')
        delete endretBarn.ident;
      if (endretBarn.fødselsdato === undefined) delete endretBarn.fødselsdato;

      console.log('Hvis ikke født, slett ident ', barn);

      return endretBarn;
    } else {
      return barn;
    }
  });
  console.log(filtrerteBarn);
  return filtrerteBarn;
};
