import React, { FC } from 'react';
import Medlemskap from './medlemskap/Medlemskap';
import Personopplysninger from './personopplysninger/Personopplysninger';
import Side from '../../../components/side/Side';
import Sivilstatus from './sivilstatus/Sivilstatus';
import { IntlShape, injectIntl } from 'react-intl';
import { useSøknad } from '../../../context/SøknadContext';
import { useHistory, useLocation } from 'react-router-dom';
import { Hovedknapp } from 'nav-frontend-knapper';
import { hentTekst } from '../../../utils/søknad';
import {
  erSøknadsBegrunnelseBesvart,
  harSøkerTlfnr,
} from '../../../helpers/omdeg';

const OmDeg: FC<{ intl: IntlShape }> = ({ intl }) => {
  const { søknad, mellomlagreOvergangsstønad } = useSøknad();
  const { harSøktSeparasjon } = søknad.sivilstatus;
  const {
    søkerBosattINorgeSisteTreÅr,
    perioderBoddIUtlandet,
  } = søknad.medlemskap;
  const location = useLocation();
  const history = useHistory();

  const kommerFraOppsummering = location.state?.kommerFraOppsummering;

  const søkerFyltUtAlleFelterOgSpørsmål = () => {
    if (søkerBosattINorgeSisteTreÅr?.verdi === false) {
      const harFelterUtenUtfyltBegrunnelse = perioderBoddIUtlandet?.some(
        (utenlandsopphold) =>
          utenlandsopphold.begrunnelse.verdi === '' ||
          !utenlandsopphold.begrunnelse
      );
      return harFelterUtenUtfyltBegrunnelse ? false : true;
    } else if (søkerBosattINorgeSisteTreÅr?.verdi) return true;
    else return false;
  };

  return (
    <Side
      tittel={intl.formatMessage({ id: 'stegtittel.omDeg' })}
      erSpørsmålBesvart={søkerFyltUtAlleFelterOgSpørsmål()}
      skalViseKnapper={!kommerFraOppsummering}
      mellomlagreOvergangsstønad={mellomlagreOvergangsstønad}
    >
      <Personopplysninger />

      {søknad.søkerBorPåRegistrertAdresse &&
        søknad.søkerBorPåRegistrertAdresse.verdi === true &&
        harSøkerTlfnr(søknad.person) && (
          <>
            <Sivilstatus />

            {harSøktSeparasjon ||
            harSøktSeparasjon === false ||
            erSøknadsBegrunnelseBesvart(søknad.sivilstatus) ? (
              <Medlemskap />
            ) : null}
          </>
        )}

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

export default injectIntl(OmDeg);
