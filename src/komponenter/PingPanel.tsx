import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import pingApi from '../authentication/pingApi';
import { Panel } from 'nav-frontend-paneler';

interface IPingState {
  status: string;
  venter: boolean;
  input: string;
}

const PingPanel = () => {
  const [hocState, setHocState] = useState<IPingState>({
    status: `Klar for ping`,
    venter: false,
    input: '',
  });
  const send = () => {
    setHocState({ ...hocState, venter: true });

    pingApi()
      .then((svar: { data: any }) =>
        setHocState({
          ...hocState,
          status: `Vi har kontakt: ${svar.data.message}`,
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
