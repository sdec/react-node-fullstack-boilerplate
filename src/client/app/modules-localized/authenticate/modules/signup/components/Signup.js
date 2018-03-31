import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Grid, Typography, withStyles } from 'material-ui';
import { ResponsiveContentPane } from '../../../../../shared/components/ResponsiveContentPane';
import { SignupLocalForm } from './SignupLocalForm';

const styles = (theme) => ({});

@withStyles(styles)
export class Signup extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSignupLocal: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  render() {
    return (
      <ResponsiveContentPane>
        <Grid container justify="center" alignItems="center" alignContent="center">
          <Grid item md={6} sm={8} xs={12}>
            <Typography variant="headline" gutterBottom>
              <FormattedMessage id="ACCOUNT.SIGNUP_TITLE" defaultMessage="Signup" />
            </Typography>

            <SignupLocalForm onSubmit={(response) => this.handleRequestSignupLocal(response)} loading={this.props.loading} />
          </Grid>
        </Grid>
      </ResponsiveContentPane>
    );
  }

  handleRequestSignupLocal(payload) {
    return this.props.onRequestSignupLocal(payload);
  }
}
