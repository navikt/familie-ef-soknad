import './utils/polyfills';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.less';
import * as serviceWorker from './serviceWorker';
import App from './App';
import ArbeidssøkerApp from './arbeidssøkerskjema/SkjemaApp';
import BarnetilsynApp from './barnetilsyn/BarnetilsynApp';
import React from 'react';
import ReactDOM from 'react-dom';
import { SpråkProvider } from './context/SpråkContext';
import ContextProviders from './context/ContextProviders';
import { ScrollToTop } from './utils/visning';
import * as Sentry from '@sentry/browser';
import Environment from './Environment';
import SkolepengerApp from './skolepenger/SkolepengerApp';
import DokumentasjonsbehovApp from './dokumentasjonsbehov/DokumentasjonsbehovApp';

if (Environment().sentryUrl) {
  Sentry.init({
    dsn: Environment().sentryUrl,
    environment: Environment().miljø,
  });
}

ReactDOM.render(
  <SpråkProvider>
    <ContextProviders>
      <Router basename={process.env.PUBLIC_URL}>
        <ScrollToTop />
        <Switch>
          <Route path={'/arbeidssoker'} component={ArbeidssøkerApp} />
          <Route path={'/barnetilsyn'} component={BarnetilsynApp} />
          <Route path={'/skolepenger'} component={SkolepengerApp} />
          <Route path={'/innsendtsoknad'} component={DokumentasjonsbehovApp} />
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
