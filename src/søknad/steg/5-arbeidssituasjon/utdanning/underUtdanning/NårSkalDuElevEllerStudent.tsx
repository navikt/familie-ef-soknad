import React from 'react';
import { IUnderUtdanning } from '../../../../../models/arbeidssituasjon/utdanning';
import PeriodeDatovelgere from '../../../../../components/dato/PeriodeDatovelger';

interface Props {
  utdanning: IUnderUtdanning;
  settUtdanning: (utdanning: IUnderUtdanning) => void;
}

const NårSkalDuVæreElevEllerStudent: React.FC<Props> = ({
  utdanning,
  settUtdanning,
}) => {
  const settPeriode = (dato: Date | null, nøkkel: string): void => {
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
        periode={utdanning.periode}
        settDato={settPeriode}
      />
    </>
  );
};

export default NårSkalDuVæreElevEllerStudent;
