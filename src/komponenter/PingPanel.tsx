import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import axios from 'axios';
import Environment from '../Environment';

interface IPingState {
  status: string;
  venter: boolean;
  input: string;
}

const getToken = () => {
  return axios.get(`${Environment().apiUrl}/api/getToken`, {
    withCredentials: true,
  });
};

const PingPanel = () => {
  const [hocState, setHocState] = useState<IPingState>({
    status: `Klar for ping`,
    venter: false,
    input: '',
  });
  const send = () => {
    setHocState({ ...hocState, venter: true });

    getToken()
      .then((svar: { data: any }) =>
        setHocState({
          ...hocState,
          status: `Vi har kontakt med innlogget bruker: ${svar.data.message}`,
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
      <Panel className="pingpanel" border>
        <p>Ingenting vil skje om du trykker på denne knappen.</p>
        <Hovedknapp onClick={send} spinner={hocState.venter}>
          Dette er også en testknapp (Ping)
        </Hovedknapp>
        <p>Status: {hocState.status}</p>
      </Panel>
    </>
  );
};
export default PingPanel;
