import React, { useEffect, useState } from 'react';
import {
  Datovelger,
  DatoBegrensning,
} from '../../../../../components/dato/Datovelger';
import LocaleTekst from '../../../../../language/LocaleTekst';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import { IDatoFelt } from '../../../../../models/søknad/søknadsfelter';
import AlertStripeDokumentasjon from '../../../../../components/AlertstripeDokumentasjon';
import { usePersonContext } from '../../../../../context/PersonContext';
import { hentDatoForSamlivsbruddTilGjenbrukBarnetilsyn } from '../../../../../utils/søknad';

interface Props {
  settDato: (date: string, objektnøkkel: string, tekstid: string) => void;
  datoForSamlivsbrudd: IDatoFelt | undefined;
}

const DatoForSamlivsbrudd: React.FC<Props> = ({
  settDato,
  datoForSamlivsbrudd,
}) => {
  const datovelgerLabel = 'sivilstatus.datovelger.samlivsbrudd';
  const { person } = usePersonContext();
  const [gjenbrukDatoForSamlivsbrudd, settGjenbrukDatoForSamlivsbrudd] =
    useState<string>();
  const [isfetching, settIsFetching] = useState<boolean>(true);

  useEffect(() => {
    const fetchDatoForSamlivsbrudd = async (fnr: string) => {
      settIsFetching(true);
      const response = await hentDatoForSamlivsbruddTilGjenbrukBarnetilsyn(fnr);
      settGjenbrukDatoForSamlivsbrudd(response);
      settIsFetching(false);
    };

    fetchDatoForSamlivsbrudd(person.søker.fnr);
  }, [person]);

  console.log(
    'dato gjenbrukDatoForSamlivsbrudd:' + gjenbrukDatoForSamlivsbrudd
  );

  console.log('valgt dato:' + datoForSamlivsbrudd?.verdi);

  if (!isfetching) {
    return (
      <>
        <KomponentGruppe>
          <Datovelger
            settDato={(e) =>
              settDato(e, 'datoForSamlivsbrudd', datovelgerLabel)
            }
            valgtDato={
              datoForSamlivsbrudd
                ? datoForSamlivsbrudd?.verdi
                : gjenbrukDatoForSamlivsbrudd
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
  }
};

export default DatoForSamlivsbrudd;
