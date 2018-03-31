import React from 'react';
import PropTypes from 'prop-types';

import { Route, Switch } from 'react-router';
import { withStyles } from 'material-ui';

import { SignupContainer } from './containers/SignupContainer';
import { LocalizedBasicLayout } from '../../../layout/components/LocalizedBasicLayout';

const styles = (theme) => ({});

@withStyles(styles)
export class SignupRoute extends React.Component {
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
              <SignupContainer />
            </LocalizedBasicLayout>
          </Route>
        </Switch>
      </div>
    );
  }
}
