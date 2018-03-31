import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route, Switch } from 'react-router';
import { localizedRoutes } from '../../../../app/routes';
import { Messages } from './Messages';

export class LocalizedRoutes extends React.Component {
  static propTypes = {};

  static contextTypes = {
    intl: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <Messages />
        <Switch>
          {localizedRoutes(this.context.intl.locale, this.context.intl).map((route, idx) => {
            return <Route key={idx} path={route.path} exact={route.exact} component={route.component} />;
          })}
          <Redirect to={`/${this.context.intl.locale}`} />
        </Switch>
      </div>
    );
  }
}
