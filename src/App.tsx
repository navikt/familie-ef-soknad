import React from 'react';
import Soknad from './komponenter/Soknad';

const App = () => {
  return (
    <div className="app">
      <div className="sporsmal-container">
        <Soknad message={'Hei API'} />
      </div>
    </div>
  );
};

export default App;
