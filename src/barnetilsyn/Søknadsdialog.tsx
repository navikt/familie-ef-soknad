import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import Forside from './Forside';
import OmDeg from './steg/1-omdeg/OmDeg';
import Bosituasjon from './steg/2-bosituasjon/Bosituasjon';
import BarnaDine from './steg/3-barnadine/BarnaDine';
import RedirectTilStart from './RedirectTilStart';
import { BarnetilsynSøknadProvider } from './context/SøknadContext';

const Søknadsdialog: FC = () => {
  return (
    <BarnetilsynSøknadProvider>
      <Switch>
        <Route path={'/barnetilsyn/barn'} component={BarnaDine} />
        <Route path={'/barnetilsyn/bosituasjon'} component={Bosituasjon} />
        <Route path={'/barnetilsyn/om-deg'} component={OmDeg} />
        <Route path={'/barnetilsyn'} component={Forside} />
      </Switch>
    </BarnetilsynSøknadProvider>
  );
};

export default Søknadsdialog;
