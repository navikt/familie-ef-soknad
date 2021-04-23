import React, { useEffect, useRef } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import ReactDatePicker from 'react-datepicker';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import { useSpråkContext } from '../../context/SpråkContext';
import 'react-datepicker/dist/react-datepicker.css';
import en from 'date-fns/locale/en-US';
import nb from 'date-fns/locale/nb';
import nn from 'date-fns/locale/nn';
import FeltGruppe from '../gruppe/FeltGruppe';
import LocaleTekst from '../../language/LocaleTekst';
import { tilDato } from '../../utils/dato';
import { hentUid } from '../../utils/autentiseringogvalidering/uuid';
import KalenderIkonSVG from '../../assets/KalenderIkonSVG';
import { DatoBegrensning, StyledDatovelger } from './Datovelger';
import styled from 'styled-components/macro';

const DatePickerIkonWrapper = styled.div`
`;

interface Props {
  valgtDato: string | Date | undefined;
  tekstid: string;
  datobegrensning: DatoBegrensning;
  settDato: (date: Date | null) => void;
  disabled?: boolean;
  fetSkrift?: boolean;
}

const ÅrMånedVelger: React.FC<Props> = ({
  tekstid,
  datobegrensning,
  valgtDato,
  settDato,
  disabled,
  fetSkrift,
}) => {
  const inputRef = useRef<ReactDatePicker>(null);
  const [locale] = useSpråkContext();
  const datolabelid = hentUid();

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
  });

  settLocaleForDatePicker();


  return (
    <StyledDatovelger fetSkrift={fetSkrift}>
      <FeltGruppe>
        <label htmlFor={datolabelid}>
          <Normaltekst>
            <LocaleTekst tekst={tekstid} />
          </Normaltekst>
        </label>
      </FeltGruppe>
      <FeltGruppe>
        <DatePickerIkonWrapper>
          <DatePicker
            ariaLabelledBy={'Datepicker - MM.yyyy format'}
            id={datolabelid}
            disabled={disabled}
            className={'datovelger__input'}
            onChange={(e: Date | null) => {
              settDato(e);
            }}
            selected={valgtDato !== undefined ? tilDato(valgtDato) : null}
            dateFormat={[
              'MMM yyyy',
              'MM-yyyy',
              'MM.yyyy',
              'yyyy-MM',
              'yyyy.MM',
            ]}
            locale={locale}
            showMonthYearPicker={true}
            ref={inputRef}
          />
          <label className={'ikon__wrapper'} onClick={handleFocus}>
            <KalenderIkonSVG />
          </label>
        </DatePickerIkonWrapper>
      </FeltGruppe>
    </StyledDatovelger>
  );
};

export default ÅrMånedVelger;
