import React, { useEffect, useState } from 'react';
import Datovelger, {
  DatoBegrensning,
} from '../../../../../components/dato/Datovelger';
import LocaleTekst from '../../../../../language/LocaleTekst';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import { IDatoFelt } from '../../../../../models/søknad/søknadsfelter';
import AlertStripeDokumentasjon from '../../../../../components/AlertstripeDokumentasjon';
import {hentDataTilGjenbrukBarnetilsyn, hentPersonData} from '../../../../../utils/søknad';
import {PersonActionTypes, usePersonContext} from '../../../../../context/PersonContext';
import { formatISO } from 'date-fns';

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
  const [datoForSamlivsbruddState, settDatoSamlivsbrudd] = useState<string>();
  const [fetching, settFetching] = useState<boolean>(true);
  useEffect(() => {
    Promise.all([
      fetchDatoForSamlivsbrudd(),
    ]).then(() => settFetching(false))
    // eslint-disable-next-line
  }, [person]);
  const fetchDatoForSamlivsbrudd = () => {
    return hentDataTilGjenbrukBarnetilsyn(person.søker.fnr)
        .then((response) => {
          settDatoSamlivsbrudd(response)
        });
  };
  console.log("dato for samlivsbrudd state:" + datoForSamlivsbruddState)
  if (!fetching) {
    return (
        <>
          <KomponentGruppe>
            <Datovelger
                settDato={(e) => settDato(e, 'datoForSamlivsbrudd', datovelgerLabel)}
                valgtDato={datoForSamlivsbrudd ? datoForSamlivsbrudd?.verdi : datoForSamlivsbruddState}
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
