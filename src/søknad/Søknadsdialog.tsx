import React, { FC, useEffect } from 'react';
import { Route, Switch } from 'react-router';
import OmDeg from './steg/1-omdeg/OmDeg';
import SendSøknad from './SendSøknad';
import Forside from './Forside';
import Bosituasjon from './steg/2-bosituasjon/Bosituasjon';
import { injectIntl, IntlShape } from 'react-intl';
import useSøknadContext from '../context/SøknadContext';

interface Props {
  intl: IntlShape;
}

const Søknadsdialog: FC<Props> = ({ intl }) => {
  const { søknad, settSøknad } = useSøknadContext();

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

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

export default injectIntl(Søknadsdialog);
