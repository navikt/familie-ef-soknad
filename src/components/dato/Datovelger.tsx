import React, { useEffect } from 'react';
import { addDays, subDays } from 'date-fns';
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
  disabled?: boolean;
}

const Datovelger: React.FC<Props> = ({
  tekstid,
  datobegrensning,
  valgtDato,
  settDato,
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
        <label className={'datovelger__wrapper'}>
          <div className={'datepicker__container'}>
            {datobegrensning === DatoBegrensning.TidligereDatoer ? (
              <DatePicker
                disabled={disabled}
                className={'datovelger__input'}
                onChange={(e) => settDato(e)}
                placeholderText={'DD.MM.YYYY'}
                selected={valgtDato !== undefined ? valgtDato : null}
                dateFormat={'dd.MM.yyyy'}
                locale={locale}
                maxDate={addDays(new Date(), 0)}
              />
            ) : datobegrensning === DatoBegrensning.FremtidigeDatoer ? (
              <DatePicker
                disabled={disabled}
                className={'datovelger__input'}
                onChange={(e) => settDato(e)}
                placeholderText={'DD.MM.YYYY'}
                selected={valgtDato !== undefined ? valgtDato : null}
                dateFormat={'dd.MM.yyyy'}
                minDate={subDays(new Date(), 0)}
                locale={locale}
              />
            ) : datobegrensning === DatoBegrensning.AlleDatoer ? (
              <DatePicker
                disabled={disabled}
                className={'datovelger__input'}
                onChange={(e) => settDato(e)}
                placeholderText={'DD.MM.YYYY'}
                selected={valgtDato !== undefined ? valgtDato : null}
                dateFormat={'dd.MM.yyyy'}
                locale={locale}
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
