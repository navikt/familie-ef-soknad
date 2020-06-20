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

export const mapBarnTilEntenIdentEllerFødselsdato = (barn: IBarn[]) => {
  const filtrerteBarn = barn.map((barn) => {
    if (barn.lagtTil) {
      console.log('---------------------');
      console.log(
        'ER BARN LAGT TIL?:',
        barn.navn,
        barn.ident,
        barn.fødselsdato
      );

      if (barn.fødselsdato && !barn.fødselsdato.verdi) {
        console.log('map fdato til tom streng');
        return {
          ...barn,
          fødselsdato: { ...barn.fødselsdato, verdi: '' },
        };
      }

      console.log('ENDRET BARN:', barn);
      return barn;
    } else {
      return barn;
    }
  });
  return filtrerteBarn;
};
