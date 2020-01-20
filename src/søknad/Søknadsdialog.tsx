import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import OmDeg from './inngangsvilkår/omdeg/OmDeg';
import SendSøknad from './SendSøknad';
import Forside from './Forside';

const Søknadsdialog: FC = () => {
  return (
    <>
      <Switch>
        <Route path={'/familie/alene-med-barn/om-deg'} component={OmDeg} />
        <Route
          path={'/familie/alene-med-barn/send-soknad'}
          component={SendSøknad}
        />
        <Route path={'/familie/alene-med-barn'} component={Forside} />
      </Switch>
    </>
  );
};

export default Søknadsdialog;
