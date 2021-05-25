import React, { useEffect, useState } from 'react';
import { addYears, subYears } from 'date-fns';
import { Normaltekst } from 'nav-frontend-typografi';
import { Datepicker } from 'nav-datovelger';
import { useSpråkContext } from '../../context/SpråkContext';
import FeltGruppe from '../gruppe/FeltGruppe';
import LocaleTekst from '../../language/LocaleTekst';
import { dagensDato, erGyldigDato, formatIsoDate } from '../../utils/dato';
import { hentUid } from '../../utils/autentiseringogvalidering/uuid';
import styled from 'styled-components/macro';
import { DatepickerLimitations } from 'nav-datovelger/lib/types';
import Feilmelding from '../feil/Feilmelding';
import { erDatoInnaforBegrensinger } from './utils';
import { strengTilDato } from '../../utils/dato';

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

const hentDatobegrensninger = (
  datobegrensning: DatoBegrensning
): DatepickerLimitations => {
  switch (datobegrensning) {
    case DatoBegrensning.AlleDatoer:
      return {};
    case DatoBegrensning.FremtidigeDatoer:
      return {
        minDate: formatIsoDate(dagensDato),
        maxDate: formatIsoDate(addYears(dagensDato, 100)),
      };
    case DatoBegrensning.TidligereDatoer:
      return {
        minDate: formatIsoDate(subYears(dagensDato, 100)),
        maxDate: formatIsoDate(dagensDato),
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
  gjemFeilmelding?: boolean;
}

const Datovelger: React.FC<Props> = ({
  tekstid,
  datobegrensning,
  valgtDato,
  settDato,
  disabled,
  fetSkrift,
  gjemFeilmelding,
}) => {
  const [locale] = useSpråkContext();
  const datolabelid = hentUid();
  const [_dato, _settDato] = useState<string>(valgtDato ? valgtDato : '');
  const [feilmelding, settFeilmelding] = useState<string>('');

  const datoTilRiktigFormat = (dato: string) => {
    return formatIsoDate(strengTilDato(dato));
  };

  const limitations: DatepickerLimitations = hentDatobegrensninger(
    datobegrensning
  );

  const hentFeilmelding = (
    dato: string,
    datobegrensning: DatoBegrensning
  ): string => {
    if (!erGyldigDato(dato)) {
      return 'datovelger.ugyldigDato';
    } else if (
      datobegrensning === DatoBegrensning.FremtidigeDatoer &&
      !erDatoInnaforBegrensinger(dato, datobegrensning)
    ) {
      return 'datovelger.ugyldigDato.kunFremtidigeDatoer';
    } else if (
      datobegrensning === DatoBegrensning.TidligereDatoer &&
      !erDatoInnaforBegrensinger(dato, datobegrensning)
    ) {
      return 'datovelger.ugyldigDato.kunTidligereDatoer';
    } else {
      return '';
    }
  };

  useEffect(() => {
    _dato !== '' && settDato(datoTilRiktigFormat(_dato));
    _dato !== '' && settFeilmelding(hentFeilmelding(_dato, datobegrensning));

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
      <FeltGruppe>
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
            placeholder: 'DD.MM.YYYY',
            name: 'dateInput',
            'aria-invalid': _dato !== '' && feilmelding !== '',
          }}
        />
      </FeltGruppe>

      {!gjemFeilmelding && _dato !== '' && feilmelding !== '' && (
        <Feilmelding tekstid={feilmelding} />
      )}
    </StyledDatovelger>
  );
};

export default Datovelger;
