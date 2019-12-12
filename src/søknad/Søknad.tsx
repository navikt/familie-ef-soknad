import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { sendInnSøknad } from '../innsending/api';
import { Panel } from 'nav-frontend-paneler';
import Medlemskap from './inngangsvilkår/omDeg/Medlemskap';
import Personopplysninger from './inngangsvilkår/omDeg/Personopplysninger';
import useSøknadContext from '../context/SøknadContext';
import Sivilstatus from './inngangsvilkår/omDeg/Sivilstatus/Sivilstatus';

interface IState {
  status: string;
  venter: boolean;
}

const Søknad = () => {
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

  return (
    <div className={'søknadsdialog'}>
      <Panel className={'innholdspanel'}>
        <div className={'innholdscontainer personopplysninger'}>
          <Personopplysninger />
          <Sivilstatus />
          <Medlemskap />
        </div>
      </Panel>
      <Panel className="innholdspanel" border>
        <p>Ingenting vil skje om du trykker på denne knappen.</p>

        <Hovedknapp onClick={send} spinner={hocState.venter}>
          Send Søknad
        </Hovedknapp>
        <p>Status: {hocState.status}</p>
      </Panel>
    </div>
  );
};

export default Søknad;
