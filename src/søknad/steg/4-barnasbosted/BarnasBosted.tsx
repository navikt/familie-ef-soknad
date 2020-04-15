import React, { useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { useIntl } from 'react-intl';
import BarnetsBostedEndre from './BarnetsBostedEndre';
import BarnetsBostedLagtTil from './BarnetsBostedLagtTil';
import { Hovedknapp } from 'nav-frontend-knapper';
import { hentTekst } from '../../../utils/søknad';
import { useHistory, useLocation } from 'react-router-dom';

const BarnasBosted: React.FC = () => {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const { søknad } = useSøknadContext();
  const [aktivIndex, settAktivIndex] = useState<number>(0);
  const barna = søknad.person.barn;
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;

  return (
    <Side
      tittel={intl.formatMessage({ id: 'barnasbosted.sidetittel' })}
      kommerFraOppsummering={kommerFraOppsummering}
    >
      {barna.map((barn, index) => {
        const key = barn.fødselsdato.verdi + index;
        if (index === aktivIndex) {
          return (
            <BarnetsBostedEndre
              barn={barn}
              settAktivIndex={settAktivIndex}
              aktivIndex={aktivIndex}
              key={key}
            />
          );
        } else {
          return (
            <BarnetsBostedLagtTil
              barn={barn}
              settAktivIndex={settAktivIndex}
              index={index}
              key={key}
            />
          );
        }
      })}
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

export default BarnasBosted;
