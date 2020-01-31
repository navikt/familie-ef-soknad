import React, { FC, useEffect } from 'react';
import { Element } from 'nav-frontend-typografi';
import DatePicker from 'react-datepicker';
import useSøknadContext from '../../context/SøknadContext';
import { dagensDato } from '../../utils/dato';
import Datovelger, { DatoBegrensning } from './Datovelger';
import { IPeriode } from '../../models/søknad';
import LocaleTekst from '../../language/LocaleTekst';
import FeltGruppe from '../FeltGruppe';

interface Props {
  tekstid: string;
  periode: IPeriode;
  settDato: (dato: Date | null, objektnøkkel: string) => void;
  className?: string;
}

const PeriodeDatovelgere: FC<Props> = ({
  periode,
  settDato,
  tekstid,
  className,
}) => {
  return (
    <div className={className}>
      <FeltGruppe>
        <Element className={''}>
          <LocaleTekst tekst={tekstid} />
        </Element>
      </FeltGruppe>
      <FeltGruppe>
        <Datovelger
          settDato={(e) => settDato(e, 'fra')}
          valgtDato={periode.fra ? periode.fra : undefined}
          tekstid={'periode.fra'}
          datobegrensning={DatoBegrensning.AlleDatoer}
        />
      </FeltGruppe>
      <FeltGruppe>
        <Datovelger
          settDato={(e) => settDato(e, 'til')}
          valgtDato={periode.til ? periode.til : undefined}
          tekstid={'periode.til'}
          datobegrensning={DatoBegrensning.AlleDatoer}
        />
      </FeltGruppe>
    </div>
  );
};

export default PeriodeDatovelgere;
