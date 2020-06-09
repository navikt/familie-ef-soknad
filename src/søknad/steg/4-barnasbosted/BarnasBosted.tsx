import React, { useState } from 'react';
import BarnetsBostedEndre from './BarnetsBostedEndre';
import BarnetsBostedLagtTil from './BarnetsBostedLagtTil';
import Side from '../../../components/side/Side';
import { hentTekst } from '../../../utils/søknad';
import { useHistory, useLocation } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';
import { Hovedknapp } from 'nav-frontend-knapper';

const BarnasBosted: React.FC = () => {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const { søknad } = useSøknad();
  const [aktivIndex, settAktivIndex] = useState<number>(0);
  const [sisteBarnUtfylt, settSisteBarnUtfylt] = useState<boolean>(false);
  const barna = søknad.person.barn;
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;

  console.log(barna);

  return (
    <Side
      tittel={hentTekst('barnasbosted.sidetittel', intl)}
      skalViseKnapper={!kommerFraOppsummering}
      erSpørsmålBesvart={sisteBarnUtfylt}
    >
      {barna.map((barn, index) => {
        const key = barn.fødselsdato.verdi + index;
        if (index === aktivIndex) {
          return (
            <BarnetsBostedEndre
              barn={barn}
              sisteBarnUtfylt={sisteBarnUtfylt}
              settSisteBarnUtfylt={settSisteBarnUtfylt}
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
