import React, { FC } from 'react';
import Side from '../../side/Side';
import { useIntl } from 'react-intl';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';

interface Props {}
const Barnepass: FC<Props> = () => {
  const intl = useIntl();
  const { mellomlagreBarnetilsyn } = useBarnetilsynSøknad();
  return (
    <Side
      tittel={intl.formatMessage({ id: 'barnepass.sidetittel' })}
      skalViseKnapper={true}
      mellomlagreBarnetilsyn={mellomlagreBarnetilsyn}
      erSpørsmålBesvart={true}
    >
      <SeksjonGruppe></SeksjonGruppe>
    </Side>
  );
};

export default Barnepass;
