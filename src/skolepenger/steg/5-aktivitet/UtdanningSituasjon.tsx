import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useLocation } from 'react-router-dom';
import { erAllUtdanningFerdigUtfylt } from '../../../helpers/steg/aktivitetvalidering';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesSkolepenger } from '../../routing/routes';
import { hentPathSkolepengerOppsummering } from '../../utils';
import { IDetaljertUtdanning } from '../../models/detaljertUtdanning';
import { useSkolepengerSøknad } from '../../SkolepengerContext';
import UnderUtdanning from '../../../søknad/steg/5-aktivitet/underUtdanning/UnderUtdanning';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { LocationStateSøknad } from '../../../models/søknad/søknad';
import { logEvent } from '../../../utils/amplitude';

const UtdanningSituasjon: React.FC = () => {
  const intl = useIntl();
  const { søknad, settSøknad, mellomlagreSkolepenger } = useSkolepengerSøknad();
  const location = useLocation<LocationStateSøknad>();
  const kommerFraOppsummering = location.state?.kommerFraOppsummering;
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;

  useEffect(() => {
    logEvent('sidevisning', {
      side: 'Aktivitet',
      team: 'familie',
      app: 'SP-soknadsdialog',
    });
  }, []);

  const oppdaterUnderUtdanning = (underUtdanning: IDetaljertUtdanning) => {
    settSøknad((prevSøknad) => {
      return { ...prevSøknad, utdanning: underUtdanning };
    });
  };

  const erSisteSpørsmålBesvartOgMinstEttAlternativValgt = erAllUtdanningFerdigUtfylt(
    søknad.utdanning
  );

  return (
    <Side
      stønadstype={Stønadstype.skolepenger}
      stegtittel={intl.formatMessage({ id: 'stegtittel.utdanning' })}
      skalViseKnapper={skalViseKnapper}
      erSpørsmålBesvart={erSisteSpørsmålBesvartOgMinstEttAlternativValgt}
      mellomlagreStønad={mellomlagreSkolepenger}
      routesStønad={RoutesSkolepenger}
      tilbakeTilOppsummeringPath={hentPathSkolepengerOppsummering}
    >
      <UnderUtdanning
        underUtdanning={søknad.utdanning}
        oppdaterUnderUtdanning={oppdaterUnderUtdanning}
        stønadstype={Stønadstype.skolepenger}
      />
    </Side>
  );
};

export default UtdanningSituasjon;
