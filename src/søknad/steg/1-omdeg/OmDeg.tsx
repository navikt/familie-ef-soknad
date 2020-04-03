import React, { FC } from 'react';
import Medlemskap from './medlemskap/Medlemskap';
import Personopplysninger from './personopplysninger/Personopplysninger';
import Side from '../../../components/side/Side';
import Sivilstatus from './sivilstatus/Sivilstatus';
import { IntlShape, injectIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';

const OmDeg: FC<{ intl: IntlShape }> = ({ intl }) => {
  const { søknad } = useSøknad();
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
