import React from 'react';
import KomponentGruppe from '../../../components/gruppe/KomponentGruppe';
import OppsummeringAktiviteter from '../../../søknad/steg/7-oppsummering/OppsummeringAktiviteter';
import OppsummeringBarnaDine from '../../../søknad/steg/7-oppsummering/OppsummeringBarnaDine';
import OppsummeringBarnasBosituasjon from '../../../søknad/steg/7-oppsummering/OppsummeringBarnasBosituasjon';
import OppsummeringBarnepass from './OppsummeringBarnepass';
import OppsummeringBosituasionenDin from '../../../søknad/steg/7-oppsummering/OppsummeringBosituasjon';
import OppsummeringOmDeg from '../../../søknad/steg/7-oppsummering/OppsummeringOmDeg';
import Side from '../../side/Side';
import { hentPath, RouteEnum, Routes } from '../../routing/Routes';
import { IBarn } from '../../../models/barn';
import { Normaltekst } from 'nav-frontend-typografi';
import { useBarnetilsynSøknad } from '../../BarnetilsynContext';
import { useIntl } from 'react-intl';

const Oppsummering: React.FC = () => {
  const intl = useIntl();
  const { mellomlagreBarnetilsyn, søknad } = useBarnetilsynSøknad();
  const barnSomSkalHaBarnepass: IBarn[] = søknad.person.barn.filter(
    (barn) => barn.skalHaBarnepass?.verdi
  );
  return (
    <>
      <Side
        tittel={intl.formatMessage({ id: 'oppsummering.sidetittel' })}
        skalViseKnapper={true}
        mellomlagreBarnetilsyn={mellomlagreBarnetilsyn}
        erSpørsmålBesvart={true}
      >
        <div className={'oppsummering'}>
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
            <OppsummeringBosituasionenDin
              bosituasjon={søknad.bosituasjon}
              endreInformasjonPath={hentPath(
                Routes,
                RouteEnum.BosituasjonenDin
              )}
            />
            <OppsummeringBarnaDine
              barn={søknad.person.barn}
              endreInformasjonPath={hentPath(Routes, RouteEnum.BarnaDine)}
            />
            <OppsummeringBarnasBosituasjon
              barn={søknad.person.barn}
              endreInformasjonPath={hentPath(Routes, RouteEnum.BostedOgSamvær)}
            />
            <OppsummeringAktiviteter
              aktivitet={søknad.aktivitet}
              endreInformasjonPath={hentPath(Routes, RouteEnum.Aktivitet)}
            />
            <OppsummeringBarnepass
              søkerFraBestemtDato={søknad.søkerFraBestemtMåned}
              søknadsdato={søknad.søknadsdato}
              barnSomSkalHaBarnepass={barnSomSkalHaBarnepass}
              endreInformasjonPath={hentPath(Routes, RouteEnum.Barnepass)}
            />
          </KomponentGruppe>
        </div>
      </Side>
    </>
  );
};

export default Oppsummering;
