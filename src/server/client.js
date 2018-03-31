import path from 'path';
import fs from 'fs';
import serialize from 'serialize-javascript';

import React from 'react';
import Helmet from 'react-helmet';
import JssProvider from 'react-jss/lib/JssProvider';

import { Provider } from 'react-redux';
import { StaticRouter as Router } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'react-jss/lib/jss';

import { createMuiTheme, MuiThemeProvider, Reboot } from 'material-ui';
import { createGenerateClassName } from 'material-ui/styles';
import { PersistGate } from 'redux-persist/integration/react';

export const renderClient = (config) => {
  const { theme, store, persistor, AppRoute, req, res } = config;
  const indexFilePath = path.resolve(path.join(process.cwd(), 'dist', 'static', 'index.html'));

  fs.readFile(indexFilePath, 'utf8', (err, contents) => {
    if (err) {
      console.error('read err', err);
      return res.status(404).end();
    }

    // Create Mui theme
    const sheetsRegistry = new SheetsRegistry();
    const muiTheme = createMuiTheme(theme);
    const generateClassName = createGenerateClassName();

    const context = {};
    const markup = renderToString(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router location={req.url} context={context}>
            <div>
              <Reboot />
              <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                <MuiThemeProvider theme={muiTheme} sheetsManager={new Map()}>
                  <AppRoute />
                </MuiThemeProvider>
              </JssProvider>
            </div>
          </Router>
        </PersistGate>
      </Provider>
    );

    const jssCss = sheetsRegistry.toString();
    const finalState = store.getState();

    if (context.url) {
      res.redirect(301, context.url);
    } else {
      const preloadedStateAsString = JSON.stringify(serialize(finalState));
      const helmet = Helmet.rewind();
      const replaceMap = [
        {
          key: 'window.__PRELOADED_STATE__ = {};',
          value: `window.__PRELOADED_STATE__ = ${preloadedStateAsString};`
        },
        {
          key: 'window.__IS_SSR__ = {};',
          value: 'window.__IS_SSR__ = true;'
        },

        {
          key: '{{SSR_HTML_ATTRIBUTES}}',
          value: (helmet.htmlAttributes && helmet.htmlAttributes.toString()) || ''
        },
        {
          key: '{{SSR_BODY_ATTRIBUTES}}',
          value: (helmet.bodyAttributes && helmet.bodyAttributes.toString()) || ''
        },
        {
          key: '<div {{SSR_BASE}}></div>',
          value: (helmet.base && helmet.base.toString()) || ''
        },
        {
          key: '<div {{SSR_TITLE}}></div>',
          value: (helmet.title && helmet.title.toString()) || ''
        },
        {
          key: '<div {{SSR_META}}></div>',
          value: (helmet.meta && helmet.meta.toString()) || ''
        },
        {
          key: '<div {{SSR_LINK}}></div>',
          value: (helmet.link && helmet.link.toString()) || ''
        },
        {
          key: '<div {{SSR_SCRIPT}}></div>',
          value: (helmet.script && helmet.script.toString()) || ''
        },
        {
          key: '<div {{SSR_STYLE}}></div>',
          value: (helmet.style && helmet.style.toString()) || ''
        },
        {
          key: '<div {{SSR_NOSCRIPT}}></div>',
          value: (helmet.noscript && helmet.noscript.toString()) || ''
        },
        {
          key: '<div id="root"></div>',
          value: `<div id="root">${markup}</div>`
        },
        {
          key: '.SSR_JSS',
          value: jssCss
        }
      ];

      let RenderedApp = contents;
      replaceMap.forEach((item) => {
        RenderedApp = RenderedApp.replace(item.key, item.value);
      });
      res.send(RenderedApp);
    }
    return undefined;
  });
};
