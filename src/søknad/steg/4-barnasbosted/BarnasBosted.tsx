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
      <Side
        tittel={intl.formatMessage({ id: 'barnasbosted.sidetittel' })}
      >
       {barna.map((barn, index) => {
         const key = barn.fødselsdato + index;
        return (<BarnetsBosted barn={barn} key={key} />)
       })}
       </Side>);
}

export default BarnasBosted;
