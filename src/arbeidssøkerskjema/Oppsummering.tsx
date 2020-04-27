import React, { FC } from 'react';
import Side from './side/Side';
import { IntlShape, injectIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { hentTekst } from '../utils/søknad';
import { useSkjema } from './SkjemaContext';
import { VisLabelOgSvar } from '../utils/visning';
import { Undertittel } from 'nav-frontend-typografi';
import LenkeMedIkon from '../components/knapper/LenkeMedIkon';
import endre from '../assets/endre.svg';
import { hentPath, Routes, RouteEnum } from './routes/Routes';

const Oppsummering: FC<{ intl: IntlShape }> = ({ intl }) => {
  const location = useLocation();
  const history = useHistory();
  const { skjema } = useSkjema();

  const spørsmålOgSvar = VisLabelOgSvar(skjema.arbeidssøker);

  const kommerFraOppsummering = location.state?.kommerFraOppsummering;

  return (
    <Side
      tittel={'Oppsummering'}
      visNesteKnapp={true}
      kommerFraOppsummering={kommerFraOppsummering}
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
