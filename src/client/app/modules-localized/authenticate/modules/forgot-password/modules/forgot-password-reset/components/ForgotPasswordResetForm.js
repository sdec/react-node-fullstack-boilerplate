import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Button, FormControl, Input, InputLabel, withStyles } from 'material-ui';
import { ContentPane } from '../../../../../../../shared/components/ContentPane';
import { APIService } from '../../../../../../../shared/services/APIService';
import { FormValidations } from '../../../../../../../shared/models/FormValidations';

const styles = (theme) => ({});

@withStyles(styles)
export class ForgotPasswordResetForm extends React.Component {
  static contextTypes = {
    intl: PropTypes.object.isRequired
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      password: '',
      passwordRepeat: '',
      token: this.props.token,
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
          <FormControl error={validations.hasError('password')} fullWidth margin="dense">
            <InputLabel htmlFor="password">
              <FormattedMessage id="ACCOUNT.CREATE_A_NEW_PASSWORD" defaultMessage="Create a new password" />
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
              <FormattedMessage id="ACCOUNT.FORGOT_PASSWORD_SUBMIT" defaultMessage="Reset password" />
            </Button>
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
