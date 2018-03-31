import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Grid, Typography, withStyles } from 'material-ui';
import { ResponsiveContentPane } from '../../../../../shared/components/ResponsiveContentPane';
import { ForgotPasswordForm } from './ForgotPasswordForm';

const styles = (theme) => ({});

@withStyles(styles)
export class ForgotPassword extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestForgotPasswordLocal: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
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
              <FormattedMessage id="ACCOUNT.FORGOT_PASSWORD_TITLE" defaultMessage="Forgot your password?" />
            </Typography>

            <Typography paragraph gutterBottom>
              <FormattedMessage
                id="ACCOUNT.FORGOT_PASSWORD_SUBTITLE"
                defaultMessage="No problem. Just fill in your email address and we will send you instruction on how to reset your password."
              />
            </Typography>

            {!this.state.sent && (
              <ForgotPasswordForm onSubmit={(response) => this.handleRequestForgotPasswordLocal(response)} loading={this.props.loading} />
            )}

            {this.state.sent && (
              <div>
                <hr />
                <Typography paragraph>
                  <FormattedMessage
                    id="ACCOUNT.FORGOT_PASSWORD_EMAIL_SENT"
                    defaultMessage="Check your email. We just sent you instruction on how to reset your password."
                  />
                </Typography>
              </div>
            )}
          </Grid>
        </Grid>
      </ResponsiveContentPane>
    );
  }

  handleRequestForgotPasswordLocal(payload) {
    return this.props.onRequestForgotPasswordLocal(payload).then(() => {
      this.setState({
        sent: true
      });
    });
  }
}
