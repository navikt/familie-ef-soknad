import React from 'react';
import { addYears, subYears } from 'date-fns';
import { Normaltekst } from 'nav-frontend-typografi';
import { Datepicker, isISODateString } from 'nav-datovelger';

import { useSpråkContext } from '../../context/SpråkContext';
import 'react-datepicker/dist/react-datepicker.css';

import FeltGruppe from '../gruppe/FeltGruppe';
import LocaleTekst from '../../language/LocaleTekst';
import { formatIsoDate } from '../../utils/dato';
import { hentUid } from '../../utils/autentiseringogvalidering/uuid';
import styled from 'styled-components/macro';

const StyledDatovelger = styled.div<{ fetSkrift?: boolean }>`
  .typo-normal {
    font-weight: ${(props) => (props.fetSkrift ? 'bold' : 'normal')};
  }
`;

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
  const [locale] = useSpråkContext();
  const datolabelid = hentUid();

  return (
    <StyledDatovelger fetSkrift={fetSkrift}>
      <FeltGruppe>
        <label htmlFor={datolabelid}>
          <Normaltekst>
            <LocaleTekst tekst={tekstid} />
          </Normaltekst>
        </label>
      </FeltGruppe>
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
            minDate: formatIsoDate(subYears(new Date(), 100)),
            maxDate: formatIsoDate(new Date()),
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
            minDate: formatIsoDate(new Date()),
            maxDate: formatIsoDate(addYears(new Date(), 100)),
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
          inputProps={{
            name: 'dateInput',
            'aria-invalid':
              valgtDato !== '' && isISODateString(valgtDato) === false,
          }}
        />
      ) : null}
    </StyledDatovelger>
  );
};

export default Datovelger;
