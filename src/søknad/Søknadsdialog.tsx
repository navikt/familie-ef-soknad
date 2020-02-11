import React, { FC, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import OmDeg from './steg/1-omdeg/OmDeg';
import SendSøknad from './SendSøknad';
import Forside from './forside/Forside';
import BarnaDine from './steg/3-barnadine/BarnaDine';
import Bosituasjon from './steg/2-bosituasjon/Bosituasjon';

const Søknadsdialog: FC = () => {
  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Switch>
        <Route path={'/om-deg'} component={OmDeg} />
        <Route path={'/barn'} component={BarnaDine} />
        <Route path={'/bosituasjon'} component={Bosituasjon} />
        <Route path={'/send-soknad'} component={SendSøknad} />
        <Route path={'/'} component={Forside} />
      </Switch>
    </>
  );
};

export default Søknadsdialog;
