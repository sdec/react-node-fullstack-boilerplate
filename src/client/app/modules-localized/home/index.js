import React from 'react';
import PropTypes from 'prop-types';

import { Redirect, Route, Switch } from 'react-router';
import { withStyles } from 'material-ui';

import { Home } from './components/Home';
import { LocalizedBasicLayout } from '../layout/components/LocalizedBasicLayout';

const styles = (theme) => ({});

@withStyles(styles)
export class HomeRoute extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  static contextTypes = {
    intl: PropTypes.object.isRequired
  };

  render() {
    const { intl } = this.context;

    return (
      <div>
        <Switch>
          <Route>
            <LocalizedBasicLayout>
              <Home />
            </LocalizedBasicLayout>
          </Route>
          <Redirect to={`/${intl.locale}`} />
        </Switch>
      </div>
    );
  }
}
