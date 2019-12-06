import React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import svg from '../assets/VeilederSvg';
import { Panel } from 'nav-frontend-paneler';
import Environment from '../Environment';
import styled from 'styled-components';

const StyledTestside = styled.div`
  padding: 0 50px 0 50px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto-fit minmax();

  .testside__tittel {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .testside__beskrivelse {
  }

  .testside__lenker {
  }
`;

const TestsideInformasjon = () => {
  return (
    <Panel className={'innholdspanel'}>
      <Veilederpanel fargetema="advarsel" type={'plakat'} kompakt svg={svg}>
        <StyledTestside>
          <h1 className={'testside__tittel'}>
            Dette er en testside som er under utvikling
          </h1>
          <p className={'testside__beskrivelse'}>
            Hvis du kom til denne siden fordi du hadde behov for informasjon om
            stønader til enslig mor eller far, kan du finne mer informasjon om
            dette her:
          </p>
          <div className={'testside__lenker'}>
            <p>
              <a
                href={
                  'https://www.nav.no/no/Person/Familie/Enslig+mor+eller+far/Nyttig+a+vite/oversikt-over-st%C3%B8nader-til-enslig-mor-eller-far'
                }
              >
                Oversikt over stønader til enslig mor eller far
              </a>
            </p>
            <p>
              <a href={Environment().veiviserUrl}>Veiviser</a>
            </p>
          </div>
        </StyledTestside>
      </Veilederpanel>
    </Panel>
  );
};

export default TestsideInformasjon;
