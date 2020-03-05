import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import OmDeg from './steg/1-omdeg/OmDeg';
import SendSøknad from './SendSøknad';
import Forside from './forside/Forside';
import BarnasBosted from './steg/4-barnasbosted/BarnasBosted';
import Bosituasjon from './steg/2-bosituasjon/Bosituasjon';
import Arbeidssituasjon from './steg/5-arbeidssituasjon/Arbeidssituasjon';
import BarnaDine from './steg/3-barnadine/BarnaDine';
import MerOmDinSituasjon from './steg/6-meromsituasjon/MerOmDinSituasjon';

const Søknadsdialog: FC = () => {
  return (
    <>
      <Switch>
        <Route path={'/om-deg'} component={OmDeg} />
        <Route path={'/bosituasjon'} component={Bosituasjon} />
        <Route path={'/barn'} component={BarnaDine} />
        <Route path={'/barnas-bosted'} component={BarnasBosted} />
        <Route path={'/arbeidsituasjon'} component={Arbeidssituasjon} />
        <Route path={'/din-situasjon'} component={MerOmDinSituasjon} />
        <Route path={'/send-soknad'} component={SendSøknad} />
        <Route path={'/'} component={Forside} />
      </Switch>
    </>
  );
};

export default Søknadsdialog;
