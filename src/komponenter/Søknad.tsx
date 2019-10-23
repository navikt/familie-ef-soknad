import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import sendInnSøknad from '../innsending/api';
import { Panel } from 'nav-frontend-paneler';
import { Input } from 'nav-frontend-skjema';

import svg from '../assets/VeilederSvg';

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

  const oppdaterText = (ev: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed: ', ev.target.value);

    setHocState({
      ...hocState,
      input: ev.target.value,
    });
  };

  return (
    <>
      <Veilederpanel fargetema="advarsel" type={'plakat'} kompakt svg={svg}>
        <h1>Dette er en testside som er under utvikling</h1>
        <p>
          Hvis du kom til denne siden fordi du hadde behov for informasjon om
          stønader til enslig mor eller far, kan du finne mer informasjon om
          dette her:
        </p>
        <p>
          <a
            href={
              'https://www.nav.no/no/Person/Familie/Enslig+mor+eller+far/Nyttig+a+vite/oversikt-over-st%C3%B8nader-til-enslig-mor-eller-far'
            }
          >
            Oversikt over stønader til enslig mor eller far
          </a>
        </p>
      </Veilederpanel>
      <Panel className="innholdspanel" border>
        <p>Ingenting vil skje om du trykker på denne knappen.</p>
        <Input label={'input'} onChange={(ev) => oppdaterText(ev)} />
        <Hovedknapp onClick={send} spinner={hocState.venter}>
          Dette er en testknapp
        </Hovedknapp>
        <p>Status: {hocState.status}</p>
      </Panel>
    </>
  );
};

export default Søknad;
