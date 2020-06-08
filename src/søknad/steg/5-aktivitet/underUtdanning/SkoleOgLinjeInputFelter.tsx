import React from 'react';
import {
  EUtdanning,
  IUnderUtdanning,
} from '../../../../models/steg/aktivitet/utdanning';
import FeltGruppe from '../../../../components/gruppe/FeltGruppe';
import { Input } from 'nav-frontend-skjema';
import { linjeKursGrad, skoleUtdanningssted } from './UtdanningConfig';
import { hentTekst } from '../../../../utils/søknad';
import { useIntl } from 'react-intl';

interface Props {
  utdanning: IUnderUtdanning;
  oppdaterUtdanning: (nøkkel: EUtdanning, label: string, verdi: string) => void;
}
const SkoleOgLinje: React.FC<Props> = ({ utdanning, oppdaterUtdanning }) => {
  const intl = useIntl();

  const settInputFelt = (
    nøkkel: EUtdanning,
    label: string,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    oppdaterUtdanning(nøkkel, label, e.currentTarget.value);
  };

  const skoleUtdanningstedLabel = hentTekst(
    skoleUtdanningssted.label_tekstid,
    intl
  );
  const linjeKursGradLabel = hentTekst(linjeKursGrad.label_tekstid, intl);

  return (
    <>
      <FeltGruppe>
        <Input
          key={skoleUtdanningssted.id}
          label={skoleUtdanningstedLabel}
          type="text"
          bredde={'L'}
          value={
            utdanning?.skoleUtdanningssted?.verdi
              ? utdanning?.skoleUtdanningssted?.verdi
              : ''
          }
          onChange={(e) =>
            settInputFelt(
              EUtdanning.skoleUtdanningssted,
              skoleUtdanningstedLabel,
              e
            )
          }
        />
      </FeltGruppe>
      <FeltGruppe>
        <Input
          key={linjeKursGrad.id}
          label={linjeKursGradLabel}
          type="text"
          bredde={'L'}
          onChange={(e) =>
            settInputFelt(EUtdanning.linjeKursGrad, linjeKursGradLabel, e)
          }
          value={
            utdanning?.linjeKursGrad?.verdi
              ? utdanning?.linjeKursGrad?.verdi
              : ''
          }
        />
      </FeltGruppe>
    </>
  );
};

export default SkoleOgLinje;
