import React, { FC, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import OmDeg from './steg/1-omdeg/OmDeg';
import SendSøknad from './SendSøknad';
import Forside from './forside/Forside';
import BarnasBosted from './steg/4-barnasbosted/BarnasBosted';
import Bosituasjon from './steg/2-bosituasjon/Bosituasjon';
import Arbeidssituasjon from './steg/5-arbeidssituasjon/Arbeidssituasjon';
import BarnaDine from './steg/3-barnadine/BarnaDine';

const Søknadsdialog: FC = () => {
  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Switch>
        <Route path={'/om-deg'} component={OmDeg} />
        <Route path={'/bosituasjon'} component={Bosituasjon} />
        <Route path={'/barn'} component={BarnaDine} />
        <Route path={'/barnas-bosted'} component={BarnasBosted} />
        <Route path={'/arbeidsituasjon'} component={Arbeidssituasjon} />
        <Route path={'/send-soknad'} component={SendSøknad} />
        <Route path={'/'} component={Forside} />
      </Switch>
    </>
  );
};

export default Søknadsdialog;
