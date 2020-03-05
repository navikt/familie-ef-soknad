import React from 'react';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import { Input } from 'nav-frontend-skjema';
import { linjeKursGrad } from '../UtdanningConfig';
import { hentTekst } from '../../../../../utils/søknad';
import { useIntl } from 'react-intl';
import { IUtdanning } from '../../../../../models/arbeidssituasjon/utdanning';

import SeksjonGruppe from '../../../../../components/gruppe/SeksjonGruppe';

interface Props {
  tidligereUtdanning: IUtdanning;
  utdanningsnummer: number;
}

const Utdanning: React.FC<Props> = ({
  tidligereUtdanning,
  utdanningsnummer,
}) => {
  const intl = useIntl();

  const linjeKursGradLabel = hentTekst(linjeKursGrad.label_tekstid, intl);

  const settInputFelt = (
    label: string,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    console.log(e);
  };

  return (
    <SeksjonGruppe>
      <KomponentGruppe>
        <Input
          key={linjeKursGrad.nøkkel}
          label={linjeKursGradLabel}
          type="text"
          bredde={'L'}
          onChange={(e) => settInputFelt(linjeKursGradLabel, e)}
        />
      </KomponentGruppe>
    </SeksjonGruppe>
  );
};

export default Utdanning;
