import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import Forside from './Forside';
import RedirectTilStart from './RedirectTilStart';
import OmDeg from './steg/1-omdeg/OmDeg';
import Bosituasjon from './steg/2-bosituasjon/Bosituasjon';
import BarnaDine from './steg/3-barnadine/BarnaDine';

const SøknadsdialogSkolepenger: FC = () => {
  return (
    <Switch>
      {/*<RedirectTilStart*/}
      {/*  path={'/skolepenger/kvittering'}*/}
      {/*  component={Kvittering}*/}
      {/*/>*/}
      {/*<RedirectTilStart*/}
      {/*  path={'/skolepenger/dokumentasjon'}*/}
      {/*  component={Dokumentasjon}*/}
      {/*/>*/}
      {/*<RedirectTilStart*/}
      {/*  path={'/skolepenger/oppsummering'}*/}
      {/*  component={Oppsummering}*/}
      {/*/>*/}
      {/*<RedirectTilStart path={'/skolepenger/barnepass'} component={Barnepass} />*/}
      {/*<RedirectTilStart path={'/skolepenger/aktivitet'} component={Aktivitet} />*/}
      {/*<RedirectTilStart*/}
      {/*  path={'/skolepenger/barnas-bosted'}*/}
      {/*  component={BarnasBosted}*/}
      {/*/>*/}
      <RedirectTilStart path={'/skolepenger/barn'} component={BarnaDine} />
      <RedirectTilStart
        path={'/skolepenger/bosituasjon'}
        component={Bosituasjon}
      />
      <RedirectTilStart path={'/skolepenger/om-deg'} component={OmDeg} />
      <Route path={'/skolepenger'} component={Forside} />
    </Switch>
  );
};

export default SøknadsdialogSkolepenger;
