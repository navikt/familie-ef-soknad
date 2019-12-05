import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { sendInnSøknad } from '../innsending/api';
import useSøknadContext from '../context/SøknadContext';
import Side from '../components/side/Side';
import { Normaltekst } from 'nav-frontend-typografi';
import { Routes, IRoute } from '../config/Routes';
import { hentForrigeRoute } from '../utils/routing';
import { useLocation } from 'react-router';

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
    const søknadsTekst = JSON.stringify({
      text: JSON.stringify(søknad),
    });
    sendInnSøknad(søknadsTekst)
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
      <Side tittel={'Oppsummering'} tilbakePath={forrigeRoute.path}>
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
