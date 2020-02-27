import React from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { useIntl } from 'react-intl';
import BarnetsBosted from './BarnetsBosted';

const BarnasBosted: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknadContext();

  const barna = søknad.person.barn;

  return (
    <>
      <Side
        tittel={intl.formatMessage({ id: 'barnasbosted.sidetittel' })}
      >
       {barna.map((barn) => {
        return (<BarnetsBosted barn={barn} />)
       })}
      </Side>
    </>
  );
};

export default BarnasBosted;
