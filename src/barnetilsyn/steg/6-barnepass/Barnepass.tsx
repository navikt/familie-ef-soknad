import React, { FC } from 'react';
import Side from '../../side/Side';
import { useIntl } from 'react-intl';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import SeksjonGruppe from '../../../components/gruppe/SeksjonGruppe';

interface Props {}
const Barnepass: FC<Props> = () => {
  const intl = useIntl();
  const { mellomlagreOvergangsstønad } = useBarnetilsynSøknad();
  return (
    <Side
      tittel={intl.formatMessage({ id: 'barnepass.sidetittel' })}
      skalViseKnapper={true}
      mellomlagreOvergangsstønad={mellomlagreOvergangsstønad}
      erSpørsmålBesvart={true}
    >
      <SeksjonGruppe></SeksjonGruppe>
    </Side>
  );
};

export default Barnepass;
