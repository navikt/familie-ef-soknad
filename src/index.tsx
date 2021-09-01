import './utils/polyfills';
import './index.less';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import Environment from './Environment';

if (Environment().sentryUrl) {
  Sentry.init({
    dsn: Environment().sentryUrl,
    environment: Environment().miljø,
  });
}

ReactDOM.render(
    <div style={{position: "fixed", top: "40%", left: "25%"}}>Ny URL er: <a href={'https://familie.dev.nav.no/familie/alene-med-barn/soknad'}>https://familie.dev.nav.no/familie/alene-med-barn/soknad</a></div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
