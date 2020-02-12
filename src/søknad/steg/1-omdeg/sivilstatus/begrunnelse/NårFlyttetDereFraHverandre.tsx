import React from 'react';
import Datovelger, {
  DatoBegrensning,
} from '../../../../../components/dato/Datovelger';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import { IDatoFelt } from '../../../../../models/søknadsfelter';

interface Props {
  settDato: (date: Date | null, objektnøkkel: string, tekstid: string) => void;
  datoFlyttetFraHverandre: IDatoFelt | undefined;
}

const NårFlyttetDereFraHverandre: React.FC<Props> = ({
  settDato,
  datoFlyttetFraHverandre,
}) => {
  return (
    <KomponentGruppe>
      <Datovelger
        settDato={(e) =>
          settDato(
            e,
            'datoFlyttetFraHverandre',
            'sivilstatus.sporsmal.datoFlyttetFraHverandre'
          )
        }
        valgtDato={
          datoFlyttetFraHverandre ? datoFlyttetFraHverandre.verdi : undefined
        }
        tekstid={'sivilstatus.sporsmal.datoFlyttetFraHverandre'}
        datobegrensning={DatoBegrensning.AlleDatoer}
      />
    </KomponentGruppe>
  );
};

export default NårFlyttetDereFraHverandre;
