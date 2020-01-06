import React, { FC } from 'react';
import Personopplysninger from './Personopplysninger';
import Sivilstatus from './Sivilstatus';
import Medlemskap from './Medlemskap';
import Side from '../../../components/side/Side';
import { IRoute, Routes } from '../../../config/Routes';
import { hentNesteRoute } from '../../../utils/routing';
import { useLocation } from 'react-router';
import useSøknadContext, { SøknadActionType } from '../../../context/SøknadContext';
import Filopplaster from '../../../components/filopplaster/Filopplaster';
import Fil from '../../../components/filopplaster/Fil';


const OmDeg: FC = () => {
  const { søknad } = useSøknadContext();
  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);
  const yo = søknad.vedlegg.get('vedlegg') ? "ha" : "nope";
  
  console.log(yo);
  return (
    <Side
      tittel={'Om deg'}
      nestePath={nesteRoute.path}
      tilbakePath={Routes[0].path}
    >
      <Personopplysninger />
      <Sivilstatus />
      <Medlemskap />
      <Filopplaster />
      {søknad.vedlegg.get('vedlegg') ? <Fil fil={søknad.vedlegg.get('vedlegg')}/> : null}
    </Side>
  );
};

export default OmDeg;
