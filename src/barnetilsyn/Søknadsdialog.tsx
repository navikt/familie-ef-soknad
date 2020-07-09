import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import Forside from './Forside';
import OmDeg from './steg/1-omdeg/OmDeg';
import RedirectTilStart from './RedirectTilStart';

const Søknadsdialog: FC = () => {
  return (
    <>
      <Switch>
        <RedirectTilStart path={'/om-deg'} component={OmDeg} />
        <Route path={'/'} component={Forside} />
      </Switch>
    </>
  );
};

export default Søknadsdialog;
