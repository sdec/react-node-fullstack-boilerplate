import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActionCreators from './../../../../../../../store/session/session.duck';

import { ForgotPasswordReset } from '../components/ForgotPasswordReset';
import { SUCCESSES } from './../../../../../../../../../shared/modules/messages';

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
export class ForgotPasswordResetContainer extends React.Component {
  static contextTypes = {
    messageService: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  static propTypes = {
    session: PropTypes.object.isRequired,
    sessionActions: PropTypes.object.isRequired
  };

  token;

  constructor(props, context) {
    super(props, context);

    const query = qs.parse(this.context.router.route.location.search.substr(1));
    this.token = query.token;
  }

  render() {
    return (
      <ForgotPasswordReset
        onRequestForgotPasswordReset={(payload) => this.handleForgotPasswordReset(payload)}
        token={this.token}
        loading={this.props.session.loading}
      />
    );
  }

  handleForgotPasswordReset(payload) {
    return this.props.sessionActions
      .forgotPasswordReset(payload)
      .then((response) => this.handleForgotPasswordResetSuccess(response))
      .catch((response) => this.handleForgotPasswordResetFailure(response));
  }

  handleForgotPasswordResetSuccess(response) {
    this.context.messageService.addMessage(SUCCESSES.USER_LOGGED_IN);
    return Promise.resolve(response);
  }

  handleForgotPasswordResetFailure(response) {
    // Validation messages shown @ ForgotPasswordResetForm
    return Promise.reject(response);
  }
}
