import React, { FC, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import OmDeg from './steg/1-omdeg/OmDeg';
import SendSøknad from './SendSøknad';
import Forside from './forside/Forside';
import Bosituasjon from './steg/2-bosituasjon/Bosituasjon';
import Arbeidssituasjon from './steg/3-arbeidssituasjon/Arbeidssituasjon';

const Søknadsdialog: FC = () => {
  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Switch>
        <Route path={'/om-deg'} component={OmDeg} />
        <Route path={'/bosituasjon'} component={Bosituasjon} />
        <Route
          path={'/arbeid-utdanning-og-andre-aktiviteter'}
          component={Arbeidssituasjon}
        />
        <Route path={'/send-soknad'} component={SendSøknad} />
        <Route path={'/'} component={Forside} />
      </Switch>
    </>
  );
};

export default Søknadsdialog;
