import React, { useState } from 'react';
import useSøknadContext from '../../../context/SøknadContext';
import Side from '../../../components/side/Side';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { Routes, IRoute } from '../../../routing/Routes';
import { hentNesteRoute } from '../../../routing/utils';
import { hentForrigeRoute } from '../../../routing/utils';
import { useLocation } from 'react-router';
import { useIntl } from 'react-intl';

const BarnasBosted: React.FC = () => {
  const intl = useIntl();
  const { søknad } = useSøknadContext();

  const location = useLocation();
  const nesteRoute: IRoute = hentNesteRoute(Routes, location.pathname);
  const forrigeRoute: IRoute = hentForrigeRoute(Routes, location.pathname);

  return (
    <>
      <Side
        tittel={intl.formatMessage({ id: 'barnadine.sidetittel'})}
        nestePath={nesteRoute.path}
        tilbakePath={forrigeRoute.path}
      >
        <div className="barnas-foreldre">
            Halla
        </div>
      </Side>
    </>
  );
};

export default BarnasBosted;
