import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Button, FormControl, Input, InputLabel, withStyles, Typography } from 'material-ui';
import { ContentPane } from '../../../../../shared/components/ContentPane';
import { APIService } from '../../../../../shared/services/APIService';
import { FormValidations } from '../../../../../shared/models/FormValidations';

const styles = (theme) => ({});

@withStyles(styles)
export class LoginLocalForm extends React.Component {
  static contextTypes = {
    intl: PropTypes.object.isRequired
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      password: '',
      errors: []
    };
  }

  render() {
    const { intl } = this.context;
    const { classes } = this.props;
    const validations = new FormValidations(this.state.errors);

    return (
      <ContentPane border>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={(e) => this.handleSubmit(e)}>
          <FormControl error={validations.hasError('email')} fullWidth>
            <InputLabel htmlFor="email">
              <FormattedMessage id="COMMON.EMAIL" defaultMessage="Email address" />
            </InputLabel>

            <Input id="email" name="email" type="email" onChange={(e) => this.handleTextFieldChanged(e, 'email')} />

            {validations.renderErrors('email')}
          </FormControl>

          <FormControl error={validations.hasError('password')} fullWidth margin="dense">
            <InputLabel htmlFor="password">
              <FormattedMessage id="COMMON.PASSWORD" defaultMessage="Password" />
            </InputLabel>

            <Input id="password" name="password" type="password" onChange={(e) => this.handleTextFieldChanged(e, 'password')} />

            {validations.renderErrors('password')}
          </FormControl>

          {validations.hasError() && (
            <FormControl error margin="dense">
              {validations.renderErrorsWithoutField()}
            </FormControl>
          )}

          <FormControl fullWidth margin="dense">
            <Button variant="raised" id="submit" name="submit" type="submit" color="primary" disabled={this.props.loading}>
              <FormattedMessage id="ACCOUNT.LOGIN_SUBMIT" defaultMessage="Login" />
            </Button>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Typography>
              <Link id="forgotPassword" name="forgotPassword" to={`/${intl.locale}/authenticate/forgot-password`}>
                <FormattedMessage id="ACCOUNT.FORGOT_PASSWORD" defaultMessage="Forgot your password?" />
              </Link>
            </Typography>
          </FormControl>

          <FormControl fullWidth>
            <Typography>
              <FormattedMessage id="ACCOUNT.DONT_HAVE_ACCOUNT" defaultMessage="Don't have an account?" />{' '}
              <Link id="signupHere" name="signupHere" to={`/${intl.locale}/authenticate/signup`}>
                <FormattedMessage id="ACCOUNT.SIGNUP_HERE" defaultMessage="Signup here" />
              </Link>
            </Typography>
          </FormControl>
        </form>
      </ContentPane>
    );
  }

  handleTextFieldChanged(e, field) {
    this.setState({
      [field]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      errors: []
    });

    return this.props.onSubmit(this.state).catch((response) => {
      const messages = APIService.mapAPIErrorToMessages(response);

      this.setState({
        errors: messages
      });
    });
  }
}
