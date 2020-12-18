import React, { useEffect, useRef } from 'react';
import { addDays, addYears, subDays, subYears } from 'date-fns';
import { Normaltekst } from 'nav-frontend-typografi';
import ReactDatePicker from 'react-datepicker';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import { useSpråkContext } from '../../context/SpråkContext';
import 'react-datepicker/dist/react-datepicker.css';
import en from 'date-fns/locale/en-US';
import nb from 'date-fns/locale/nb';
import nn from 'date-fns/locale/nn';
import FeltGruppe from '../gruppe/FeltGruppe';
import KalenderIkonSVG from '../../assets/KalenderSVG';
import LocaleTekst from '../../language/LocaleTekst';
import { tilDato } from '../../utils/dato';

export enum DatoBegrensning {
  AlleDatoer = 'AlleDatoer',
  FremtidigeDatoer = 'FremtidigeDatoer',
  TidligereDatoer = 'TidligereDatoer',
}

interface Props {
  valgtDato: string | Date | undefined;
  tekstid: string;
  datobegrensning: DatoBegrensning;
  settDato: (date: Date | null) => void;
  showMonthYearPicker?: Boolean;
  disabled?: boolean;
  fetSkrift?: boolean;
}

const Datovelger: React.FC<Props> = ({
  tekstid,
  datobegrensning,
  valgtDato,
  settDato,
  showMonthYearPicker,
  disabled,
  fetSkrift,
}) => {
  const inputRef = useRef<ReactDatePicker>(null);
  const [locale] = useSpråkContext();

  const settLocaleForDatePicker = () => {
    locale === 'nn'
      ? registerLocale('nn', nn)
      : locale === 'nb'
      ? registerLocale('nb', nb)
      : registerLocale('en-US', en);
  };

  function handleFocus() {
    inputRef?.current?.setOpen(true);
  }

  useEffect(() => {
    setDefaultLocale('nb');
    // eslint-disable-next-line
  }, []);

  settLocaleForDatePicker();

  const datoFormat = showMonthYearPicker === true ? 'MMM yyyy' : 'dd.MM.yyyy';
  const placeholderTekst = showMonthYearPicker === true ? '' : 'DD.MM.ÅÅÅÅ';
  return (
    <div className={fetSkrift ? 'datovelger-fetskrift' : 'datovelger'}>
      <FeltGruppe>
        <label htmlFor={tekstid}>
          <Normaltekst>
            <LocaleTekst tekst={tekstid} />
          </Normaltekst>
        </label>
        <div
          className={'datovelger__wrapper'}
          // onClick={(e) => e.preventDefault()}
        >
          <div className={'datepicker__container'}>
            {datobegrensning === DatoBegrensning.TidligereDatoer ? (
              <DatePicker
                id={tekstid}
                disabled={disabled}
                className={'datovelger__input'}
                onChange={(e) => settDato(e)}
                placeholderText={placeholderTekst}
                selected={valgtDato !== undefined ? tilDato(valgtDato) : null}
                dateFormat={datoFormat}
                locale={locale}
                maxDate={addDays(new Date(), 0)}
                minDate={subYears(new Date(), 200)}
                showMonthYearPicker={showMonthYearPicker === true}
                ref={inputRef}
              />
            ) : datobegrensning === DatoBegrensning.FremtidigeDatoer ? (
              <DatePicker
                id={tekstid}
                disabled={disabled}
                className={'datovelger__input'}
                onChange={(e) => settDato(e)}
                placeholderText={placeholderTekst}
                selected={valgtDato !== undefined ? tilDato(valgtDato) : null}
                dateFormat={datoFormat}
                maxDate={addYears(new Date(), 100)}
                minDate={subDays(new Date(), 0)}
                locale={locale}
                showMonthYearPicker={showMonthYearPicker === true}
                ref={inputRef}
              />
            ) : datobegrensning === DatoBegrensning.AlleDatoer ? (
              <DatePicker
                id={tekstid}
                disabled={disabled}
                className={'datovelger__input'}
                onChange={(e) => settDato(e)}
                placeholderText={placeholderTekst}
                selected={valgtDato !== undefined ? tilDato(valgtDato) : null}
                dateFormat={datoFormat}
                locale={locale}
                maxDate={addYears(new Date(), 100)}
                minDate={subYears(new Date(), 200)}
                showMonthYearPicker={showMonthYearPicker === true}
                ref={inputRef}
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
