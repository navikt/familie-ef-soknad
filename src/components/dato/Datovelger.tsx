import React, { useEffect, useState } from 'react';
import { addMonths, addYears, subYears } from 'date-fns';
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
import { Label } from '@navikt/ds-react';

export const StyledLabel = styled(Label)<{ fetSkrift?: boolean }>`
  font-weight: ${(props) => (props.fetSkrift ? 'bold' : 'normal')};
`;

const LabelWrapper = styled.div`
  margin-bottom: 0.5rem;
`;

export enum DatoBegrensning {
  AlleDatoer = 'AlleDatoer',
  FremtidigeDatoer = 'FremtidigeDatoer',
  TidligereDatoer = 'TidligereDatoer',
  TidligereDatoerOgSeksMånederFrem = 'TidligereDatoerOgSeksMånederFrem',
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
    case DatoBegrensning.TidligereDatoerOgSeksMånederFrem:
      return {
        minDate: formatIsoDate(subYears(dagensDato, 100)),
        maxDate: formatIsoDate(addMonths(dagensDato, 6)),
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

  const limitations: DatepickerLimitations =
    hentDatobegrensninger(datobegrensning);

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
    settDato(_dato);
    _dato !== '' && settFeilmelding(hentFeilmelding(_dato, datobegrensning));

    // eslint-disable-next-line
  }, [_dato]);

  return (
    <div>
      <FeltGruppe>
        <LabelWrapper>
          <StyledLabel fetSkrift={fetSkrift} htmlFor={datolabelid}>
            <LocaleTekst tekst={tekstid} />
          </StyledLabel>
        </LabelWrapper>
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
    </div>
  );
};

export default Datovelger;
