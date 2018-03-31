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
export class SignupLocalForm extends React.Component {
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
          <FormControl error={validations.hasError('firstName')} fullWidth>
            <InputLabel htmlFor="firstName">
              <FormattedMessage id="COMMON.FIRST_NAME" defaultMessage="First name" />
            </InputLabel>

            <Input id="firstName" name="firstName" type="text" onChange={(e) => this.handleTextFieldChanged(e, 'firstName')} />

            {validations.renderErrors('firstName')}
          </FormControl>

          <FormControl error={validations.hasError('lastName')} fullWidth margin="dense">
            <InputLabel htmlFor="lastName">
              <FormattedMessage id="COMMON.LAST_NAME" defaultMessage="Last name" />
            </InputLabel>

            <Input id="lastName" name="lastName" type="text" onChange={(e) => this.handleTextFieldChanged(e, 'lastName')} />

            {validations.renderErrors('lastName')}
          </FormControl>

          <FormControl error={validations.hasError('email')} fullWidth margin="dense">
            <InputLabel htmlFor="email">
              <FormattedMessage id="COMMON.EMAIL" defaultMessage="Email address" />
            </InputLabel>

            <Input id="email" name="email" type="email" onChange={(e) => this.handleTextFieldChanged(e, 'email')} />

            {validations.renderErrors('email')}
          </FormControl>

          <FormControl error={validations.hasError('password')} fullWidth margin="dense">
            <InputLabel htmlFor="password">
              <FormattedMessage id="ACCOUNT.CHOOSE_A_PASSWORD" defaultMessage="Choose a password" />
            </InputLabel>

            <Input id="password" name="password" type="password" onChange={(e) => this.handleTextFieldChanged(e, 'password')} />

            {validations.renderErrors('password')}
          </FormControl>

          <FormControl error={validations.hasError('passwordRepeat')} fullWidth margin="dense">
            <InputLabel htmlFor="passwordRepeat">
              <FormattedMessage id="ACCOUNT.CONFIRM_YOUR_PASSWORD" defaultMessage="Confirm your password" />
            </InputLabel>

            <Input
              id="passwordRepeat"
              name="passwordRepeat"
              type="password"
              onChange={(e) => this.handleTextFieldChanged(e, 'passwordRepeat')}
            />

            {validations.renderErrors('passwordRepeat')}
          </FormControl>

          {validations.hasError() && (
            <FormControl error margin="dense">
              {validations.renderErrorsWithoutField()}
            </FormControl>
          )}

          <FormControl fullWidth margin="dense">
            <Button variant="raised" id="submit" name="submit" type="submit" color="primary" disabled={this.props.loading}>
              <FormattedMessage id="ACCOUNT.SIGNUP_SUBMIT" defaultMessage="Signup" />
            </Button>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Typography>
              <FormattedMessage id="ACCOUNT.ALREADY_HAVE_ACCOUNT" defaultMessage="Already have an account?" />{' '}
              <Link id="loginHere" name="loginHere" to={`/${intl.locale}/authenticate/login`}>
                <FormattedMessage id="ACCOUNT.LOGIN_HERE" defaultMessage="Login here" />
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
