import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import sendInnSøknad from '../innsending/api';
import { Panel } from 'nav-frontend-paneler';

interface IState {
  status: string;
  venter: boolean;
  input: string;
}

const Søknad = () => {
  const [hocState, setHocState] = useState<IState>({
    status: `Søknad kan sendes`,
    venter: false,
    input: '',
  });
  const send = () => {
    setHocState({ ...hocState, venter: true });
    const søknadsTekst = JSON.stringify({
      text: 'Hei API!',
    });

    sendInnSøknad(søknadsTekst, hocState.input)
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

  return (
    <>
      <Panel className="innholdspanel" border>
        <p>Ingenting vil skje om du trykker på denne knappen.</p>
        <Hovedknapp onClick={send} spinner={hocState.venter}>
          Dette er en testknapp
        </Hovedknapp>
        <p>Status: {hocState.status}</p>
      </Panel>
    </>
  );
};
export default Søknad;
