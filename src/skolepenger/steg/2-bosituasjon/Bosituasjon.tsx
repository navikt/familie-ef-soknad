import React, { FC, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { IBosituasjon } from '../../../models/steg/bosituasjon';
import { useLocation } from 'react-router-dom';
import { erFerdigUtfylt } from '../../../helpers/steg/bosituasjon';
import { useSkolepengerSøknad } from '../../SkolepengerContext';
import BosituasjonSpørsmål from '../../../søknad/steg/2-bosituasjon/BosituasjonSpørsmål';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesSkolepenger } from '../../routing/routes';
import { hentPathSkolepengerOppsummering } from '../../utils';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { LocationStateSøknad } from '../../../models/søknad/søknad';
import { logEvent } from '../../../utils/amplitude';

const Bosituasjon: FC = () => {
  const intl = useIntl();
  const {
    søknad,
    settSøknad,
    settDokumentasjonsbehov,
    mellomlagreSkolepenger,
  } = useSkolepengerSøknad();
  const bosituasjon = søknad.bosituasjon;
  const location = useLocation<LocationStateSøknad>();
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;

  useEffect(() => {
    logEvent('sidevisning', {
      side: 'Bosituasjon',
      team: 'familie',
      app: 'SP-soknadsdialog',
    });
  }, []);

  const settBosituasjon = (bosituasjon: IBosituasjon) => {
    settSøknad((prevSoknad) => {
      return {
        ...prevSoknad,
        bosituasjon: bosituasjon,
      };
    });
  };

  return (
    <Side
      stønadstype={Stønadstype.skolepenger}
      stegtittel={intl.formatMessage({ id: 'stegtittel.bosituasjon' })}
      skalViseKnapper={skalViseKnapper}
      erSpørsmålBesvart={erFerdigUtfylt(bosituasjon)}
      routesStønad={RoutesSkolepenger}
      mellomlagreStønad={mellomlagreSkolepenger}
      tilbakeTilOppsummeringPath={hentPathSkolepengerOppsummering}
    >
      <BosituasjonSpørsmål
        bosituasjon={bosituasjon}
        settBosituasjon={settBosituasjon}
        settDokumentasjonsbehov={settDokumentasjonsbehov}
      />
    </Side>
  );
};
export default Bosituasjon;
