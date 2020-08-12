import React from 'react';
import Datovelger, {
  DatoBegrensning,
} from '../../../../../components/dato/Datovelger';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import { IDatoFelt } from '../../../../../models/søknad/søknadsfelter';

interface Props {
  settDato: (date: Date | null, objektnøkkel: string, tekstid: string) => void;
  datoFlyttetFraHverandre: IDatoFelt | undefined;
}

const NårFlyttetDereFraHverandre: React.FC<Props> = ({
  settDato,
  datoFlyttetFraHverandre,
}) => {
  const datovelgerTekstid = 'sivilstatus.datovelger.flyttetFraHverandre';

  return (
    <KomponentGruppe>
      <Datovelger
        settDato={(e) =>
          settDato(e, 'datoFlyttetFraHverandre', datovelgerTekstid)
        }
        valgtDato={
          datoFlyttetFraHverandre ? datoFlyttetFraHverandre.verdi : undefined
        }
        tekstid={datovelgerTekstid}
        datobegrensning={DatoBegrensning.TidligereDatoer}
      />
    </KomponentGruppe>
  );
};

export default NårFlyttetDereFraHverandre;
