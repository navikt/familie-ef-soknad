import React, { useEffect } from 'react';
import { IUnderUtdanning } from '../../../../models/steg/aktivitet/utdanning';
import PeriodeDatovelgere from '../../../../components/dato/PeriodeDatovelger';
import { tomPeriode } from '../../../../helpers/tommeSøknadsfelter';
import { DatoBegrensning } from '../../../../components/dato/Datovelger';
import { datoTilStreng } from '../../../../utils/dato';
import { hentTekst } from '../../../../utils/søknad';
import { useIntl } from 'react-intl';
import { EPeriode } from '../../../../models/felles/periode';

interface Props {
  utdanning: IUnderUtdanning;
  settUtdanning: (utdanning: IUnderUtdanning) => void;
}

const NårSkalDuVæreElevEllerStudent: React.FC<Props> = ({
  utdanning,
  settUtdanning,
}) => {
  const intl = useIntl();
  useEffect(() => {
    if (!utdanning.periode) {
      settUtdanning({ ...utdanning, periode: tomPeriode });
    }
    // eslint-disable-next-line
  }, []);

  const settPeriode = (dato: Date | null, nøkkel: EPeriode): void => {
    utdanning.periode &&
      settUtdanning({
        ...utdanning,
        periode: {
          ...utdanning.periode,
          [nøkkel]: {
            label: hentTekst(
              'utdanning.datovelger.studieperiode.fremtidig',
              intl
            ),
            verdi: dato !== null ? datoTilStreng(dato) : undefined,
          },
        },
      });
  };

  return (
    <>
      <PeriodeDatovelgere
        tekst={hentTekst('utdanning.datovelger.studieperiode.fremtidig', intl)}
        periode={utdanning.periode ? utdanning.periode : tomPeriode}
        settDato={settPeriode}
        datobegrensing={DatoBegrensning.AlleDatoer}
      />
    </>
  );
};

export default NårSkalDuVæreElevEllerStudent;
