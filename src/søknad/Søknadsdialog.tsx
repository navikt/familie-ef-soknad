import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import OmDeg from './steg/1-omdeg/OmDeg';
import SendSøknad from './SendSøknad';
import Forside from './Forside';
import Bosituasjon from './steg/2-bosituasjon/Bosituasjon';

const Søknadsdialog: FC = () => {
  return (
    <>
      <Switch>
        <Route path={'/om-deg'} component={OmDeg} />
        <Route path={'/bosituasjon'} component={Bosituasjon} />
        <Route path={'/send-soknad'} component={SendSøknad} />
        <Route path={'/'} component={Forside} />
      </Switch>
    </>
  );
};

export default Søknadsdialog;
