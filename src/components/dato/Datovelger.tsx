import React, { useEffect, useState } from 'react';
import { addYears, subYears } from 'date-fns';
import { Normaltekst } from 'nav-frontend-typografi';
import { Datepicker, isISODateString } from 'nav-datovelger';
import { useSpråkContext } from '../../context/SpråkContext';
import FeltGruppe from '../gruppe/FeltGruppe';
import LocaleTekst from '../../language/LocaleTekst';
import { dagensDato, erGyldigDato, formatIsoDate } from '../../utils/dato';
import { hentUid } from '../../utils/autentiseringogvalidering/uuid';
import styled from 'styled-components/macro';
import { DatepickerLimitations } from 'nav-datovelger/lib/types';
import Feilmelding from '../feil/Feilmelding';

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

const hentFeilmeldingTekstid = (
  dato: string,
  datobegrensning: DatoBegrensning
): string => {
  if (!erGyldigDato(dato)) return 'datovelger.ugyldigDato';
  else if (datobegrensning === DatoBegrensning.FremtidigeDatoer)
    return 'datovelger.ugyldigDato.kunFremtidigeDatoer';
  else if (datobegrensning === DatoBegrensning.TidligereDatoer)
    return 'datovelger.ugyldigDato.kunTidligereDatoer';
  else return '';
};

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
}

const Datovelger: React.FC<Props> = ({
  tekstid,
  datobegrensning,
  valgtDato,
  settDato,
  disabled,
  fetSkrift,
}) => {
  const [locale] = useSpråkContext();
  const datolabelid = hentUid();
  const [_dato, _settDato] = useState<string>(valgtDato || '');

  const limitations: DatepickerLimitations = hentDatobegrensninger(
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
    return (
      dato !== '' &&
      isISODateString(dato) === true &&
      erGyldigDato(dato) &&
      datoErInnenforDatobegrensninger(new Date(dato))
    );
  };

  useEffect(() => {
    settDato(_dato);
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
            'aria-invalid':
              _dato !== '' &&
              isISODateString(_dato) === false &&
              valgtDato !== undefined &&
              gyldigDato(valgtDato),
          }}
        />
      </FeltGruppe>

      {!gyldigDato(_dato) && _dato !== '' && (
        <Feilmelding tekstid={hentFeilmeldingTekstid(_dato, datobegrensning)} />
      )}
    </StyledDatovelger>
  );
};

export default Datovelger;
