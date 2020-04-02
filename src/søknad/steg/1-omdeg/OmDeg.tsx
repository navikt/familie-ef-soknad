import React, { FC } from 'react';
import Personopplysninger from './personopplysninger/Personopplysninger';
import Sivilstatus from './sivilstatus/Sivilstatus';
import Medlemskap from './medlemskap/Medlemskap';
import Side from '../../../components/side/Side';
import { IntlShape, injectIntl } from 'react-intl';
import useSøknadContext from '../../../context/SøknadContext';
import { useHistory, useLocation } from 'react-router-dom';
import { Knapp } from 'nav-frontend-knapper';
import { hentTekst } from '../../../utils/søknad';

const OmDeg: FC<{ intl: IntlShape }> = ({ intl }) => {
  const location = useLocation();
  const history = useHistory();
  const { søknad } = useSøknadContext();
  const { begrunnelseForSøknad, søkerHarSøktSeparasjon } = søknad.sivilstatus;

  return (
    <Side tittel={intl.formatMessage({ id: 'stegtittel.omDeg' })}>
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
      {location.state?.edit ? (
        <Knapp
          className="tilbake-til-oppsummering"
          onClick={() =>
            history.push({
              pathname: '/oppsummering',
            })
          }
        >
          {hentTekst('oppsummering.tilbake', intl)}
        </Knapp>
      ) : null}
    </Side>
  );
};

export default injectIntl(OmDeg);
