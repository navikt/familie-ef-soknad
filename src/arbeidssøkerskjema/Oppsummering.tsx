import React, { FC } from 'react';
import Side from './side/Side';
import { IntlShape, injectIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { hentTekst } from '../utils/søknad';
import { ISkjema } from './typer/skjema';
import { mapDataTilLabelOgVerdiTyper } from './utils/innsending';
import { hentNesteRoute, Routes } from './routes/Routes';

const Oppsummering: FC<{ intl: IntlShape }> = ({ intl }) => {
  const location = useLocation();
  const history = useHistory();
  const nesteRoute = hentNesteRoute(Routes, location.pathname);

  const kommerFraOppsummering = location.state?.kommerFraOppsummering;

  const sendSkjema = (skjema: ISkjema) => {
    const mappetSkjema = mapDataTilLabelOgVerdiTyper(skjema.arbeidssøker);
    console.log('send dette objektet til api: ', mappetSkjema);
    // Hvis vi får "Suksess" på at skjemaet er sendt tilbake fra apiet, send videre til Kvitteringssiden.
    history.push(nesteRoute.path);
  };

  return (
    <Side
      tittel={'Oppsummering'}
      visNesteKnapp={true}
      kommerFraOppsummering={kommerFraOppsummering}
      sendSkjema={sendSkjema}
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
