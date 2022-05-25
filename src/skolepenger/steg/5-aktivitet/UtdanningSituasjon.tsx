import React from 'react';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import { useLocation } from 'react-router-dom';
import { erAllUtdanningFerdigUtfyltForSkolepenger } from '../../../helpers/steg/aktivitetvalidering';
import Side, { ESide } from '../../../components/side/Side';
import { RoutesSkolepenger } from '../../routing/routes';
import { hentPathSkolepengerOppsummering } from '../../utils';
import { IDetaljertUtdanning } from '../../models/detaljertUtdanning';
import { useSkolepengerSøknad } from '../../SkolepengerContext';
import UnderUtdanning from '../../../søknad/steg/5-aktivitet/underUtdanning/UnderUtdanning';
import { Stønadstype } from '../../../models/søknad/stønadstyper';

import { logSidevisningSkolepenger } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { ISøknad } from '../../models/søknad';
import { kommerFraOppsummeringen } from '../../../utils/locationState';

const UtdanningSituasjon: React.FC = () => {
  const intl = useLokalIntlContext();
  const { søknad, settSøknad, mellomlagreSkolepenger } = useSkolepengerSøknad();
  const location = useLocation();
  const kommerFraOppsummering = kommerFraOppsummeringen(location.state);
  const skalViseKnapper = !kommerFraOppsummering
    ? ESide.visTilbakeNesteAvbrytKnapp
    : ESide.visTilbakeTilOppsummeringKnapp;

  useMount(() => logSidevisningSkolepenger('Aktivitet'));

  const oppdaterUnderUtdanning = (underUtdanning: IDetaljertUtdanning) => {
    settSøknad((prevSøknad: ISøknad) => {
      return { ...prevSøknad, utdanning: underUtdanning };
    });
  };

  const erSisteSpørsmålBesvartOgMinstEttAlternativValgt =
    erAllUtdanningFerdigUtfyltForSkolepenger(søknad.utdanning);

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
