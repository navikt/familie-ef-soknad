import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import sendInnSøknad from '../innsending/api';
import { Panel } from 'nav-frontend-paneler';
import Medlemskap from './inngangsvilkår/personopplysninger/Medlemskap';
import Personopplysninger from './inngangsvilkår/personopplysninger/Personopplysninger';

interface IState {
  status: string;
  venter: boolean;
}

const Søknad = () => {
  const [hocState, setHocState] = useState<IState>({
    status: `Søknad kan sendes`,
    venter: false,
  });
  const send = () => {
    setHocState({ ...hocState, venter: true });
    const søknadsTekst = JSON.stringify({
      text: 'Hei API!',
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

  return (
    <div className={'søknadsdialog'}>
      <Panel className={'innholdspanel'}>
        <div className={'innholdscontainer personopplysninger'}>
          <Personopplysninger />
          <Medlemskap />
        </div>
      </Panel>
      <Panel className="innholdspanel" border>
        <p>Ingenting vil skje om du trykker på denne knappen.</p>

        <Hovedknapp onClick={send} spinner={hocState.venter}>
          Dette er en testknapp
        </Hovedknapp>
        <p>Status: {hocState.status}</p>
      </Panel>
    </div>
  );
};

export default Søknad;
