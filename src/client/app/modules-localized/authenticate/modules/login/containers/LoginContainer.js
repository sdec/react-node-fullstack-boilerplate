import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActionCreators from '../../../../../store/session/session.duck';

import { Login } from '../components/Login';
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
export class LoginContainer extends React.Component {
  static contextTypes = {
    messageService: PropTypes.object.isRequired
  };

  static propTypes = {
    session: PropTypes.object.isRequired,
    sessionActions: PropTypes.object.isRequired
  };

  render() {
    return <Login onRequestLoginLocal={(payload) => this.handleRequestLoginLocal(payload)} loading={this.props.session.loading} />;
  }

  handleRequestLoginLocal(payload) {
    return this.props.sessionActions
      .loginLocal(payload)
      .then((response) => this.handleLoginSuccess(response))
      .catch((response) => this.handleLoginFailure(response));
  }

  handleLoginSuccess(response) {
    this.context.messageService.addMessage(SUCCESSES.USER_LOGGED_IN);
    return Promise.resolve(response);
  }

  handleLoginFailure(response) {
    // Validation messages shown @ LoginForm
    return Promise.reject(response);
  }
}
