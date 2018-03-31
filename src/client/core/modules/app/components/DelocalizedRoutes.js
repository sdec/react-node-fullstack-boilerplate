import React from 'react';

import { Redirect, Route, Switch } from 'react-router';
import { delocalizedRoutes } from '../../../../app/routes';
import { Messages } from './Messages';

export class DelocalizedRoutes extends React.Component {
  static propTypes = {};
  static contextTypes = {};

  render() {
    return (
      <div>
        <Messages />
        <Switch>
          {delocalizedRoutes().map((route, idx) => {
            return <Route key={idx} path={route.path} exact={route.exact} component={route.component} />;
          })}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}
