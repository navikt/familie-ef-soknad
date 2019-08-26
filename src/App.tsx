import React from 'react';
import { Knapp } from 'nav-frontend-knapper';

import Soknad from "./components/Soknad";

const App = () => {
  return (
    <div className="app">
      <div className="sporsmal-container">
            <Soknad message={"Soknadsmelding"} />
      </div>
    </div>
  );
};

export default App;
