import React, { useRef } from 'react';
import { addYears, subDays, subYears } from 'date-fns';
import { Normaltekst } from 'nav-frontend-typografi';
import ReactDatePicker from 'react-datepicker';
import { Datepicker, isISODateString } from 'nav-datovelger';

import { useSpråkContext } from '../../context/SpråkContext';
import 'react-datepicker/dist/react-datepicker.css';

import FeltGruppe from '../gruppe/FeltGruppe';
import KalenderIkonSVG from '../../assets/KalenderSVG';
import LocaleTekst from '../../language/LocaleTekst';
import { datoTilStreng } from '../../utils/dato';
import { hentUid } from '../../utils/autentiseringogvalidering/uuid';

export enum DatoBegrensning {
  AlleDatoer = 'AlleDatoer',
  FremtidigeDatoer = 'FremtidigeDatoer',
  TidligereDatoer = 'TidligereDatoer',
}

interface Props {
  valgtDato: string | undefined;
  tekstid: string;
  datobegrensning: DatoBegrensning;
  settDato: (date: string) => void;
  disabled?: boolean;
  fetSkrift?: boolean;
}

const Datovelger: React.FC<Props> = ({
  tekstid,
  datobegrensning,
  valgtDato,
  settDato,
  disabled,
  fetSkrift,
}) => {
  // NOTE: Ble tidligere sendt inn som props til DatePicker (react sin)
  const inputRef = useRef<ReactDatePicker>(null);
  const [locale] = useSpråkContext();
  const datolabelid = hentUid();

  function handleFocus() {
    inputRef?.current?.setOpen(true);
  }

  return (
    <div className={fetSkrift ? 'datovelger-fetskrift' : 'datovelger'}>
      <FeltGruppe>
        <label htmlFor={datolabelid}>
          <Normaltekst>
            <LocaleTekst tekst={tekstid} />
          </Normaltekst>
        </label>
        <div className={'datovelger__wrapper'}>
          <div className={'datepicker__container'}>
            {datobegrensning === DatoBegrensning.TidligereDatoer ? (
              <Datepicker
                inputId={datolabelid}
                locale={locale}
                disabled={disabled}
                onChange={(e) => settDato(e)}
                value={valgtDato ? valgtDato : ''}
                allowInvalidDateSelection={false}
                showYearSelector={true}
                limitations={{
                  weekendsNotSelectable: true,
                  invalidDateRanges: [],
                  minDate: datoTilStreng(addYears(new Date(), 100)),
                  maxDate: datoTilStreng(subDays(new Date(), 0)),
                }}
                inputProps={{
                  name: 'dateInput',
                  'aria-invalid':
                    valgtDato !== '' && isISODateString(valgtDato) === false,
                }}
              />
            ) : datobegrensning === DatoBegrensning.FremtidigeDatoer ? (
              <Datepicker
                inputId={datolabelid}
                disabled={disabled}
                locale={locale}
                onChange={(e) => settDato(e)}
                value={valgtDato ? valgtDato : ''}
                allowInvalidDateSelection={false}
                showYearSelector={true}
                limitations={{
                  weekendsNotSelectable: true,
                  invalidDateRanges: [],
                  minDate: datoTilStreng(addYears(new Date(), 0)),
                  maxDate: datoTilStreng(subDays(new Date(), 100)),
                }}
                inputProps={{
                  name: 'dateInput',
                  'aria-invalid':
                    valgtDato !== '' && isISODateString(valgtDato) === false,
                }}
              />
            ) : datobegrensning === DatoBegrensning.AlleDatoer ? (
              <Datepicker
                inputId={datolabelid}
                disabled={disabled}
                locale={locale}
                onChange={(e) => settDato(e)}
                value={valgtDato ? valgtDato : ''}
                allowInvalidDateSelection={false}
                showYearSelector={true}
                limitations={{
                  weekendsNotSelectable: true,
                  invalidDateRanges: [],
                  maxDate: datoTilStreng(addYears(new Date(), 100)),
                  minDate: datoTilStreng(subYears(new Date(), 200)),
                }}
                inputProps={{
                  name: 'dateInput',
                  'aria-invalid':
                    valgtDato !== '' && isISODateString(valgtDato) === false,
                }}
              />
            ) : null}
          </div>
          <label className={'ikon__wrapper'} onClick={handleFocus}>
            <KalenderIkonSVG />
          </label>
        </div>
      </FeltGruppe>
    </div>
  );
};

export default Datovelger;
