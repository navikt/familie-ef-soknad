import React, { FC } from 'react';
import Side from './side/Side';
import { IntlShape, injectIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { hentTekst } from '../utils/søknad';

const Oppsummering: FC<{ intl: IntlShape }> = ({ intl }) => {
  const location = useLocation();
  const history = useHistory();

  const kommerFraOppsummering = location.state?.kommerFraOppsummering;

  return (
    <Side
      tittel={'Oppsummering'}
      visNesteKnapp={true}
      kommerFraOppsummering={kommerFraOppsummering}
    >
      <h1>Oppsummering</h1>
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

export default injectIntl(Oppsummering);
