import React, { useEffect } from 'react';
import { IUnderUtdanning } from '../../../../models/steg/aktivitet/utdanning';
import PeriodeDatovelgere from '../../../../components/dato/PeriodeDatovelger';
import { tomPeriode } from '../../../../helpers/tommeSøknadsfelter';

interface Props {
  utdanning: IUnderUtdanning;
  settUtdanning: (utdanning: IUnderUtdanning) => void;
}

const NårSkalDuVæreElevEllerStudent: React.FC<Props> = ({
  utdanning,
  settUtdanning,
}) => {
  useEffect(() => {
    settUtdanning({ ...utdanning, periode: tomPeriode });
    // eslint-disable-next-line
  }, []);

  const settPeriode = (dato: Date | null, nøkkel: string): void => {
    utdanning.periode &&
      settUtdanning({
        ...utdanning,
        periode: {
          ...utdanning.periode,
          [nøkkel]: {
            label: 'utdanning.datovelger.studieperiode',
            verdi: dato !== null ? dato : undefined,
          },
        },
      });
  };

  return (
    <>
      <PeriodeDatovelgere
        tekstid={'utdanning.datovelger.studieperiode'}
        periode={utdanning.periode ? utdanning.periode : tomPeriode}
        settDato={settPeriode}
      />
    </>
  );
};

export default NårSkalDuVæreElevEllerStudent;
