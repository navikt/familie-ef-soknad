import React, { FC } from 'react';
import Personopplysninger from './Personopplysninger';
import Sivilstatus from './Sivilstatus';
import Medlemskap from './Medlemskap';
import Side from '../../../components/side/Side';
import { IRoute, Routes } from '../../../config/Routes';
import { hentForrigeRoute, hentNesteRoute } from '../../../utils/routing';
import { useLocation } from 'react-router';

const OmDeg: FC = () => {
  const location = useLocation();
  const forrigeRoute: IRoute = hentForrigeRoute(Routes, location.pathname);
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);

  return (
    <Side
      tittel={'Om deg'}
      tilbakePath={forrigeRoute.path}
      nestePath={nesteRoute.path}
    >
      <Personopplysninger />
      <Sivilstatus />
      <Medlemskap />
    </Side>
  );
};

export default OmDeg;
