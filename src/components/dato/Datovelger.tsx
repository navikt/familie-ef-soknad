import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Normaltekst } from 'nav-frontend-typografi';
import LocaleTekst from '../../language/LocaleTekst';
import FeltGruppe from '../FeltGruppe';
import KalenderIkonSVG from '../../assets/KalenderSVG';
import { addDays, subDays } from 'date-fns';
import { dagensDato } from '../../utils/dato';

export enum DatoBegrensning {
  AlleDatoer = 'AlleDatoer',
  FremtidigeDatoer = 'FremtidigeDatoer',
  TidligereDatoer = 'TidligereDatoer',
}

interface Props {
  valgtDato: Date | undefined;
  tekstid: string;
  datobegrensning: DatoBegrensning;
  settDato: (date: Date | null) => void;
}

const Datovelger: React.FC<Props> = ({
  tekstid,
  datobegrensning,
  valgtDato,
  settDato,
}) => {
  useEffect(() => {
    settDato(dagensDato);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={'datovelger'}>
      <FeltGruppe>
        <Normaltekst>
          <LocaleTekst tekst={tekstid} />
        </Normaltekst>
        <label className={'datovelger__wrapper'}>
          <div className={'datepicker__container'}>
            {datobegrensning === DatoBegrensning.TidligereDatoer ? (
              <DatePicker
                onChange={(e) => settDato(e)}
                selected={valgtDato !== undefined ? valgtDato : dagensDato}
                dateFormat={'dd.MM.yyyy'}
                maxDate={addDays(new Date(), 0)}
                className={'datovelger__input'}
              />
            ) : datobegrensning === DatoBegrensning.FremtidigeDatoer ? (
              <DatePicker
                onChange={(e) => settDato(e)}
                selected={valgtDato !== undefined ? valgtDato : dagensDato}
                dateFormat={'dd.MM.yyyy'}
                minDate={subDays(new Date(), 0)}
                className={'datovelger__input'}
              />
            ) : datobegrensning === DatoBegrensning.AlleDatoer ? (
              <DatePicker
                onChange={(e) => settDato(e)}
                selected={valgtDato !== undefined ? valgtDato : dagensDato}
                dateFormat={'dd.MM.yyyy'}
                className={'datovelger__input'}
              />
            ) : null}
          </div>
          <div className={'ikon__wrapper'}>
            <KalenderIkonSVG />
          </div>
        </label>
      </FeltGruppe>
    </div>
  );
};

export default Datovelger;
