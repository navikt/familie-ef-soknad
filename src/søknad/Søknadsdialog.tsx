import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import OmDeg from './inngangsvilkår/omdeg/OmDeg';
import SendSøknad from './SendSøknad';
import Forside from './Forside';

const Søknadsdialog: FC = () => {
  return (
    <>
      <Switch>
        <Route path={'/om-deg'} component={OmDeg} />
        <Route path={'/send-soknad'} component={SendSøknad} />
        <Route path={'/'} component={Forside} />
      </Switch>
    </>
  );
};

export default Søknadsdialog;
