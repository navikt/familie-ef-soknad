import React from 'react';
import Soknad from './komponenter/Soknad';
import { Panel } from 'nav-frontend-paneler';

const App = () => {
  return (
    <div className="app">
      <Panel className="innholdspanel">
        <div className="sporsmal-container">
          <Soknad />
        </div>
      </Panel>
    </div>
  );
};

export default App;
