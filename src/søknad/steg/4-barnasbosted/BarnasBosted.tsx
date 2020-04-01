import React, { useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { useIntl } from 'react-intl';
import BarnetsBostedEndre from './BarnetsBostedEndre';
import BarnetsBostedLagtTil from './BarnetsBostedLagtTil';
import { useHistory, useLocation } from 'react-router-dom';
import { Knapp } from 'nav-frontend-knapper';

const BarnasBosted: React.FC = () => {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const { søknad } = useSøknadContext();
  const [aktivIndex, settAktivIndex] = useState<number>(0);
  const barna = søknad.person.barn;

  return (
    <Side tittel={intl.formatMessage({ id: 'barnasbosted.sidetittel' })}>
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
    </Side>
  );
};

export default BarnasBosted;
