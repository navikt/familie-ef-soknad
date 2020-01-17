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
import { Knapp } from 'nav-frontend-knapper';

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
        <div className="barnekort-wrapper">
        {barn?.map(b => <Barnekort navn={b.navn} fnr={b.fnr} alder={b.alder} harSammeAdresse={b.harSammeAdresse} />)}
        <div className="barnekort"><div className="informasjonsboks legg-til-barn-kort"><Normaltekst>Er du gravid eller har du nylig fått barn som foreløpig ikke er registrert i Folkeregisteret?</Normaltekst><Knapp>Legg til barn</Knapp></div></div>
        </div>
      </Side>
    </>
  );
};

export default BarnaDine;
