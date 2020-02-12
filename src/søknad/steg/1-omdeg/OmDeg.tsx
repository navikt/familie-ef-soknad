import React, { FC } from 'react';
import Personopplysninger from './personopplysninger/Personopplysninger';
import Sivilstatus from './sivilstatus/Sivilstatus';
import Medlemskap from './medlemskap/Medlemskap';
import Side from '../../../components/side/Side';
import { IRoute, Routes } from '../../../routing/Routes';
import { hentNesteRoute } from '../../../routing/utils';
import { useLocation } from 'react-router';
import { IntlShape, injectIntl } from 'react-intl';
import useSøknadContext from '../../../context/SøknadContext';

const OmDeg: FC<{ intl: IntlShape }> = ({ intl }) => {
  const { søknad } = useSøknadContext();
  const { begrunnelseForSøknad, søkerHarSøktSeparasjon } = søknad.sivilstatus;

  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);

  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.omDeg' })}
      nestePath={nesteRoute.path}
      tilbakePath={Routes[0].path}
    >
      <Personopplysninger />

      {søknad.søkerBorPåRegistrertAdresse &&
      søknad.søkerBorPåRegistrertAdresse.verdi === true ? (
        <>
          <Sivilstatus />

          {søkerHarSøktSeparasjon ||
          søkerHarSøktSeparasjon === false ||
          begrunnelseForSøknad ? (
            <Medlemskap />
          ) : null}
        </>
      ) : null}
    </Side>
  );
};

export default injectIntl(OmDeg);
