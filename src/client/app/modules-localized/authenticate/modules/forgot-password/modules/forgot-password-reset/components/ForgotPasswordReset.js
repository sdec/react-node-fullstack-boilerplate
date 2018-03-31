import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Grid, Typography, withStyles } from 'material-ui';
import { ResponsiveContentPane } from '../../../../../../../shared/components/ResponsiveContentPane';
import { ForgotPasswordResetForm } from './ForgotPasswordResetForm';

const styles = (theme) => ({});

@withStyles(styles)
export class ForgotPasswordReset extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestForgotPasswordReset: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      sent: false
    };
  }

  render() {
    return (
      <ResponsiveContentPane>
        <Grid container justify="center" alignItems="center" alignContent="center">
          <Grid item md={6} sm={8} xs={12}>
            <Typography variant="headline" gutterBottom>
              <FormattedMessage id="ACCOUNT.FORGOT_PASSWORD_TITLE" defaultMessage="Reset your password" />
            </Typography>

            <Typography paragraph gutterBottom>
              <FormattedMessage id="ACCOUNT.FORGOT_PASSWORD_SUBTITLE" defaultMessage="Fill in your new password." />
            </Typography>

            {!this.state.sent && (
              <ForgotPasswordResetForm
                onSubmit={(response) => this.handleRequestForgotPasswordReset(response)}
                loading={this.props.loading}
                token={this.props.token}
              />
            )}

            {this.state.sent && (
              <div>
                <hr />
                <Typography paragraph>
                  <FormattedMessage
                    id="ACCOUNT.FORGOT_PASSWORD_RESET_SUCCESS"
                    defaultMessage="Your password has been reset. You can now login with your new password."
                  />
                </Typography>
              </div>
            )}
          </Grid>
        </Grid>
      </ResponsiveContentPane>
    );
  }

  handleRequestForgotPasswordReset(payload) {
    return this.props.onRequestForgotPasswordReset(payload).then(() => {
      this.setState({
        sent: true
      });
    });
  }
}
