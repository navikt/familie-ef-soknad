import React from 'react';
import Veilederpanel from 'nav-frontend-veilederpanel';
import svg from '../assets/VeilederSvg';

const DevelopmentInfoBox = () => {
  return (
    <Veilederpanel fargetema="advarsel" type={'plakat'} kompakt svg={svg}>
      <h1>Dette er en testside som er under utvikling</h1>
      <p>
        Hvis du kom til denne siden fordi du hadde behov for informasjon om
        stønader til enslig mor eller far, kan du finne mer informasjon om dette
        her:
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
  );
};

export default DevelopmentInfoBox;
