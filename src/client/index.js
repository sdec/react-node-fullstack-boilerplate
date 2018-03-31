// Polyfills
import 'reset-css/reset.css';
// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { createMuiTheme, MuiThemeProvider, Reboot } from 'material-ui';
import { PersistGate } from 'redux-persist/integration/react';

import { AppRoute } from './core/modules/app';
import { createAppStore } from './app/store';
import { theme } from './app/theming';

// Grab the state from a global variable injected into the server-generated HTML
// eslint-disable-next-line no-underscore-dangle
const preloadedState = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
// eslint-disable-next-line no-underscore-dangle
window.__PRELOADED_STATE__ = undefined;

// Create theme
const muiTheme = createMuiTheme(theme);

// Create store
const history = createBrowserHistory();
const { store, persistor } = createAppStore(history, preloadedState);

const renderApp = (Component) => {
  const template = (
    <AppContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={history}>
            <div>
              <Reboot />
              <MuiThemeProvider theme={muiTheme}>
                <Component />
              </MuiThemeProvider>
            </div>
          </Router>
        </PersistGate>
      </Provider>
    </AppContainer>
  );

  if (window.__IS_SSR__) {
    ReactDOM.hydrate(template, document.getElementById('root'));
  } else {
    ReactDOM.render(template, document.getElementById('root'));
  }
};

window.onload = () => {
  renderApp(AppRoute);
};

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./core/modules/app', () => {
    const newAppRoute = require('./core/modules/app').AppRoute;
    renderApp(newAppRoute);
  });
}
