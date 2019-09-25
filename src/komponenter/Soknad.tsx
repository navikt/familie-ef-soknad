import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { sendInnSøknad } from '../innsending/api';

interface SoknadProps {
  message: string;
}

interface IState {
  status: string;
}

const Soknad: React.FC<SoknadProps> = ({ message }) => {
  const [hocState, setHocState] = useState<IState>({
    status: `Søknad kan sendes`,
  });
  const send = () => {
    let søknadsStreng = JSON.stringify({
      text: message,
    });
    sendInnSøknad(søknadsStreng)
      .then((resultat) =>
        setHocState({ ...hocState, status: `Vi har kontakt: ${resultat}` })
      )
      .catch((e) =>
        setHocState({ ...hocState, status: `Noe gikk galt: ${e}` })
      );
  };

  return (
    <>
      <h1>{message}</h1>
      <Hovedknapp onClick={send}>Send søknad</Hovedknapp>
      <p>Status: {hocState.status}</p>
    </>
  );
};

export default Soknad;
