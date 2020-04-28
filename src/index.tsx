import 'babel-polyfill';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.less';
import * as serviceWorker from './serviceWorker';
import App from './App';
import ArbeidssøkerApp from './arbeidssøkerskjema/SkjemaApp';
import React from 'react';
import ReactDOM from 'react-dom';
import { SpråkProvider } from './context/SpråkContext';
import ContextProviders from './context/ContextProviders';

ReactDOM.render(
  <SpråkProvider>
    <ContextProviders>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path={'/arbeidssøker'} component={ArbeidssøkerApp} />
          <Route path={'/'} component={App} />
        </Switch>
      </Router>
    </ContextProviders>
  </SpråkProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
