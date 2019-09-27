import React, { useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import { sendInnSøknad } from '../innsending/api';
import { Panel } from 'nav-frontend-paneler';

import svg from './VeilederSvg';

interface IState {
  status: string;
}

const Soknad = () => {
  const [hocState, setHocState] = useState<IState>({
    status: `Søknad kan sendes`,
  });
  const send = () => {
    const søknadsStreng = JSON.stringify({
      text: 'Hei API!',
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
      <Veilederpanel fargetema="advarsel" type={'plakat'} kompakt svg={svg}>
        <h1>Dette er en testside som er under utvikling</h1>
        <p>Ingenting vil skje om du trykker på knappen.</p>
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
      <Panel className="innholdspanel">
        <Hovedknapp onClick={send}>Dette er en testknapp</Hovedknapp>
        <p>Status: {hocState.status}</p>
      </Panel>
    </>
  );
};

export default Soknad;
