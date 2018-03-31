import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch } from 'react-router';
import { withStyles } from 'material-ui';

import { ForgotPasswordResetContainer } from './containers/ForgotPasswordResetContainer';
import { LocalizedBasicLayout } from '../../../../../layout/components/LocalizedBasicLayout';

const styles = (theme) => ({});

@withStyles(styles)
export class ForgotPasswordResetRoute extends React.Component {
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
              <ForgotPasswordResetContainer />
            </LocalizedBasicLayout>
          </Route>
        </Switch>
      </div>
    );
  }
}
