import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import {pingApi, sendInnSøknad} from '../innsending/api';

interface SoknadProps {
  message: string;
}

interface IState {
  status: string,
  pingReturn: string;
}

const Soknad: React.FC<SoknadProps> = ({ message }) => {
  const [hocState, setHocState] = useState<IState>({
    status: `Søknad kan sendes`, pingReturn:""
  });

  const ping = () =>  {
    pingApi()
        .then((resultat) =>
            setHocState({ ...hocState, pingReturn: ` ${resultat.text}` })
        )
        .catch((e) =>
            setHocState({ ...hocState, pingReturn: `??????: ${e}` })
        );
  }

  return (
    <>
      <h1>{message}</h1>
      <Hovedknapp onClick={send}>Send søknad</Hovedknapp>
      <p>Status: {hocState.status}</p>

      <Hovedknapp onClick={ping}>Ping api</Hovedknapp>
      <p>{hocState.pingReturn}</p>

    </>
  );



  function send() {
    let søknadsStreng = JSON.stringify({
      text: message
    });
    sendInnSøknad(søknadsStreng)
      .then((resultat) =>
        setHocState({ ...hocState, status: `Vi har kontakt: ${resultat.text}` })
      )
      .catch((e) =>
        setHocState({ ...hocState, status: `Noe gikk galt: ${e}` })
      );
  }
};

export default Soknad;
