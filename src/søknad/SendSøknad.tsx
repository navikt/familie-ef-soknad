import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { sendInnSøknad } from '../innsending/api';
import useSøknadContext from '../context/SøknadContext';
import Side from '../components/side/Side';
import { Normaltekst } from 'nav-frontend-typografi';
import { Routes, IRoute } from '../routing/Routes';
import { hentForrigeRoute } from '../routing/utils';
import { useLocation } from 'react-router';
import TestsideInformasjon from "../components/TestsideInformasjon";
import Filopplaster from "../components/filopplaster/Filopplaster";

interface IState {
  status: string;
  venter: boolean;
}

const SendSøknad = () => {
  const { søknad } = useSøknadContext();

  const [hocState, setHocState] = useState<IState>({
    status: `Søknad kan sendes`,
    venter: false,
  });

  const send = () => {
    setHocState({ ...hocState, venter: true });
    sendInnSøknad(søknad)
      .then((kvittering) =>
        setHocState({
          ...hocState,
          status: `Vi har kontakt: ${kvittering.text}`,
          venter: false,
        })
      )
      .catch((e) =>
        setHocState({
          ...hocState,
          status: `Noe gikk galt: ${e}`,
          venter: false,
        })
      );
  };

  const location = useLocation();
  const forrigeRoute: IRoute = hentForrigeRoute(Routes, location.pathname);

  return (
    <>
      <Side
        tittel={'Oppsummering'}
        tilbakePath={forrigeRoute.path}
        nestePath={''}
      >
        <Filopplaster tittel={"Erklæring om samlivsbrudd"} dokumentasjonsType={"samlivsbrudd"}/>
        <Filopplaster tittel={"Terminbekreftelse"} dokumentasjonsType={"terminbekreftelse"}/>
        <Normaltekst>
          Ingenting vil skje om du trykker på denne knappen.
        </Normaltekst>
        <Hovedknapp onClick={send} spinner={hocState.venter}>
          Send Søknad
        </Hovedknapp>
        <Normaltekst>Status: {hocState.status}</Normaltekst>
      </Side>
    </>
  );
};

export default SendSøknad;
