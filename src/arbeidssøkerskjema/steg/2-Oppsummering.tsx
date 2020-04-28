import React, { FC } from 'react';
import Side from '../side/Side';
import { useIntl } from 'react-intl';
import endre from '../assets/endre.svg';
import { hentPath, Routes, RouteEnum, hentNesteRoute } from '../routes/Routes';
import { mapDataTilLabelOgVerdiTyper } from '../utils/innsending';
import { Undertittel } from 'nav-frontend-typografi';
import { useHistory, useLocation } from 'react-router-dom';
import { hentTekst } from '../../utils/søknad';
import { useSkjema } from '../SkjemaContext';
import { VisLabelOgSvar } from '../../utils/visning';
import { IArbeidssøker } from '../../models/steg/aktivitet/arbeidssøker';
import LenkeMedIkon from '../../components/knapper/LenkeMedIkon';

const Oppsummering: FC = () => {
  const location = useLocation();
  const history = useHistory();
  const intl = useIntl();
  const nesteRoute = hentNesteRoute(Routes, location.pathname);
  const { skjema } = useSkjema();

  const spørsmålOgSvar = VisLabelOgSvar(skjema);

  const kommerFraOppsummering = location.state?.kommerFraOppsummering;

  const sendSkjema = (skjema: IArbeidssøker) => {
    const mappetSkjema = mapDataTilLabelOgVerdiTyper(skjema);
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

export default Oppsummering;
