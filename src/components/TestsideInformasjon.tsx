import React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import svg from '../assets/VeilederSvg';
import { Panel } from 'nav-frontend-paneler';
import Environment from '../Environment';
import styled from 'styled-components';

const StyledTestside = styled.div`
  padding: 0 50px 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TestsideInformasjon = () => {
  return (
    <Panel className={'innholdspanel'}>
      <Veilederpanel fargetema="advarsel" type={'plakat'} kompakt svg={svg}>
        <StyledTestside>
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
          <p>
            <a href={Environment().veiviserUrl}>Veiviser</a>
          </p>
        </StyledTestside>
      </Veilederpanel>
    </Panel>
  );
};

export default TestsideInformasjon;
