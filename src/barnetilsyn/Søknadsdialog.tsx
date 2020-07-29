import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import Forside from './Forside';
import OmDeg from './steg/1-omdeg/OmDeg';
import Bosituasjon from './steg/2-bosituasjon/Bosituasjon';
import BarnaDine from './steg/3-barnadine/BarnaDine';
import BarnasBosted from './steg/4-barnasbosted/BarnasBosted';
import Aktivitet from './steg/5-aktivitet/Aktivitet';
import Oppsummering from './steg/7-oppsummering/Oppsummering';
import Dokumentasjon from './steg/8-dokumentasjon/Dokumentasjon';
import Kvittering from './steg/9-kvittering/Kvittering';
import Barnepass from './steg/6-barnepass/Barnepass';
import RedirectTilStart from './RedirectTilStart';

const SøknadsdialogBarnetilsyn: FC = () => {
  return (
    <Switch>
      <RedirectTilStart
        path={'/barnetilsyn/kvittering'}
        component={Kvittering}
      />
      <RedirectTilStart
        path={'/barnetilsyn/dokumentasjon'}
        component={Dokumentasjon}
      />
      <RedirectTilStart
        path={'/barnetilsyn/oppsummering'}
        component={Oppsummering}
      />
      <RedirectTilStart path={'/barnetilsyn/barnepass'} component={Barnepass} />
      <RedirectTilStart path={'/barnetilsyn/aktivitet'} component={Aktivitet} />
      <RedirectTilStart
        path={'/barnetilsyn/barnas-bosted'}
        component={BarnasBosted}
      />
      <RedirectTilStart path={'/barnetilsyn/barn'} component={BarnaDine} />
      <RedirectTilStart
        path={'/barnetilsyn/bosituasjon'}
        component={Bosituasjon}
      />
      <RedirectTilStart path={'/barnetilsyn/om-deg'} component={OmDeg} />
      <Route path={'/barnetilsyn'} component={Forside} />
    </Switch>
  );
};

export default SøknadsdialogBarnetilsyn;
