import React from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { useLokalIntlContext } from '../../../context/LokalIntlContext';
import OppsummeringOmDeg from '../../../søknad/steg/7-oppsummering/OppsummeringOmDeg';
import OppsummeringBarnasBosituasjon from '../../../søknad/steg/7-oppsummering/OppsummeringBarnasBosituasjon';
import OppsummeringBarnaDine from '../../../søknad/steg/7-oppsummering/OppsummeringBarnaDine';
import OppsummeringBosituasjonenDin from '../../../søknad/steg/7-oppsummering/OppsummeringBosituasjon';
import { ERouteSkolepenger, RoutesSkolepenger } from '../../routing/routes';
import { hentPath } from '../../../utils/routing';
import Side, { ESide } from '../../../components/side/Side';
import { hentTekst } from '../../../utils/søknad';
import { useSkolepengerSøknad } from '../../SkolepengerContext';
import OppsummeringDetaljertUtdanning from '../../../søknad/steg/7-oppsummering/OppsummeringDetaljertUtdanning';
import { Stønadstype } from '../../../models/søknad/stønadstyper';
import { logSidevisningSkolepenger } from '../../../utils/amplitude';
import { useMount } from '../../../utils/hooks';
import { BodyShort } from '@navikt/ds-react';

const Oppsummering: React.FC = () => {
  const intl = useLokalIntlContext();
  const { mellomlagreSkolepenger, søknad } = useSkolepengerSøknad();

  useMount(() => logSidevisningSkolepenger('Oppsummering'));

  return (
    <>
      <Side
        stønadstype={Stønadstype.skolepenger}
        stegtittel={intl.formatMessage({ id: 'oppsummering.sidetittel' })}
        skalViseKnapper={ESide.visTilbakeNesteAvbrytKnapp}
        erSpørsmålBesvart={true}
        mellomlagreStønad={mellomlagreSkolepenger}
        routesStønad={RoutesSkolepenger}
      >
        <div className="oppsummering">
          <BodyShort className="disclaimer">
            {intl.formatMessage({ id: 'oppsummering.normaltekst.lesgjennom' })}
          </BodyShort>

          <KomponentGruppe>
            <OppsummeringOmDeg
              tittel={hentTekst('stegtittel.omDeg', intl)}
              søker={søknad.person.søker}
              sivilstatus={søknad.sivilstatus}
              medlemskap={søknad.medlemskap}
              endreInformasjonPath={hentPath(
                RoutesSkolepenger,
                ERouteSkolepenger.OmDeg
              )}
            />
            <OppsummeringBosituasjonenDin
              tittel={hentTekst('stegtittel.bosituasjon', intl)}
              bosituasjon={søknad.bosituasjon}
              endreInformasjonPath={hentPath(
                RoutesSkolepenger,
                ERouteSkolepenger.BosituasjonenDin
              )}
            />
            <OppsummeringBarnaDine
              tittel={hentTekst('barnadine.sidetittel', intl)}
              stønadstype={Stønadstype.skolepenger}
              barn={søknad.person.barn}
              endreInformasjonPath={hentPath(
                RoutesSkolepenger,
                ERouteSkolepenger.BarnaDine
              )}
            />
            <OppsummeringBarnasBosituasjon
              tittel={hentTekst('barnasbosted.sidetittel', intl)}
              barn={søknad.person.barn}
              endreInformasjonPath={hentPath(
                RoutesSkolepenger,
                ERouteSkolepenger.BostedOgSamvær
              )}
            />
            <OppsummeringDetaljertUtdanning
              tittel={hentTekst('stegtittel.utdanning', intl)}
              utdanning={søknad.utdanning}
              endreInformasjonPath={hentPath(
                RoutesSkolepenger,
                ERouteSkolepenger.Utdanning
              )}
            />
          </KomponentGruppe>
        </div>
      </Side>
    </>
  );
};

export default Oppsummering;
