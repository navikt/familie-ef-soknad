import React, { useEffect, useRef } from 'react';
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
import { DatoBegrensning, StyledDatovelger } from './Datovelger';
import styled from 'styled-components/macro';
import KalenderKnapp from './KalenderKnapp';
import { addYears, subYears, addMonths } from 'date-fns';
import { BodyShort } from '@navikt/ds-react';

const InputContainer = styled.div`
  display: inline-block;
  width: 10rem;
  position: relative;
`;

const hentDatobegrensninger = (datobegrensning: DatoBegrensning) => {
  switch (datobegrensning) {
    case DatoBegrensning.AlleDatoer:
      return {};
    case DatoBegrensning.FremtidigeDatoer:
      return {
        minDate: new Date(),
        maxDate: addYears(new Date(), 100),
      };
    case DatoBegrensning.TidligereDatoer:
      return {
        minDate: subYears(new Date(), 100),
        maxDate: new Date(),
      };
    case DatoBegrensning.TidligereDatoerOgSeksMånederFrem:
      return {
        minDate: subYears(new Date(), 100),
        maxDate: addMonths(new Date(), 6),
      };
  }
};

interface Props {
  valgtDato: Date | undefined;
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
  const inputRef = useRef<ReactDatePicker<any>>(null);
  const [locale] = useSpråkContext();
  const datolabelid = hentUid();
  const begrensninger = hentDatobegrensninger(datobegrensning);

  const gyldigeDatoformater = [
    'MMM yyyy',
    'MM-yyyy',
    'MM.yyyy',
    'yyyy-MM',
    'yyyy.MM',
  ];

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
          <BodyShort>
            <LocaleTekst tekst={tekstid} />
          </BodyShort>
        </label>
      </FeltGruppe>
      <FeltGruppe classname="nav-datovelger">
        <InputContainer className="nav-datovelger__inputContainer">
          <KalenderKnapp
            onClick={handleFocus}
            isOpen={false}
            disabled={disabled}
          />
          {datobegrensning === DatoBegrensning.AlleDatoer &&
          Object.entries(begrensninger).length === 0 ? (
            <DatePicker
              name="dateInput"
              id={datolabelid}
              disabled={disabled}
              className={'nav-datovelger__input'}
              onChange={(e: Date | null) => {
                settDato(e);
              }}
              selected={valgtDato !== undefined ? tilDato(valgtDato) : null}
              dateFormat={gyldigeDatoformater}
              locale={locale}
              showMonthYearPicker={true}
              showTwoColumnMonthYearPicker={true}
              ref={inputRef}
              placeholderText={'MM.yyyy'}
            />
          ) : (
            <DatePicker
              name="dateInput"
              id={datolabelid}
              disabled={disabled}
              className={'nav-datovelger__input'}
              onChange={(e: Date | null) => {
                settDato(e);
              }}
              selected={valgtDato !== undefined ? tilDato(valgtDato) : null}
              dateFormat={gyldigeDatoformater}
              locale={locale}
              showMonthYearPicker={true}
              showTwoColumnMonthYearPicker={true}
              ref={inputRef}
              minDate={begrensninger?.minDate}
              maxDate={begrensninger?.maxDate}
              placeholderText={'MM.yyyy'}
            />
          )}
        </InputContainer>
      </FeltGruppe>
    </StyledDatovelger>
  );
};

export default ÅrMånedVelger;
