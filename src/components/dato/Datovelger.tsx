import React, { useEffect } from 'react';
import { addDays, addYears, subDays, subYears } from 'date-fns';
import { Normaltekst } from 'nav-frontend-typografi';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { useSpråkContext } from '../../context/SpråkContext';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
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
}

const Datovelger: React.FC<Props> = ({
  tekstid,
  datobegrensning,
  valgtDato,
  settDato,
  showMonthYearPicker,
  disabled,
}) => {
  const [locale] = useSpråkContext();

  const settLocaleForDatePicker = () => {
    locale === 'nn'
      ? registerLocale('nn', nn)
      : locale === 'nb'
      ? registerLocale('nb', nb)
      : registerLocale('en-US', en);
  };

  useEffect(() => {
    setDefaultLocale('nb');
    // eslint-disable-next-line
  }, []);

  settLocaleForDatePicker();

  return (
    <div className={'datovelger'}>
      <FeltGruppe>
        <Normaltekst>
          <LocaleTekst tekst={tekstid} />
        </Normaltekst>
        <label
          className={'datovelger__wrapper'}
          onClick={(e) => e.preventDefault()}
        >
          <div className={'datepicker__container'}>
            {datobegrensning === DatoBegrensning.TidligereDatoer ? (
              <DatePicker
                disabled={disabled}
                className={'datovelger__input'}
                onChange={(e) => settDato(e)}
                placeholderText={'DD.MM.YYYY'}
                selected={valgtDato !== undefined ? tilDato(valgtDato) : null}
                dateFormat={'dd.MM.yyyy'}
                locale={locale}
                maxDate={addDays(new Date(), 0)}
                minDate={subYears(new Date(), 200)}
                showMonthYearPicker={showMonthYearPicker === true}
              />
            ) : datobegrensning === DatoBegrensning.FremtidigeDatoer ? (
              <DatePicker
                disabled={disabled}
                className={'datovelger__input'}
                onChange={(e) => settDato(e)}
                placeholderText={'DD.MM.YYYY'}
                selected={valgtDato !== undefined ? tilDato(valgtDato) : null}
                dateFormat={'dd.MM.yyyy'}
                maxDate={addYears(new Date(), 100)}
                minDate={subDays(new Date(), 0)}
                locale={locale}
                showMonthYearPicker={showMonthYearPicker === true}
              />
            ) : datobegrensning === DatoBegrensning.AlleDatoer ? (
              <DatePicker
                disabled={disabled}
                className={'datovelger__input'}
                onChange={(e) => settDato(e)}
                placeholderText={'DD.MM.YYYY'}
                selected={valgtDato !== undefined ? tilDato(valgtDato) : null}
                dateFormat={'dd.MM.yyyy'}
                locale={locale}
                maxDate={addYears(new Date(), 100)}
                minDate={subYears(new Date(), 200)}
                showMonthYearPicker={showMonthYearPicker === true}
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
