import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { sendInnSøknad } from '../../innsending/api';
import useSøknadContext from '../../context/SøknadContext';
import Side from '../../components/side/Side';
import { Normaltekst } from 'nav-frontend-typografi';
import Barnekort from './Barnekort';
import { Routes, IRoute } from '../../config/Routes';
import { hentForrigeRoute } from '../../utils/routing';
import { useLocation } from 'react-router';

const BarnaDine = () => {
  const { søknad } = useSøknadContext();

  const barn = søknad.person.barn;

  const location = useLocation();
  const forrigeRoute: IRoute = hentForrigeRoute(Routes, location.pathname);

  return (
    <>
      <Side
        tittel={'Barna dine'}
        tilbakePath={forrigeRoute.path}
        nestePath={''}
      >
        {barn?.map(b => <Barnekort navn={b.navn} fnr={b.fnr} alder={b.alder} harSammeAdresse={b.harSammeAdresse} />)}
      </Side>
    </>
  );
};

export default BarnaDine;
