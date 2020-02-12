import React from 'react';
import { hentNesteRoute } from '../../../routing/utils';
import { IRoute, Routes } from '../../../routing/Routes';
import { useLocation } from 'react-router-dom';
// import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';

const Arbeidssituasjon: React.FC = () => {
  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);

  // const { søknad, settSøknad } = useSøknadContext();

  return (
    <Side
      tittel={'Arbeid, utdanning etc'}
      nestePath={nesteRoute.path}
      tilbakePath={Routes[2].path}
    >
      arbeid og shiz
    </Side>
  );
};

export default Arbeidssituasjon;
