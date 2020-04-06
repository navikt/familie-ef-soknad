import { hentUid } from '../utils/uuid';
import { hentTekst } from '../utils/søknad';
import { linjeKursGrad } from '../søknad/steg/5-aktivitet/underUtdanning/UtdanningConfig';
import { IntlShape } from 'react-intl';
import { tomPeriode } from './tommeSøknadsfelter';

export const lagTomUtdanning = (intl: IntlShape) => ({
  react_key: hentUid(),
  linjeKursGrad: {
    label: hentTekst(linjeKursGrad.label_tekstid, intl),
    verdi: '',
  },
  periode: tomPeriode,
});
