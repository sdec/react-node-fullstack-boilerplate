import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Grid, Typography, withStyles } from 'material-ui';
import { ResponsiveContentPane } from '../../../../../shared/components/ResponsiveContentPane';
import { LoginLocalForm } from './LoginLocalForm';

const styles = (theme) => ({});

@withStyles(styles)
export class Login extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestLoginLocal: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  render() {
    return (
      <ResponsiveContentPane>
        <Grid container justify="center" alignItems="center" alignContent="center">
          <Grid item md={6} sm={8} xs={12}>
            <Typography variant="headline" gutterBottom>
              <FormattedMessage id="ACCOUNT.LOGIN_TITLE" defaultMessage="Login" />
            </Typography>

            <LoginLocalForm onSubmit={(response) => this.handleRequestLoginLocal(response)} loading={this.props.loading} />
          </Grid>
        </Grid>
      </ResponsiveContentPane>
    );
  }

  handleRequestLoginLocal(payload) {
    return this.props.onRequestLoginLocal(payload);
  }
}
