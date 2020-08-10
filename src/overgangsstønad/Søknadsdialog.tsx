import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import Aktivitet from './steg/5-aktivitet/Aktivitet';
import BarnaDine from './steg/3-barnadine/BarnaDine';
import BarnasBosted from './steg/4-barnasbosted/BarnasBosted';
import Bosituasjon from './steg/2-bosituasjon/Bosituasjon';
import Forside from './Forside';
import OmDeg from './steg/1-omdeg/OmDeg';
import MerOmDinSituasjon from './steg/6-meromsituasjon/MerOmDinSituasjon';
import Dokumentasjon from './steg/8-dokumentasjon/Dokumentasjon';
import Oppsummering from './steg/7-oppsummering/Oppsummering';
import Kvittering from './steg/9-kvittering/Kvittering';
import RedirectTilStart from './RedirectTilStart';

const Søknadsdialog: FC = () => {
  return (
    <>
      <Switch>
        <RedirectTilStart path={'/kvittering'} component={Kvittering} />
        <RedirectTilStart path={'/dokumentasjon'} component={Dokumentasjon} />
        <RedirectTilStart path={'/oppsummering'} component={Oppsummering} />
        <RedirectTilStart
          path={'/din-situasjon'}
          component={MerOmDinSituasjon}
        />
        <RedirectTilStart path={'/aktivitet'} component={Aktivitet} />
        <RedirectTilStart path={'/barnas-bosted'} component={BarnasBosted} />
        <RedirectTilStart path={'/barn'} component={BarnaDine} />
        <RedirectTilStart path={'/bosituasjon'} component={Bosituasjon} />
        <RedirectTilStart path={'/om-deg'} component={OmDeg} />
        <Route path={'/'} component={Forside} />
      </Switch>
    </>
  );
};

export default Søknadsdialog;
