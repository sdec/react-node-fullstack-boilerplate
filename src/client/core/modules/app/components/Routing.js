import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import { map } from 'lodash';

import { locales } from './../../../../app/i18n';

import { LocalizedRoutes } from './LocalizedRoutes';
import { DelocalizedRoutes } from './DelocalizedRoutes';

const getMessagesForLocaleItem = (localeItem) => {
  const { messages } = localeItem;

  if (messages) {
    const mappedMessages = map(messages, (message, key) => {
      return {
        [key]: message.message
      };
    });

    if (mappedMessages && mappedMessages.length) {
      return mappedMessages[0];
    }

    console.error('i18n messages not available for locale', localeItem);
    return {};
  }

  console.error('i18n messages not available for locale', localeItem);
  return {};
};

const renderLocalizedRoutes = () => {
  return locales.map((localeItem, idx) => {
    addLocaleData(localeItem.localeData);

    return (
      <Route key={`localized-route-${idx}`} path={`/${localeItem.locale}`}>
        <IntlProvider locale={localeItem.locale} messages={getMessagesForLocaleItem(localeItem)}>
          <LocalizedRoutes />
        </IntlProvider>
      </Route>
    );
  });
};

const renderDelocalizedRoutes = () => {
  return locales.map((localeItem, idx) => {
    addLocaleData(localeItem.localeData);

    return <DelocalizedRoutes key={idx} />;
  });
};

export class Routing extends React.Component {
  render() {
    return (
      <Switch>
        {renderLocalizedRoutes()}
        {renderDelocalizedRoutes()}
        <Redirect to="/" />
      </Switch>
    );
  }
}
