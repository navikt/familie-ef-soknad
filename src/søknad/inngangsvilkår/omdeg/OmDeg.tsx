import React, { FC } from 'react';
import Personopplysninger from './Personopplysninger';
import Sivilstatus from './Sivilstatus';
import Medlemskap from './Medlemskap';
import Side from '../../../components/side/Side';
import { IRoute, Routes } from '../../../config/Routes';
import { hentNesteRoute } from '../../../utils/routing';
import { useLocation } from 'react-router';

const OmDeg: FC = () => {
  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);

  return (
    <Side tittel={'Om deg'} nestePath={nesteRoute.path}>
      <Personopplysninger />
      <Sivilstatus />
      <Medlemskap />
    </Side>
  );
};

export default OmDeg;
