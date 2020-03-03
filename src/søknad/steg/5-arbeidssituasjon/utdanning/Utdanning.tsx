import React, { useEffect, useState } from 'react';
import SeksjonGruppe from '../../../../components/gruppe/SeksjonGruppe';
import { IArbeidssituasjon } from '../../../../models/arbeidssituasjon/arbeidssituasjon';
import { IUnderUtdanning } from '../../../../models/arbeidssituasjon/utdanning';
import { nyttTekstFelt, tomPeriode } from '../../../../utils/søknadsfelter';
import UtdanningDuSkalTa from './underUtdanning/UtdanningDuSkalTa';
import TidligereUtdanning from './tidligereUtdanning/TidligereUtdanning';

interface Props {
  arbeidssituasjon: IArbeidssituasjon;
  settArbeidssituasjon: (nyArbeidssituasjon: IArbeidssituasjon) => void;
}

const Utdanning: React.FC<Props> = ({
  arbeidssituasjon,
  settArbeidssituasjon,
}) => {
  const [utdanning, settUtdanning] = useState<IUnderUtdanning>({
    skoleUtdanningssted: nyttTekstFelt,
    linjeKursGrad: nyttTekstFelt,
    periode: tomPeriode,
  });

  useEffect(() => {
    settUtdanning({
      skoleUtdanningssted: nyttTekstFelt,
      linjeKursGrad: nyttTekstFelt,
      periode: tomPeriode,
    });
  }, []);

  useEffect(() => {
    settArbeidssituasjon({
      ...arbeidssituasjon,
      underUtdanning: utdanning,
    });
    // eslint-disable-next-line
  }, [utdanning]);

  return (
    <SeksjonGruppe>
      <UtdanningDuSkalTa
        arbeidssituasjon={arbeidssituasjon}
        utdanning={utdanning}
        settUtdanning={settUtdanning}
      />
      <TidligereUtdanning />
    </SeksjonGruppe>
  );
};

export default Utdanning;
