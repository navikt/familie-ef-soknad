import React, { FC } from 'react';
import Medlemskap from './medlemskap/Medlemskap';
import Personopplysninger from './personopplysninger/Personopplysninger';
import Side from '../../../components/side/Side';
import Sivilstatus from './sivilstatus/Sivilstatus';
import { IntlShape, injectIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';
import { useHistory, useLocation } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { hentTekst } from '../../../utils/søknad';

const OmDeg: FC<{ intl: IntlShape }> = ({ intl }) => {
  const { søknad } = useSøknad();
  const { begrunnelseForSøknad, harSøktSeparasjon } = søknad.sivilstatus;
  const location = useLocation();
  const history = useHistory();

  const kommerFraOppsummering = location.state?.kommerFraOppsummering;

  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.omDeg' })}
      erSpørsmålBesvart={
        søknad?.medlemskap?.søkerBosattINorgeSisteTreÅr?.verdi !== undefined
      }
      skalViseKnapper={!kommerFraOppsummering}
    >
      <Personopplysninger />

      {søknad.søkerBorPåRegistrertAdresse &&
      søknad.søkerBorPåRegistrertAdresse.verdi === true ? (
        <>
          <Sivilstatus />

          {harSøktSeparasjon ||
          harSøktSeparasjon === false ||
          begrunnelseForSøknad ? (
            <Medlemskap />
          ) : null}
        </>
      ) : null}
      {kommerFraOppsummering ? (
        <div className={'side'}>
          <Hovedknapp
            className="tilbake-til-oppsummering"
            onClick={() =>
              history.push({
                pathname: '/oppsummering',
              })
            }
          >
            {hentTekst('oppsummering.tilbake', intl)}
          </Hovedknapp>
        </div>
      ) : null}
    </Side>
  );
};

export default injectIntl(OmDeg);
