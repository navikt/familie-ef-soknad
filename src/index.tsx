import 'babel-polyfill';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.less';
import * as serviceWorker from './serviceWorker';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { SpråkProvider } from './context/SpråkContext';
import ContextProviders from './context/ContextProviders';

ReactDOM.render(
  <SpråkProvider>
    <ContextProviders>
      <Router>
        <Route path={'/'} component={App} />
      </Router>
    </ContextProviders>
  </SpråkProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
