import React, { FC } from 'react';
import Personopplysninger from './Personopplysninger';
import Sivilstatus from './sivilstatus/Sivilstatus';
import Medlemskap from './medlemskap/Medlemskap';
import Side from '../../../components/side/Side';
import { IRoute, Routes } from '../../../config/Routes';
import { hentNesteRoute } from '../../../utils/routing';
import { useLocation } from 'react-router';
import { IntlShape, injectIntl } from 'react-intl';

const OmDeg: FC<{ intl: IntlShape }> = ({ intl }) => {
  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);

  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.omDeg' })}
      nestePath={nesteRoute.path}
      tilbakePath={Routes[0].path}
    >
      <Personopplysninger />
      <Sivilstatus />
      <Medlemskap />
    </Side>
  );
};

export default injectIntl(OmDeg);
