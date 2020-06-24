import React from 'react';
import Datovelger, {
  DatoBegrensning,
} from '../../../../../components/dato/Datovelger';
import LocaleTekst from '../../../../../language/LocaleTekst';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import { IDatoFelt } from '../../../../../models/søknadsfelter';
import AlertStripeDokumentasjon from '../../../../../components/AlertstripeDokumentasjon';

interface Props {
  settDato: (date: Date | null, objektnøkkel: string, tekstid: string) => void;
  datoForSamlivsbrudd: IDatoFelt | undefined;
}

const DatoForSamlivsbrudd: React.FC<Props> = ({
  settDato,
  datoForSamlivsbrudd,
}) => {
  const datovelgerLabel = 'sivilstatus.datovelger.samlivsbrudd';
  return (
    <>
      <KomponentGruppe>
        <Datovelger
          settDato={(e) => settDato(e, 'datoForSamlivsbrudd', datovelgerLabel)}
          valgtDato={
            datoForSamlivsbrudd ? datoForSamlivsbrudd.verdi : undefined
          }
          tekstid={datovelgerLabel}
          datobegrensning={DatoBegrensning.TidligereDatoer}
        />
        <AlertStripeDokumentasjon>
          <LocaleTekst tekst={'sivilstatus.alert.samlivsbrudd'} />
        </AlertStripeDokumentasjon>
      </KomponentGruppe>
    </>
  );
};

export default DatoForSamlivsbrudd;
