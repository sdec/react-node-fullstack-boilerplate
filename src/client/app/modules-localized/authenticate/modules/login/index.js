import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch } from 'react-router';
import { withStyles } from 'material-ui';

import { LoginContainer } from './containers/LoginContainer';
import { LocalizedBasicLayout } from '../../../layout/components/LocalizedBasicLayout';

const styles = (theme) => ({});

@withStyles(styles)
export class LoginRoute extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  static contextTypes = {
    intl: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  render() {
    const { intl, router } = this.context;

    return (
      <div>
        <Switch>
          <Route>
            <LocalizedBasicLayout>
              <LoginContainer />
            </LocalizedBasicLayout>
          </Route>
        </Switch>
      </div>
    );
  }
}
