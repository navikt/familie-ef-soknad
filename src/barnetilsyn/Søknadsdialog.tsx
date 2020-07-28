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

const SøknadsdialogBarnetilsyn: FC = () => {
  return (
    <Switch>
      <Route path={'/barnetilsyn/kvittering'} component={Kvittering} />
      <Route path={'/barnetilsyn/dokumentasjon'} component={Dokumentasjon} />
      <Route path={'/barnetilsyn/oppsummering'} component={Oppsummering} />
      <Route path={'/barnetilsyn/barnepass'} component={Barnepass} />
      <Route path={'/barnetilsyn/aktivitet'} component={Aktivitet} />
      <Route path={'/barnetilsyn/barnas-bosted'} component={BarnasBosted} />
      <Route path={'/barnetilsyn/barn'} component={BarnaDine} />
      <Route path={'/barnetilsyn/bosituasjon'} component={Bosituasjon} />
      <Route path={'/barnetilsyn/om-deg'} component={OmDeg} />
      <Route path={'/barnetilsyn'} component={Forside} />
    </Switch>
  );
};

export default SøknadsdialogBarnetilsyn;
