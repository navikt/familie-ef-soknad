import React, { FC } from 'react';
import endre from '../assets/endre.svg';
import LenkeMedIkon from '../components/knapper/LenkeMedIkon';
import Side from './side/Side';
import { hentPath, Routes, RouteEnum, hentNesteRoute } from './routes/Routes';
import { hentTekst } from '../utils/søknad';
import { IntlShape, injectIntl } from 'react-intl';
import { ISkjema } from './typer/skjema';
import { mapDataTilLabelOgVerdiTyper } from './utils/innsending';
import { Undertittel } from 'nav-frontend-typografi';
import { useHistory, useLocation } from 'react-router-dom';
import { useSkjema } from './SkjemaContext';
import { VisLabelOgSvar } from '../utils/visning';

const Oppsummering: FC<{ intl: IntlShape }> = ({ intl }) => {
  const location = useLocation();
  const history = useHistory();
  const nesteRoute = hentNesteRoute(Routes, location.pathname);
  const { skjema } = useSkjema();

  const spørsmålOgSvar = VisLabelOgSvar(skjema.arbeidssøker);

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
      <div className="oppsummering-arbeidssøker">
        <p className="typo-normal disclaimer">
          {hentTekst('skjema.oppsummering.disclaimer', intl)}
        </p>
        <Undertittel>
          {hentTekst('skjema.oppsummering.omdeg', intl)}
        </Undertittel>
        {spørsmålOgSvar}
      </div>
      <LenkeMedIkon
        onClick={() =>
          history.push({
            pathname: hentPath(Routes, RouteEnum.Spørsmål),
            state: { kommerFraOppsummering: true },
          })
        }
        tekst_id="barnasbosted.knapp.endre"
        ikon={endre}
      />
    </Side>
  );
};

export default injectIntl(Oppsummering);
