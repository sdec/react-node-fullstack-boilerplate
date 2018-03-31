import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch } from 'react-router';
import { withStyles } from 'material-ui';

import { ForgotPasswordResetRoute } from './modules/forgot-password-reset';
import { ForgotPasswordContainer } from './containers/ForgotPasswordContainer';
import { LocalizedBasicLayout } from '../../../layout/components/LocalizedBasicLayout';

const styles = (theme) => ({});

@withStyles(styles)
export class ForgotPasswordRoute extends React.Component {
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
          <Route path={`/${intl.locale}/authenticate/forgot-password/reset`} exact component={ForgotPasswordResetRoute} />
          <Route>
            <LocalizedBasicLayout>
              <ForgotPasswordContainer />
            </LocalizedBasicLayout>
          </Route>
        </Switch>
      </div>
    );
  }
}
