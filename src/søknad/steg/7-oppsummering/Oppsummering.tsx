import React from 'react';
import Side from '../../../components/side/Side';
import { Normaltekst } from 'nav-frontend-typografi';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import { useIntl } from 'react-intl';
import OppsummeringOmDeg from './OppsummeringOmDeg';
import OppsummeringBarnasBosituasjon from './OppsummeringBarnasBosituasjon';
import OppsummeringBarnaDine from './OppsummeringBarnaDine';
import OppsummeringAktiviteter from './OppsummeringAktiviteter';
import OppsummeringDinSituasjon from './OppsummeringDinSituasjon';
import OppsummeringBosituasjonenDin from './OppsummeringBosituasjon';
import { useSøknad } from '../../../context/SøknadContext';
import { hentPath, RouteEnum, Routes } from '../../../routing/Routes';

const Oppsummering: React.FC = () => {
  const intl = useIntl();
  const { mellomlagreOvergangsstønad, søknad } = useSøknad();
  return (
    <>
      <Side
        tittel={intl.formatMessage({ id: 'oppsummering.sidetittel' })}
        skalViseKnapper={true}
        mellomlagreOvergangsstønad={mellomlagreOvergangsstønad}
        erSpørsmålBesvart={true}
      >
        <div className="oppsummering">
          <Normaltekst className="disclaimer">
            {intl.formatMessage({ id: 'oppsummering.normaltekst.lesgjennom' })}
          </Normaltekst>

          <KomponentGruppe>
            <OppsummeringOmDeg
              søker={søknad.person.søker}
              sivilstatus={søknad.sivilstatus}
              medlemskap={søknad.medlemskap}
              endreInformasjonPath={hentPath(Routes, RouteEnum.OmDeg)}
            />
            <OppsummeringBosituasjonenDin
              bosituasjon={søknad.bosituasjon}
              endreInformasjonPath={hentPath(
                Routes,
                RouteEnum.BosituasjonenDin
              )}
            />
            <OppsummeringBarnaDine
              barn={søknad.person.barn}
              endreInformasjonPath={hentPath(Routes, RouteEnum.Barn)}
            />
            <OppsummeringBarnasBosituasjon
              barn={søknad.person.barn}
              endreInformasjonPath={hentPath(Routes, RouteEnum.BarnasBosted)}
            />
            <OppsummeringAktiviteter
              aktivitet={søknad.aktivitet}
              endreInformasjonPath={hentPath(Routes, RouteEnum.Aktivitet)}
            />
            <OppsummeringDinSituasjon
              dinSituasjon={søknad.merOmDinSituasjon}
              endreInformasjonPath={hentPath(Routes, RouteEnum.DinSituasjon)}
            />
          </KomponentGruppe>
        </div>
      </Side>
    </>
  );
};

export default Oppsummering;
