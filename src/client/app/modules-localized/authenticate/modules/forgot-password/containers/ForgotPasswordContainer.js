import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActionCreators from '../../../../../store/session/session.duck';

import { ForgotPassword } from '../components/ForgotPassword';
import { SUCCESSES } from '../../../../../../../shared/modules/messages';

const mapStateToProps = (state) => {
  return {
    session: state.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sessionActions: bindActionCreators(sessionActionCreators, dispatch)
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export class ForgotPasswordContainer extends React.Component {
  static contextTypes = {
    messageService: PropTypes.object.isRequired
  };

  static propTypes = {
    session: PropTypes.object.isRequired,
    sessionActions: PropTypes.object.isRequired
  };

  render() {
    return (
      <ForgotPassword
        onRequestForgotPasswordLocal={(payload) => this.handleRequestForgotPasswordLocal(payload)}
        loading={this.props.session.loading}
      />
    );
  }

  handleRequestForgotPasswordLocal(payload) {
    return this.props.sessionActions
      .forgotPassword(payload)
      .then((response) => this.handleForgotPasswordSuccess(response))
      .catch((response) => this.handleForgotPasswordFailure(response));
  }

  handleForgotPasswordSuccess(response) {
    // Confirmation messages shown @ ForgotPassword
    return Promise.resolve(response);
  }

  handleForgotPasswordFailure(response) {
    // Validation messages shown @ ForgotPasswordForm
    return Promise.reject(response);
  }
}
