import React, { FC } from 'react';
import Personopplysninger from './personopplysninger/Personopplysninger';
import Sivilstatus from './sivilstatus/Sivilstatus';
import Medlemskap from './medlemskap/Medlemskap';
import Side from '../../../components/side/Side';
import { IntlShape, injectIntl } from 'react-intl';
import useSøknadContext from '../../../context/SøknadContext';

const OmDeg: FC<{ intl: IntlShape }> = ({ intl }) => {
  const { søknad } = useSøknadContext();
  const { begrunnelseForSøknad, harSøktSeparasjon } = søknad.sivilstatus;

  return (
    <Side tittel={intl.formatMessage({ id: 'stegtittel.omDeg' })}>
      <Personopplysninger />

      {søknad.søkerBorPåRegistrertAdresse &&
      søknad.søkerBorPåRegistrertAdresse.verdi === true ? (
        <>
          <Sivilstatus />

          {harSøktSeparasjon ||
          harSøktSeparasjon === false ||
          begrunnelseForSøknad ? (
            <Medlemskap />
          ) : null}
        </>
      ) : null}
    </Side>
  );
};

export default injectIntl(OmDeg);
