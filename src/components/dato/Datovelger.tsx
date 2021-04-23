import React, { useEffect, useState } from 'react';
import { addYears, subYears } from 'date-fns';
import { Normaltekst } from 'nav-frontend-typografi';
import { Datepicker, isISODateString } from 'nav-datovelger';
import { useSpråkContext } from '../../context/SpråkContext';
import FeltGruppe from '../gruppe/FeltGruppe';
import LocaleTekst from '../../language/LocaleTekst';
import { formatIsoDate } from '../../utils/dato';
import { hentUid } from '../../utils/autentiseringogvalidering/uuid';
import styled from 'styled-components/macro';
import { DatepickerLimitations } from 'nav-datovelger/lib/types';

export const StyledDatovelger = styled.div<{ fetSkrift?: boolean }>`
  .typo-normal {
    font-weight: ${(props) => (props.fetSkrift ? 'bold' : 'normal')};
  }
`;

export enum DatoBegrensning {
  AlleDatoer = 'AlleDatoer',
  FremtidigeDatoer = 'FremtidigeDatoer',
  TidligereDatoer = 'TidligereDatoer',
}

export const datoerFraDatobegrensning = (
  datobegrensning: DatoBegrensning
): DatepickerLimitations => {
  switch (datobegrensning) {
    case DatoBegrensning.AlleDatoer:
      return {};
    case DatoBegrensning.FremtidigeDatoer:
      return {
        minDate: formatIsoDate(new Date()),
        maxDate: formatIsoDate(addYears(new Date(), 100)),
      };
    case DatoBegrensning.TidligereDatoer:
      return {
        minDate: formatIsoDate(subYears(new Date(), 100)),
        maxDate: formatIsoDate(new Date()),
      };
  }
};

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
  const [locale] = useSpråkContext();
  const datolabelid = hentUid();
  const [_dato, _settDato] = useState<string>(valgtDato || '');

  const limitations: DatepickerLimitations = datoerFraDatobegrensning(
    datobegrensning
  );
  const ingenDatoBegrensninger = Object.keys(limitations).length === 0;

  const datoErInnenforDatobegrensninger = (dato: Date) =>
    (!!limitations.maxDate &&
      dato <= new Date(limitations.maxDate) &&
      !!limitations.minDate &&
      dato >= new Date(limitations.minDate)) ||
    ingenDatoBegrensninger;

  const gyldigDato = (dato: string): boolean => {
    let gyldigDato = dato !== '' && isISODateString(dato) === true;
    return gyldigDato && datoErInnenforDatobegrensninger(new Date(dato));
  };

  useEffect(() => {
    if (gyldigDato(_dato)) {
      settDato(_dato);
    } else {
      _settDato(valgtDato || ''); // setter forrige valgt dato hvis det ikke er gyldig
    }
    // eslint-disable-next-line
  }, [_dato]);

  return (
    <StyledDatovelger fetSkrift={fetSkrift}>
      <FeltGruppe>
        <label htmlFor={datolabelid}>
          <Normaltekst>
            <LocaleTekst tekst={tekstid} />
          </Normaltekst>
        </label>
      </FeltGruppe>
      <Datepicker
        inputId={datolabelid}
        locale={locale}
        disabled={disabled}
        onChange={_settDato}
        value={_dato}
        allowInvalidDateSelection={false}
        showYearSelector={true}
        limitations={limitations}
        inputProps={{
          name: 'dateInput',
          'aria-invalid': _dato !== '' && isISODateString(_dato) === false,
        }}
      />
    </StyledDatovelger>
  );
};

export default Datovelger;
