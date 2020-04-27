import React, { FC } from 'react';
import Side from '../side/Side';
import { useHistory, useLocation } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { hentTekst } from '../../utils/søknad';
import { useIntl } from 'react-intl';

const Kvittering: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const intl = useIntl();

  const kommerFraOppsummering = location.state?.kommerFraOppsummering;

  return (
    <Side
      tittel={'Takk'}
      visNesteKnapp={true}
      kommerFraOppsummering={kommerFraOppsummering}
    >
      <h1>Takk</h1>
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

export default Kvittering;
