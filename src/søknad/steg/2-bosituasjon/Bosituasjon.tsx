import React, { FC } from 'react';
import { IRoute, Routes } from '../../../config/Routes';

import Side from '../../../components/side/Side';
import { useLocation } from 'react-router';
import { hentNesteRoute } from '../../../utils/routing';
import { injectIntl, IntlShape } from 'react-intl';

interface Props {
  intl: IntlShape;
}

const Bosituasjon: FC<Props> = ({ intl }) => {
  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);
  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.bosituasjon' })}
      nestePath={nesteRoute.path}
      tilbakePath={Routes[0].path}
    ></Side>
  );
};
export default injectIntl(Bosituasjon);
