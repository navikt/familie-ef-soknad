import React, { useEffect, useState } from 'react';
import Datovelger, {
  DatoBegrensning,
} from '../../../../../components/dato/Datovelger';
import LocaleTekst from '../../../../../language/LocaleTekst';
import KomponentGruppe from '../../../../../components/gruppe/KomponentGruppe';
import { IDatoFelt } from '../../../../../models/søknad/søknadsfelter';
import AlertStripeDokumentasjon from '../../../../../components/AlertstripeDokumentasjon';
import {
  hentDataTilGjenbrukBarnetilsyn,
  hentPersonData,
} from '../../../../../utils/søknad';
import { usePersonContext } from '../../../../../context/PersonContext';
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
  console.log('fnr: ', person.søker.fnr);

  const tilLocaleDateString = (dato: Date) =>
    formatISO(dato, { representation: 'date' });

  const dato = hentDataTilGjenbrukBarnetilsyn('28417736486');
  console.log('dato: ', dato);

  const datoMedFnr = hentDataTilGjenbrukBarnetilsyn(person.søker.fnr);
  console.log('datoMedFnr: ', datoMedFnr);

  const [tidligereDato, settTidligereDato] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const hentDato = async () => {
      const dato = await hentDataTilGjenbrukBarnetilsyn(person.søker.fnr);
      console.log('useeffect dato: ', dato);
      settTidligereDato(dato);
    };

    hentDato();
  }, [person]);

  console.log('tidligereDato: ', tidligereDato);

  return (
    <>
      <KomponentGruppe>
        <Datovelger
          settDato={(e) => settDato(e, 'datoForSamlivsbrudd', datovelgerLabel)}
          valgtDato={datoForSamlivsbrudd ? datoForSamlivsbrudd.verdi : ''}
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
