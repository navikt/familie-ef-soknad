import React from 'react';
import { useSpråkContext } from '../../context/SpråkContext';
import { hentUid } from '../../utils/autentiseringogvalidering/uuid';
import { DatoBegrensning } from './Datovelger';
import { MonthPicker, useMonthpicker } from '@navikt/ds-react';
import { hentTekst } from '../../utils/søknad';
import { useLokalIntlContext } from '../../context/LokalIntlContext';
import { hentDatobegrensninger } from '../../utils/dato';

interface Props {
  valgtDato: Date | undefined;
  tekstid: string;
  datobegrensning: DatoBegrensning;
  settDato: (date: Date | null) => void;
}

const MånedÅrVelger: React.FC<Props> = ({
  tekstid,
  datobegrensning,
  valgtDato,
  settDato,
}) => {
  const [locale] = useSpråkContext();
  const intl = useLokalIntlContext();
  const datolabelid = hentUid();
  const begrensninger = hentDatobegrensninger(datobegrensning);

  const handleSettDato = (dato: Date | undefined): void => {
    if (dato) {
      console.log(
        `satt måned ${dato?.getMonth()} og år ${dato?.getFullYear()}`
      );
      settDato(dato as Date | null);
    } else {
      settDato(null);
    }
  };

  const { monthpickerProps, inputProps } = useMonthpicker({
    defaultSelected: valgtDato,
    onMonthChange: handleSettDato,
    fromDate: begrensninger?.minDate,
    toDate: begrensninger?.maxDate,
    openOnFocus: false,
  });

  return (
    <div>
      <MonthPicker {...monthpickerProps} id={datolabelid} locale={locale}>
        <MonthPicker.Input
          {...inputProps}
          label={hentTekst(tekstid, intl)}
          placeholder={hentTekst('datovelger.månedÅrPlaceholder', intl)}
        />
      </MonthPicker>
    </div>
  );
};

export default MånedÅrVelger;
