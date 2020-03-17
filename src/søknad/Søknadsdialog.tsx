import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import Aktivitet from './steg/5-aktivitet/Aktivitet';
import BarnaDine from './steg/3-barnadine/BarnaDine';
import BarnasBosted from './steg/4-barnasbosted/BarnasBosted';
import Bosituasjon from './steg/2-bosituasjon/Bosituasjon';
import Forside from './forside/Forside';
import OmDeg from './steg/1-omdeg/OmDeg';
import MerOmDinSituasjon from './steg/6-meromsituasjon/MerOmDinSituasjon';
import LastOppDokumentasjon from './steg/8-dokumentasjon/LastOppDokumentasjon';

const Søknadsdialog: FC = () => {
  return (
    <>
      <Switch>
        <Route path={'/dokumentasjon'} component={LastOppDokumentasjon} />
        <Route path={'/din-situasjon'} component={MerOmDinSituasjon} />
        <Route path={'/aktivitet'} component={Aktivitet} />
        <Route path={'/barnas-bosted'} component={BarnasBosted} />
        <Route path={'/barn'} component={BarnaDine} />
        <Route path={'/bosituasjon'} component={Bosituasjon} />
        <Route path={'/om-deg'} component={OmDeg} />
        <Route path={'/'} component={Forside} />
      </Switch>
    </>
  );
};

export default Søknadsdialog;
