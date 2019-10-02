import React from 'react';
import Søknad from './komponenter/Søknad';
import { Panel } from 'nav-frontend-paneler';

const App = () => {
  return (
    <div className="app">
      <Panel className="innholdspanel">
        <div>
          <Søknad />
        </div>
      </Panel>
    </div>
  );
};

export default App;
